let provider;
let signer;
let contract;
const contractAddress = "0xC3b09A8518f9f85Dd73c3C5512Dc628A199bdd6C";
const abi = [{
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

async function conectarWallet() {
  if (typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    document.getElementById("status").innerText = "Wallet conectada";
    contract = new ethers.Contract(contractAddress, abi, signer);
    document.getElementById("transferSection").style.display = "block";
  } else {
    document.getElementById("status").innerText = "Instala Metamask para usar esta dApp.";
  }
}

async function transferirTokens() {
  const destinatario = document.getElementById("recipient").value;
  const cantidad = document.getElementById("amount").value;
  if (contract) {
    const cantidadWei = ethers.utils.parseUnits(cantidad, 18);
    const tx = await contract.transfer(destinatario, cantidadWei);
    await tx.wait();
    alert("Transferencia completada");
  }
}

async function consultarSaldo() {
  if (contract && signer) {
    const address = await signer.getAddress();
    const saldo = await contract.balanceOf(address);
    const saldoFormateado = ethers.utils.formatUnits(saldo, 18);
    document.getElementById("saldo").innerText = `Tu saldo es: ${saldoFormateado} KUKA`;
  }
}

document.getElementById("connectButton").addEventListener("click", conectarWallet);
document.getElementById("transferButton").addEventListener("click", transferirTokens);