import { ethers } from 'ethers'
import axios from 'axios';
import { SERVER_URL } from '../constants';



export async function usePriceFeed() : Promise<any> {
    const { data: response } = await axios.get(SERVER_URL +'/coin/matic');
    console.log("RESPONSE!")
    console.log(response)
    if(!response)
        return 0.0
    return parseFloat(response).toFixed(3)
    }