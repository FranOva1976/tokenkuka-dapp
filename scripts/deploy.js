const { ethers } = require("hardhat");

async function main() {
  const Kuka = await ethers.getContractFactory("Kuka");
  const kuka = await Kuka.deploy();

  await kuka.waitForDeployment(); // espera a que se confirme en la red

  console.log("Contrato desplegado en:", await kuka.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
