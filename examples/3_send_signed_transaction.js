// creating transactions by ethers.js
require('dotenv').config();
const { ethers } = require("ethers");

const INFURA_ID = process.env.infura_id
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`)

const account_sender = process.env.account_sender
const account_receiver = process.env.account_receiver

const privateKey1 = process.env.pKey // sender

// set up ether wallet
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {

    const sender_balance_before = await provider.getBalance(account_sender)
    const receiver_balance_before = await provider.getBalance(account_receiver)

    console.log(`Sender balance before: ${ethers.utils.formatEther(sender_balance_before)}`)
    console.log(`Receiver balance before: ${ethers.utils.formatEther(receiver_balance_before)}`)

    //default from value is that accoutn which is private key
    const tx = await wallet.sendTransaction({
        to: account_receiver, 
        value: ethers.utils.parseEther("0.025")
    })

    // see info about transaction
    await tx.wait() // wait() will wait for tx to be mined
    console.log(tx) 

    const sender_balance_after = await provider.getBalance(account_sender)
    const receiver_balance_after = await provider.getBalance(account_receiver)

    console.log(`Sender balance after: ${ethers.utils.formatEther(sender_balance_after)}`)
    console.log(`Receiver balance after: ${ethers.utils.formatEther(receiver_balance_after)}`)
}

main()