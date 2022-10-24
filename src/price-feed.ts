import { ethers } from 'ethers'
import axios from 'axios';



export async function usePriceFeed() : Promise<any> {
    const { data: response } = await axios.get('http://127.0.1:8001/coin/matic');
    console.log("RESPONSE!")
    console.log(response)
    if(!response)
        return 0.0
    return parseFloat(response).toFixed(3)
    }