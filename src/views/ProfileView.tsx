import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import FormErrorMessage from "../components/FormErrorMessage";
import type { User } from "../types/user";

export default function ProfileView() {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(['data-user']);
    console.log(data)

    const { register, handleSubmit, formState: { isValid, errors } } = useForm<User>({
        mode: "onTouched",
        defaultValues: {
            username: '',
            description: '',
        },
    });

    const onSubmit = (data: User) => {
        const { username, description } = data;
        console.log(username, description);
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
                        maxLength: { value: 60, message: "La descripción debe tener menos de 60 caracteres" }
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