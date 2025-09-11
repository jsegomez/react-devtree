import api from "../utils/axios";
import { toast } from "sonner";
import { errorToast } from "../layouts/sonner-alert";
import type { User } from "../types/user";
import { isAxiosError } from "axios";

export const getUser = async() => {
    try {
        const { data } = await api.get<User>("/auth/get-user");
        return data;
    } catch (error){
        if(isAxiosError(error)) toast.error(error.response?.data.message as string, errorToast);
        toast.error("Error al obtener el usuario", errorToast);
    }
}

export const updateUser = async(user: User) => {
    try {
        const { data } = await api.patch<User>("/auth/update-user", user);
        return data;
    } catch (error) {                        
        if(isAxiosError(error)) toast.error(error.response?.data.message as string, errorToast);
        toast.error("Error al actualizar el usuario", errorToast);
    }
}