import sys

sys.path.append("./")
sys.path.append("../")

import json
from script_utils import (
    create_deploy_command,
    run_command,
    write_result_to_storage,
    owner_account,
)

from contracts.lib.openzeppelin.tests.utils import str_to_felt, to_uint, felt_to_str

owner = json.load(open(owner_account()))["address"]

router_deploy = create_deploy_command("optio_controller", [owner])
router_address, rtx = run_command(router_deploy)

pool_deploy = create_deploy_command(
    "optio_pool",
    [
        router_address,
        str_to_felt("OPTIO"),
        str_to_felt("OPT"),
        *to_uint(1000),
        owner,
    ],
)

pool_address, ptx = run_command(pool_deploy)


# @dev ERC20 deployment
cmd = create_deploy_command(
    "ERC20_Mintable",
    [
        str_to_felt("testUSDC"),
        str_to_felt("TUSDC"),
        *to_uint(100000),
        pool_address,
        owner,
    ]
)
a, t = run_command(cmd)
write_result_to_storage(
    {
        "name": "testUSDC",
        "symbol": "TUSDC",
        "address": a,
        "transaction": t,
    },
    "erc20"
)


# @dev ERC721 deployment
cmd = create_deploy_command(
    "ERC721_Mintable_Burnable",
    [
        str_to_felt("Optio token"),
        str_to_felt("OPTI"),
        owner,
    ]
)
a, t = run_command(cmd)
write_result_to_storage(
    {
        "name": "Optio token",
        "symbol": "OPTI",
        "address": a,
        "transaction": t,
    },
    "erc721"
)


pool_router_dict = {
    "CONTROLLER": {"address": router_address, "transaction": rtx},
    "POOL": {"address": pool_address, "transaction": ptx},
}
write_result_to_storage(pool_router_dict, "current_deployment_info")
