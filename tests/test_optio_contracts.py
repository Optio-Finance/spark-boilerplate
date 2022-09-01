import pytest
import logging
import math
from hypothesis import given, strategies as st, settings

from contracts.lib.openzeppelin.tests.utils import to_uint, from_uint
from .conftest import DECIMALS

logger = logging.getLogger(__name__)


@pytest.mark.asyncio
async def test_create_pool(
    signer_factory,
    account_factory,
    controller_factory,
    pool_factory,
    tusdc_factory,
    topti_factory,
):
    # @dev Initializing actors on empty StarkNet
    signer = signer_factory
    smart_account, _ = account_factory
    controller_contract, controller_address = controller_factory
    pool_contract, pool_address = pool_factory

    # @notice USDC as collateral
    _, tUSDC_address = tusdc_factory
    # @notice Buyer NFT that will be minted for a buyer when trades occur
    _, tOPTI_address = topti_factory

    # @dev deposit_fee = [to_uint(5), to_uint(1000)]  # .05%
    trade_fee = [to_uint(5), to_uint(1000)]  # .05%
    withdraw_fee = [to_uint(5), to_uint(1000)]  # .05%

    tokens_array_input = (
        tUSDC_address, 1, 0, 2, 0,
        tOPTI_address, 1, 0, 2, 0,
    )

    logger.info("Creating a CommonVault...")
    # @dev len(tokens_array_input) = 2
    await signer.send_transaction(
        account=smart_account,
        to=controller_address,
        selector_name="create_pool",
        calldata=[
            pool_address,
            *trade_fee[0],
            *trade_fee[1],
            *withdraw_fee[0],
            *withdraw_fee[1],
            2,
            *tokens_array_input,
        ],
    )
    logger.info("Caller has been assigned as CommonVault's admin")

    stored_token = await controller_contract.is_pool_approved(pool_address).call()
    assert stored_token.result == (1,)
    logger.info("CommonVault has been initialized by the CV_Controller")

    erc_approval = await pool_contract.is_ERC20_approved(tUSDC_address).call()
    assert erc_approval.result == (1,)
    logger.info("ERC20 contract (tUSDC) has been approved by CV_Controller")

    erc_approval = await pool_contract.is_ERC20_approved(tOPTI_address).call()
    logger.info("ERC721 contract (OPTI) has been approved by CV_Controller")
    assert erc_approval.result == (1,)


@pytest.mark.asyncio
async def test_approve_pool_for_transfer(
    signer_factory,
    account_factory,
    pool_factory,
    tusdc_factory,
):
    signer = signer_factory
    smart_account, user_address = account_factory
    _, pool_address = pool_factory
    tusdc, tUSDC_address = tusdc_factory

    await signer.send_transaction(
        account=smart_account,
        to=tUSDC_address,
        selector_name="approve",
        # @dev extra zero for uint256
        calldata=[pool_address, 100 * DECIMALS, 0],
    )
    # @dev check that correct amount is allowed
    pool_allowance = await tusdc.allowance(user_address, pool_address).call()
    assert pool_allowance.result == ((100 * DECIMALS, 0),)

    logger.info("CV_Controller is allowed to deposit tUSDC from SmartAccount into Optio pools")

@pytest.mark.asyncio
async def test_optio_deposit(
    signer_factory,
    account_factory,
    controller_factory,
    pool_factory,
    tusdc_factory,
    topti_factory,
):
    signer = signer_factory
    smart_account, user_address = account_factory
    pool_contract, pool_address = pool_factory
    _, controller_address = controller_factory

    tusdc, tUSDC_address = tusdc_factory
    optio, OPTI_address = topti_factory

    # @dev Mint 40K tUSDC for SmartAccount
    logger.info(f"Minting 40,000 tUSDC for SmartAccount to test depositing")
    await signer.send_transaction(
        account=smart_account,
        to=tUSDC_address,
        selector_name="mint",
        calldata=[
            user_address,
            *to_uint(4 * DECIMALS)
        ],
    )

    initial_balance = await pool_contract.get_ERC20_balance(tUSDC_address).call()
    logger.info(f"Initial CommonVault balance: {from_uint(initial_balance.result[0])}")

    logger.info(f"Depositing 40,000 tUSDC from SmartAccount to CommonVault through CV_Controller")
    await signer.send_transaction(
        account=smart_account,
        to=controller_address,
        selector_name="optio_deposit",
        calldata=[
            *to_uint(4 * DECIMALS),
            user_address,
            pool_address,
            tUSDC_address
        ],
    )

    new_balance = await pool_contract.get_ERC20_balance(tUSDC_address).call()
    logger.info(f"Updated CommonVault balance: {from_uint(new_balance.result[0])}")

    assert from_uint(new_balance.result[0]) - from_uint(initial_balance.result[0]) == 4 * DECIMALS
    logger.info("assert (140,000 - 100,000) == 40,000")

    logger.info("Minting the OPTI NFT with tokenId = 1 for User")
    await signer.send_transaction(
        account=smart_account,
        to=OPTI_address,
        selector_name="mint",
        # @dev tokenId
        calldata=[user_address, *to_uint(1)]
    )
    
    logger.info(f"Checking who is the owner of NFT with tokenId = 1")
    owner = await signer.send_transaction(
        account=smart_account,
        to=OPTI_address,
        selector_name="ownerOf",
        # @dev tokenId
        calldata=[*to_uint(1)]
    )
    logger.info(f"Owner: {hex(*owner.result[0])}")



@pytest.mark.asyncio
async def test_optio_withdraw(
    signer_factory,
    account_factory,
    controller_factory,
    pool_factory,
    tusdc_factory,
    topti_factory,
):
    signer = signer_factory
    smart_account, user_address = account_factory
    pool_contract, pool_address = pool_factory
    _, controller_address = controller_factory
    _, tUSDC_address = tusdc_factory
    _, OPTI_address = topti_factory

    current_balance = await pool_contract.get_ERC20_balance(tUSDC_address).call()
    logger.info(f"Current CommonVault balance: {from_uint(current_balance.result[0])}")

    logger.info(f"Withdrawing 20K tUSDC from the CommonVault through CV_Controller...")
    withdraw = await signer.send_transaction(
        account=smart_account,
        to=controller_address,
        selector_name="optio_withdraw",
        calldata=[
            *to_uint(2 * DECIMALS),
            user_address,
            pool_address,
            tUSDC_address
        ],
    )
    logger.info(f"Success (true=1,false=0): {withdraw.result[0][0]}")

    new_balance = await pool_contract.get_ERC20_balance(tUSDC_address).call()
    logger.info(f"Updated CommonVault balance: {from_uint(new_balance.result[0])}")

    logger.info(f"Burning the OPTI NFT that User obtained previously...")
    await signer.send_transaction(
        account=smart_account,
        to=OPTI_address,
        selector_name="burn",
        calldata=[*to_uint(1)]
    )

    logger.info(f"Checking how many NFTs this User has now after burning")
    nfts = await signer.send_transaction(
        account=smart_account,
        to=OPTI_address,
        selector_name="balanceOf",
        calldata=[user_address]
    )
    logger.info(f"User currently has: {from_uint(nfts.result[0])} NFTs")
