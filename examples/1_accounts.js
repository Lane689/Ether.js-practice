require('dotenv').config();
const { ethers } = require("ethers");

// Connection to blockchain
const INFURA_ID = process.env.infura_id

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH Balance of ${address} ---> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()