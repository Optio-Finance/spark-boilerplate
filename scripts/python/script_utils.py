import sys

sys.path.append("./")
sys.path.append("../")

import subprocess
import os
import dotenv
import json
import asyncio

from contracts.lib.openzeppelin.tests.utils import Signer

dotenv.load_dotenv()


def owner_account():
    return os.path.join(
        os.path.dirname(__file__),
        "../spark_state/current_account.json",
    )


def pool():
    return os.path.join(
        os.path.dirname(__file__),
        "../spark_state/current_deployment_info.json",
    )


def router():
    return os.path.join(
        os.path.dirname(__file__),
        "../spark_state/current_deployment_info.json",
    )


def ercs():
    return os.path.join(
        os.path.dirname(__file__),
        "../spark_state/fake_ercs.json",
    )

def stable_pool():
    return os.path.join(
        os.path.dirname(__file__),
        "../spark_state/stable.json"
    )


def signer():
    return Signer(int(os.getenv("PRIV_KEY")))


def create_compile_command(name_of_contract, name_of_compiled):
    if not os.path.exists("spark_state/builds"):
        os.makedirs("spark_state/builds")
    if not os.path.exists("spark_state/abis"):
        os.makedirs("spark_state/abis")
    cmd_list = [
        f"starknet-compile",
        f"contracts/{name_of_contract}.cairo",
        f"--output",
        f"spark_state/builds/{name_of_compiled}_compiled.json",
        f"--abi",
        f"spark_state/abis/{name_of_compiled}_abi.json",
    ]
    return " ".join(cmd_list)


def create_deploy_command(name_of_contract, input_list):
    cmd_list = [
        f"starknet",
        f"deploy",
        f"--contract",
        f"spark_state/builds/{name_of_contract}_compiled.json",
        f'--network={os.getenv("STARKNET_NETWORK")}',
        f"--inputs",
    ]

    for i in input_list:
        cmd_list.append(str(i))

    return " ".join(cmd_list)


def create_invoke_command(
    address, name_of_contract, function_name, input_list, signature
):
    cmd_list = [
        f"starknet",
        f"invoke",
        f"--no_wallet",
        f"--address",
        f"{address}",
        f"--abi",
        f"spark_state/abis/{name_of_contract}_abi.json",
        f"--function",
        f"{function_name}",
        f'--network={os.getenv("STARKNET_NETWORK")}',
        f"--inputs",
    ]

    for i in input_list:
        cmd_list.append(str(i))

    cmd_list.extend([f"--signature", f"{signature[0]}", f"{signature[1]}"])

    return " ".join(cmd_list)


def run_command(cmd):
    output = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(output)
    print(output.stderr)
    if output.stdout:
        output = str(output.stdout).replace(":", "\n").split("\n")
        address = output[2].strip(" ").strip("\n")
        tx_hash = output[4].strip(" ").strip("\n")
        return address, tx_hash
    else:
        return None


def write_result_to_storage(result, file_name):
    if not os.path.exists("spark_state"):
        os.makedirs("spark_state")
    with open(f"spark_state/{file_name}.json", "w") as file:
        json.dump(result, file, indent=4)


def get_transaction(tx):
    cmd_list = [
        f"starknet get_transaction",
        f"--hash",
        f"{tx}",
    ]
    return " ".join(cmd_list)
