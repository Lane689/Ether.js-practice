// look at blockchain and inspect info from block itselfs
require('dotenv').config();
const { ethers } = require("ethers");

const INFURA_ID = process.env.infura_id
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const main = async () => {
    const latestBlock = provider.getBlockNumber()
    console.log(`Block number: ${latestBlock}`)

    const blockInfo = await provider.getBlock(latestBlock)
    console.log(blockInfo)

    const {transactions} = await provider.getBlockWithTransactions(latestBlock)
    console.log(`Logging first transaction in block:`)
    console.log(transactions[0])
}

main()