// write to smart contract
require('dotenv').config();
const { ethers } = require("ethers");

const INFURA_ID =  process.env.infura_id
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`)

const account_sender = process.env.account_sender
const account_receiver = process.env.account_receiver

const privateKey1 = process.env.pKey // sender

const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_abi = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
]

// contract address of Chainlink token
const address = '0x779877A7B0D9E8603169DdbD7836e478b4624789'

// Creating a contract
const contract = new ethers.Contract(address, ERC20_abi, provider)

const main = async () => { 
    const balance = await contract.balanceOf(account_sender)
    console.log(`Reading from ${address} and balance of sender is: ${balance}`)

    // can't call transfer() directly from contract, first we need connect contract to wallet
    const contractWithWallet = contract.connect(wallet)
    const tx = await contractWithWallet.transfer(account_receiver, balance)
    await tx.wait()
    console.log(tx)

    const senderBalance = await contract.balanceOf(account_sender)
    const receiverBalance = await contract.balanceOf(account_receiver)

    console.log(`Balance of sender is: ${senderBalance}`)
    console.log(`Balance of receiver is: ${receiverBalance}`)
}

main()
