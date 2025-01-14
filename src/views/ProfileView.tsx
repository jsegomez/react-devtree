import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileForm, User } from "../types/user.types";
import { uploadImage, updateUser } from "../api/DevTreeAPI";
import { toast } from "sonner";

export default function ProfileView() {
    const queryClient = useQueryClient();
    const data: User = queryClient.getQueryData(['data-user'])!;    

    const { register, reset: resetForm,handleSubmit, formState: { errors, isValid, isDirty } } = useForm<ProfileForm>({
        defaultValues: {
            nickname: data?.nickname,
            description: data?.description,
            image: data?.image || ''
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: updateUser,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => handleSuccessResponse(data)
    });

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['data-user'], (prevData: User) => {
                return {
                    ...prevData,
                    image: data.image
                };
            });
        }
    });

    const handleSuccessResponse = (data: User) => {
        toast.success('Perfil actualizado exitosamente');
        queryClient.invalidateQueries({ queryKey: ['data-user'] });

        resetForm({
            nickname: data.nickname,
            description: data.description,
            image: data.image
        });
    }

    const onSubmit = (formData: ProfileForm) => {
        updateProfileMutation.mutate(formData);
    }

    const setNewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            const file = event.target.files[0];                       
            uploadImageMutation.mutate(file);
        }
    }

    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="nickname"
                >Nickname:</label>
                <input
                    type="text"
                    id="nickname"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('nickname', {
                        required: 'El nickname es requerido',
                        minLength: {
                            value: 3,
                            message: 'El nickname debe tener al menos 3 caracteres'
                        }

                    })}
                />
                {errors.nickname && <ErrorMessage> {errors.nickname.message} </ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description',{
                        required: 'Descripción requerida',
                        minLength: {
                            value: 10,
                            message: 'La descripción debe tener al menos 10 caracteres'
                        }
                    })}
                />
                {errors.description && <ErrorMessage> {errors.description.message} </ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="imageFile"
                >Imagen:</label>
                <input
                    id="imageFile"
                    type="file"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={setNewImage}
                />
                {errors.image && <ErrorMessage> {errors.image.message} </ErrorMessage>}
            </div>

            <input
                type="submit"
                disabled={!isValid || !isDirty }
                className={`p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer ${!isValid || !isDirty ? 'bg-slate-400 cursor-not-allowed' : 'bg-cyan-400'}`}
                value='Guardar Cambios'
            />
        </form>
    )
}