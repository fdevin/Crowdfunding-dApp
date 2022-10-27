import { ethers } from 'ethers'
import axios from 'axios';
import { SERVER_URL } from '../constants';



export async function usePriceFeed() : Promise<any> {
    const { data: response } = await axios.get(SERVER_URL +'/api/matic');
    console.log("RESPONSE!")
    console.log(response.lastMaticPrice)
    if(!response)
        return 0.0
    return parseFloat(response.lastMaticPrice).toFixed(3)
    }