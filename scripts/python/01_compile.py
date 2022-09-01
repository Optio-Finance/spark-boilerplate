from script_utils import create_compile_command, run_command

CONTRACTS_TO_COMPILE = [
    # ["path/to/your/contract", "contract_name"],
    ["lib/pool/stable", "stable"]
]

for contract in CONTRACTS_TO_COMPILE:
    cmd = create_compile_command(contract[0], contract[1])
    w = run_command(cmd)
