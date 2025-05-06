const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Dirección de la wallet configurada:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Saldo en ETH:", ethers.formatEther(balance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error al obtener la dirección o el saldo:", error);
    process.exit(1);
  });
