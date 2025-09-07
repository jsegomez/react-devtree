import api from "../utils/axios";
import { toast } from "sonner";
import { errorToast } from "../layouts/sonner-alert";

export const getUser = async() => {
    try {
        const { data } = await api.get("/auth/get-user");
        return data;
    } catch (error) {
        toast.error("Error al obtener el usuario", errorToast);
    }
}
