let provider;
let signer;
let contract;

const contractAddress = "0xC3b09A8518f9f85Dd73c3C5512Dc628A199bdd6C"; // Dirección del contrato desplegado
const contractABI = [
    "function transfer(address to, uint amount) public returns (bool)",
    "function balanceOf(address account) external view returns (uint256)"
];

async function conectarWallet() {
    if (window.ethereum) {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            document.getElementById("status").innerText = "Wallet conectada";
            document.getElementById("connectButton").style.display = "none";
            document.getElementById("transferSection").style.display = "block";
        } catch (err) {
            console.error(err);
            document.getElementById("status").innerText = "Error al conectar Wallet";
        }
    } else {
        document.getElementById("status").innerText = "Instala Metamask para usar esta dApp.";
    }
}

async function consultarSaldo() {
    const address = await signer.getAddress();
    const balance = await contract.balanceOf(address);
    document.getElementById("saldo").innerText = `Tu saldo es: ${ethers.utils.formatUnits(balance, 18)} KUKA`;
}

async function enviarTokens() {
    const to = document.getElementById("recipient").value;
    const amount = document.getElementById("amount").value;
    try {
        const tx = await contract.transfer(to, ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        alert("Transferencia completada");
    } catch (error) {
        console.error(error);
        alert("Error al enviar tokens");
    }
}

document.getElementById("connectButton").onclick = conectarWallet;
document.getElementById("transferButton").onclick = enviarTokens;