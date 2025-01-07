import { AxiosError, isAxiosError } from "axios";
import api from "../utils/axios"
import { ProfileForm, User } from "../types/user.types";
import { toast } from "sonner";

export const getUser = async():Promise<User> => {
    try {
        const { data } = await api.get('/user/data-user');
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }else{
            throw new Error("An unknown error occurred");
        }
    }    
}

export const updateUser = async(formData: ProfileForm):Promise<User> => {
    try {
        const { data } = await api.patch<User>('/user/update-user', formData);
        return data;
    } catch (error) {
        if(error instanceof AxiosError && error.response?.status === 409) {
            toast.error(error.response.data.message);
        }
        if(isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }else{
            throw new Error("An unknown error occurred");
        }
    }    
}


