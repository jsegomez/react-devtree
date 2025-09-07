import { isAxiosError } from "axios";
import api from "../utils/axios";
import { toast } from "sonner";
import { errorToast } from "../layouts/sonner-alert";

export const getUser = async() => {
    try {
        const { data } = await api.get("/auth/get-user", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        return data;
    } catch (error) {
        if(isAxiosError(error)){
            const statusCode = error.status;
            if(statusCode === 401 || statusCode === 404)toast.error("Usuario o contraseña incorrectos", errorToast);            
        } else {
            toast.error("Error al crear el usuario", errorToast);
        }
    }
}
