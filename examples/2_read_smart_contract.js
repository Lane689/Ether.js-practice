// Interact with smart contracts on blockchain
require('dotenv').config();
const { ethers } = require("ethers");

const INFURA_ID = process.env.infura_id
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const ERC20_abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
]

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI stablecoin

// creating a new Contract object for communication with smart contract 
const contract = new ethers.Contract(address, ERC20_abi, provider)

const main = async () => {
    const name = await contract.name()
    console.log(`Name: ${name}`)

    // DAI balance of particular address
    const balance = await contract.balanceOf('0x6c6Bc977E13Df9b0de53b251522280BB72383700')
    console.log(ethers.utils.formatEther(balance))
}

main()