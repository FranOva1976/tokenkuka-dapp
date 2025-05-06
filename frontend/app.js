const contractAddress = "0xC3b09A8518f9f85Dd73c3C5512Dc628A199bdd6C";
const contractABI = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function balanceOf(address account) public view returns (uint256)",
  "function decimals() public view returns (uint8)"
];

let signer;
let contract;

async function conectarWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            document.getElementById("status").innerText = "Wallet conectada";
            document.getElementById("transferSection").style.display = "block";
        } catch (error) {
            console.error("Error al conectar:", error);
        }
    } else {
        document.getElementById("status").innerText = "Instala Metamask para usar esta dApp.";
    }
}

async function transferirTokens() {
    const destinatario = document.getElementById("recipient").value;
    const cantidad = document.getElementById("amount").value;

    if (!destinatario || !cantidad) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const decimales = await contract.decimals();
        const cantidadConDecimales = ethers.utils.parseUnits(cantidad, decimales);
        const tx = await contract.transfer(destinatario, cantidadConDecimales);
        await tx.wait();
        alert("Transferencia completada");
    } catch (error) {
        console.error("Error al transferir tokens:", error);
        alert("Error al transferir tokens");
    }
}

async function consultarSaldo() {
    try {
        const address = await signer.getAddress();
        const saldo = await contract.balanceOf(address);
        const decimales = await contract.decimals();
        const saldoFormateado = ethers.utils.formatUnits(saldo, decimales);
        document.getElementById("saldo").innerText = `Tu saldo es: ${saldoFormateado} KUKA`;
    } catch (error) {
        console.error("Error al consultar saldo:", error);
    }
}

document.getElementById("connectButton").addEventListener("click", conectarWallet);
document.getElementById("transferButton").addEventListener("click", transferirTokens);
