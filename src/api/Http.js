import axios from "axios"
import { getCookie } from "../Cookie"

// const BACKEND_URL = "http://192.168.1.57:4010"
// const BACKEND_URL = "http://localhost:4010"
const BACKEND_URL = "http://192.168.1.27:4010"

const token = getCookie() ? 
JSON.parse(getCookie()).token:
"";
// console.log(token,"token..................................");

export const loginApi=async(number,password)=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/login`,{
            msisdn:number,
            password:password
        })
        // console.log(response.data)
        return response.data;
    }
    catch(err){
        console.log(err)
    }
}


export const chitApi=async()=>{
    try{
        const response = await axios.get(`${BACKEND_URL}/api/chits`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        // console.log(response.data.result);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}


export const questionApi=async()=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/getQuestions`,null,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        // console.log(response.data);
        return response.data;
    }
    catch(err){
        console.log(err)
    }
}


export const accountApi=async(number)=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/user-info`,{
            msisdn:number
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        // console.log(response.data)
        return response.data.result;
    }
    catch(err){
        console.log(err)
    }
}

export const addPriceApi=async(price)=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/addPriceReward`,{
            price:price
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        // console.log(response.data);
        return response.data

    }
    catch(err){
        console.log(err);
    }
}

export const decreaseTries=async()=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/api/decreaseTries`,null,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        // console.log(response.data)
        return response.data.result;
    }
    catch(err){
        console.log(err);
    }
} 