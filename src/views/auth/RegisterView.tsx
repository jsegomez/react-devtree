import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";

import { RegisterForm } from "../../types/user.types";
import { UserRegistrationResponse } from "../../types/user-registration-response.interface";
import ErrorMessage from "../../components/ErrorMessage";
import api from "../../utils/axios";

const RegisterView = () => {
    const navigate = useNavigate();
    const initialValues: RegisterForm = {
        name: '',
        lastname: '',
        email: '',
        nickname: '',
        password: '',
        password_confirmation: ''
    }

    const { register, handleSubmit, watch, reset,formState: { errors } } = useForm<RegisterForm>({
        defaultValues: initialValues
    });

    const watchName = watch('password');

    const handleRegister = async(dataForm: RegisterForm) => {        
        try {
            await api.post<UserRegistrationResponse>('/auth/register', dataForm);
            handleSuccessResponse();
        } catch (error: any) {
            if(isAxiosError(error)) toast.error(error.response?.data.message);
        }
    }

    const handleSuccessResponse = () => {
        reset();
        toast.success('Usuario registrado exitosamente');
        navigate('/auth/login');
    }

    return (
        <>
            <h1 className="text-4xl text-white text-center font-bold">Crear cuenta</h1>            
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        { ...register('name',
                            {
                                required: 'El nombre es requerido',
                                minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                                maxLength: { value: 50, message: 'El nombre debe tener menos de 50 caracteres' },
                                pattern: { value: /^\s*[a-zA-Z]+(?: [a-zA-Z]+)*\s*$/, message: 'El nombre debe contener solo letras' }
                            })
                        }
                    />
                    {errors.name && <ErrorMessage>{String(errors.name.message)}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="lastname" className="text-2xl text-slate-500">Apellidos</label>
                    <input
                        id="lastname"
                        type="text"
                        placeholder="Apellidos"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        { ...register('lastname',
                            {
                                required: 'Apellidos requeridos',
                                minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                                maxLength: { value: 50, message: 'El nombre debe tener menos de 50 caracteres' },
                                pattern: { value: /^\s*[a-zA-Z]+(?: [a-zA-Z]+)*\s*$/, message: 'Apellidos deben contener solo letras' }
                            })
                        }
                    />
                    {errors.lastname && <ErrorMessage>{String(errors.lastname.message)}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email', 
                            {
                                required: 'El email es requerido',                          
                                pattern: {  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'El email no es válido' }
                            }
                        )}
                    />
                    {errors.email && <ErrorMessage>{String(errors.email.message)}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="nickname" className="text-2xl text-slate-500">Nickname</label>
                    <input
                        id="nickname"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('nickname', {
                            required: 'El handle es requerido',
                            minLength: { value: 6, message: 'Tu handle debe tener al menos 6 caracteres' },
                            maxLength: { value: 50, message: 'Tu handle debe tener tener menos de 50 caracteres' },                            
                        })}
                    />
                    {errors.nickname && <ErrorMessage>{String(errors.nickname.message)}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                            maxLength: { value: 50, message: 'La contraseña debe tener menos de 50 caracteres' },
                        })}
                    />
                    {errors.password && <ErrorMessage>{String(errors.password.message)}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', 
                            {
                                required: "La confirmación de la contraseña es requerida", 
                                validate: (value) => value === watchName || "Las contraseñas no coinciden"
                            })
                        }
                    />
                    {errors.password_confirmation && <ErrorMessage>{String(errors.password_confirmation.message)}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
            </form>

            <nav className="mt-10">
                <Link to="/auth/login" className="text-center text-white text-lg block">
                    ¿Ya tienes una cuenta? Iniciar sesión
                </Link>
            </nav>
        </>
    );
}

export default RegisterView;