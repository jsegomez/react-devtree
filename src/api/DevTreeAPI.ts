import { isAxiosError } from "axios";
import api from "../utils/axios"

export const getUser = async() => {
    try {
        const { data } = await api.get('/user/data-user', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        };
    }    
}