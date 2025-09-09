import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { successToast, loadingToast, errorToast } from "../layouts/sonner-alert";
import { updateUser } from "../api/DevTreeApi";
import FormErrorMessage from "../components/FormErrorMessage";
import type { ProfileFormData } from "../types/forms";
import type { User } from "../types/user";
import { useEffect } from "react";
import { isAxiosError } from "axios";

export default function ProfileView() {
    const queryClient = useQueryClient();
    const userData: User = queryClient.getQueryData(['data-user'])!;

    const updateProfileMutation = useMutation({
        mutationFn: updateUser,
        onError: (error) => {
            if(isAxiosError(error)) toast(error.response?.data.message as string, errorToast);
            else toast("Error al actualizar el perfil " + error.message, errorToast);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['data-user'] });
            toast("Perfil actualizado exitosamente", successToast);
        }
    });

    const { isPending } = updateProfileMutation;

    const { register, handleSubmit, formState: { isValid, errors } } = useForm<ProfileFormData>({
        mode: "onTouched",
        defaultValues: {
            username: userData.username,
            description: userData.description,
        },
    });

    useEffect(() => {
        if(isPending) toast("Actualizando perfil", loadingToast);
    }, [isPending]);    

    const onSubmit = (data: ProfileFormData) => {
        const { username, description } = data;
        const updatedUser: User = {            
            ...userData,
            username,
            description,
        }

        updateProfileMutation.mutate(updatedUser);
    }

    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="username"
                >Handle:</label>
                <input
                    id="username"
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register("username", {
                        required: { value: true, message: "El handle es requerido" },
                        minLength: { value: 3, message: "El handle debe tener al menos 3 caracteres" },
                        maxLength: { value: 60, message: "El handle debe tener menos de 60 caracteres" }
                    })}
                />
                
                { errors.username && <FormErrorMessage message={errors.username.message as string} /> }
                
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    id="description"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register("description", {
                        required: { value: true, message: "La descripción es requerida" },
                        minLength: { value: 3, message: "La descripción debe tener al menos 3 caracteres" },
                        maxLength: { value: 100, message: "La descripción debe tener menos de 60 caracteres" }
                    })}
                />
                { errors.description && <FormErrorMessage message={errors.description.message as string} /> }
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="image">Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ () => {} }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                value='Guardar Cambios'
                disabled={ !isValid }
            />
        </form>
    )
}