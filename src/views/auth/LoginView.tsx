import { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import api from "../../utils/axios";
import ErrorMessage from "../../components/ErrorMessage";
import { LoginForm } from "../../types/user.types";
import { useState } from "react";

const LoginView = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues: LoginForm = {
        email: 'jsegomez@gmail.com',
        password: 'Gnome$9900'
    }
    
    const { register, handleSubmit, reset: resetLoginForm, formState: { errors } } = useForm({ defaultValues });

    const handleLogin = async(dataForm: LoginForm) => {        
        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/login', dataForm);     
            handleLoginSuccess(data);
        } catch (error: any) {
            if(isAxiosError(error)) toast.error(error.response?.data.message);
        }
    }

    const handleLoginSuccess = (data: any) => {
        resetLoginForm();
        sessionStorage.setItem('token', data.token);        
        setIsLoading(false);
        navigate('/admin');
        setTimeout(() => {
            toast.success('Sesión iniciada satisfactoriamente');
        }, 100);
    }

    return (
        <>                
            <h1 className="text-4xl text-white font-bold text-center">Iniciar sesión</h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >                
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

                <input
                    type="submit"
                    disabled={isLoading}
                    className={`p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer ${isLoading ? 'bg-slate-400' : 'bg-cyan-400'}`}
                    value='Iniciar sesión'
                />
            </form>

            <nav className="mt-10">
                <Link to="/auth/register" className="text-center text-white text-lg block">
                    ¿No tienes una cuenta? Crea una aquí
                </Link>
            </nav>
        </>
    );
}
 
export default LoginView;