import { starknet } from "hardhat";

async function main() {
  const contractFactory = await starknet.getContractFactory("ERC1155");
  const contract = await contractFactory.getContractAt(
    "0x066888284bf0dce7811aea8950eab7c39c22f2594cef7124366aa93edbcc6b8e"
  );
  const erc165 = await contract.call("supportsInterface", {
    interfaceId: 0xd9b67a26,
  });
  console.log("result", Boolean(erc165.is_supported));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
