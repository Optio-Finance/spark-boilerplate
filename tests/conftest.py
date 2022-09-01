import os
import asyncio
import logging
import pytest

from starkware.starknet.testing.starknet import Starknet
from contracts.lib.openzeppelin.tests.utils import str_to_felt, Signer, to_uint

DECIMALS = 10 ** 4
logger = logging.getLogger(__name__)

# @notice Contract classes

ACCOUNT_CONTRACT = os.path.join(
    os.path.dirname(__file__), "../contracts/lib/openzeppelin/contracts/Account.cairo"
)

CONTROLLER_CONTRACT = os.path.join(
    os.path.dirname(__file__), "../contracts/optio_controller.cairo"
)

POOL_CONTRACT = os.path.join(
    os.path.dirname(__file__), "../contracts/optio_pool.cairo"
)

USDC_ERC20_CONTRACT = os.path.join(
    os.path.dirname(__file__),
    "../contracts/lib/openzeppelin/contracts/token/ERC20_Mintable.cairo",
)

OPTI_ERC721_CONTRACT = os.path.join(
    os.path.dirname(__file__),
    "../contracts/lib/openzeppelin/contracts/token/ERC721_Mintable_Burnable.cairo",
)

MATH_CONTRACT = os.path.join(
    os.path.dirname(__file__), "../contracts/lib/math.cairo"
)


@pytest.fixture(scope="module")
def event_loop():
    return asyncio.new_event_loop()


# contract and object factories
@pytest.fixture(scope="module")
async def starknet_factory():
    starknet = await Starknet.empty()
    logger.info("Local StarkNet instance launched successfully")
    return starknet


@pytest.fixture(scope="module")
async def signer_factory():
    signer = Signer(12345)
    return signer


@pytest.fixture(scope="module")
async def account_factory(starknet_factory, signer_factory):
    starknet = starknet_factory
    signer = signer_factory

    # Deploy the account contract
    user_account = await starknet.deploy(
        source=ACCOUNT_CONTRACT,
        constructor_calldata=[signer.public_key]
    )
    logger.info(f"SmartAccount contract deployed: {hex(user_account.contract_address)}")

    return user_account, user_account.contract_address


@pytest.fixture(scope="module")
async def controller_factory(starknet_factory, account_factory):
    starknet = starknet_factory
    _, user = account_factory

    controller_contract = await starknet.deploy(
        source=CONTROLLER_CONTRACT,
        constructor_calldata=[user],
    )
    logger.info(f"CV_Controller contract deployed: {hex(controller_contract.contract_address)}")

    return controller_contract, controller_contract.contract_address


@pytest.fixture(scope="module")
async def pool_factory(starknet_factory, account_factory, controller_factory):
    starknet = starknet_factory
    _, user = account_factory
    _, controller_address = controller_factory

    name = str_to_felt("OPTIO")
    symbol = str_to_felt("OPT")
    initial_supply = to_uint(50 * DECIMALS) # 500,000

    pool_contract = await starknet.deploy(
        source=POOL_CONTRACT,
        constructor_calldata=[
            controller_address,
            name,
            symbol,
            *initial_supply,
            user,
        ],
    )
    logger.info(f"VaultFactory contract deployed: {hex(pool_contract.contract_address)}")

    return pool_contract, pool_contract.contract_address


@pytest.fixture(scope="module")
async def tusdc_factory(starknet_factory, account_factory, pool_factory):
    starknet = starknet_factory
    _, pool = pool_factory
    _, owner = account_factory

    initial_supply = to_uint(10 * DECIMALS) # 100,000

    tusdc = await starknet.deploy(
        USDC_ERC20_CONTRACT,
        constructor_calldata=[
            str_to_felt("testUSDC"),
            str_to_felt("TUSDC"),
            *initial_supply,
            pool,
            owner,
        ],
    )
    logger.info(f"ERC20 contract (tUSDC) deployed: {hex(tusdc.contract_address)}")

    return tusdc, tusdc.contract_address


@pytest.fixture(scope="module")
async def topti_factory(starknet_factory, account_factory, pool_factory):
    starknet = starknet_factory
    _, owner = account_factory

    optio = await starknet.deploy(
        OPTI_ERC721_CONTRACT,
        constructor_calldata=[
            str_to_felt("Optio token"),
            str_to_felt("OPTI"),
            owner,
        ],
    )
    logger.info(f"ERC721 contract (OPTI) deployed: {hex(optio.contract_address)}")

    return optio, optio.contract_address