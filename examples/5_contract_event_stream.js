// how to look at smart contracts events
require('dotenv').config();
const { ethers } = require("ethers");

const INFURA_ID = process.env.infura_id
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)" // event that we are gonna listen to
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    //const transferEvents = await contract.queryFilter('Transfer') // every single transfer event that ever happend on DAI stablecoin
    const latestBlock = await provider.getBlockNumber()

    // adding filter
    const transferEvents = await contract.queryFilter('Transfer', latestBlock-10, latestBlock) // last 10 blocks
    console.log(transferEvents)

}

main()