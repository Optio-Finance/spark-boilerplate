import { starknet } from "hardhat";

async function main() {
  const contractFactory = await starknet.getContractFactory("ERC1155");
  const contract = await contractFactory.deploy(
    {
      uri: starknet.shortStringToBigInt("https://spark.xyz"),
      owner:
        "0x0718f25845472CfF8cD8262220F7Ae167411A46d08E594d4B00aA54080072b5D",
    },
    { salt: "Spark ERC1155" }
  );
  console.log("Deployed to:", contract.address);
  console.log("Deployment transaction hash:", contract.deployTxHash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
