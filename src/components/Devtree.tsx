import { Link, Outlet, useNavigate } from "react-router-dom";

import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';

import NavigationTabs from "./NavigationTabs";
import type { User } from "../types/user";
import { toast, Toaster } from "sonner";
import type { SocialNetwork } from "../types/social-network";
import { useEffect, useState } from "react";
import DevtreeLink from "./DevtreeLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/DevTreeApi";
import { errorToast, successToast } from "../layouts/sonner-alert";
import { isAxiosError } from "axios";


type DevtreeProps = {
    userData: User;
}

export default function Devtree({ userData }: DevtreeProps) {
    const navigate = useNavigate();
    const [activeLinks, setActiveLinks] = useState<SocialNetwork[]>([]);
    const [disabledLinks, setDisabledLinks] = useState<SocialNetwork[]>([]);
    const queryClient = useQueryClient();
    const [isPendingSave, setIsPendingSave] = useState<boolean>(false);

    const handleDragEnd = (event: DragEndEvent) => {
        const over = event.over
        if (over) {
            const prevIndex = activeLinks.findIndex(link => link.id == event.active.id);
            const newIndex = activeLinks.findIndex(link => link.id === over.id);
            const order = arrayMove(activeLinks, prevIndex, newIndex);
            const sortedActiveLinks =order.map((link, index) => ({
                ...link,
                id: index
            }));
            setActiveLinks(sortedActiveLinks);
            setIsPendingSave(true);            
        }
    }

    const throwMutate = () => {                
        const udpatedLinks = JSON.stringify([...activeLinks, ...disabledLinks]);
        setIsPendingSave(false);
    
        queryClient.setQueryData(['data-user'], (prevData: User) => {
            return {
                ...prevData,
                links: udpatedLinks
            }
        }); 

        updateUserMutation(queryClient.getQueryData(['data-user'])!)
    }

    const { mutate: updateUserMutation } = useMutation({
            mutationFn: updateUser,
            onSuccess: () => {
            toast("Links actualizados exitosamente", successToast);
            queryClient.invalidateQueries({ queryKey: ['data-user'] });
        },
        onError: (error: Error) => {
        if(isAxiosError(error)) toast(error.response?.data.message as string, errorToast);
        else toast("Error al actualizar los links", errorToast);
        },
    });

    useEffect(() => {
        const parsedLinks = JSON.parse(userData.links) as SocialNetwork[];        

        setActiveLinks(parsedLinks.filter((link) => link.enabled).sort((a, b) => a.id - b.id));
        setDisabledLinks(parsedLinks.filter((link) => !link.enabled));
        setIsPendingSave(false);
    }, [userData.links]);


    const closeSession = () => {
        sessionStorage.removeItem('token');
        navigate('/auth/login')
    }

    return (
        <div>
            <header className="bg-slate-800 py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src="/logo.svg" className="w-full block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <button
                            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                            onClick={closeSession}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gray-100 py-10 animate__animated animate__fadeIn animate__faster">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/public/${userData.username}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil/ {userData.username}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6 rounded-lg">

                            {userData.image && (
                                <img
                                    src={userData.image}
                                    alt="Imagen de perfil"
                                    className="w-full h-80 rounded-lg object-contain"
                                    loading="lazy"
                                />
                            )}
                            <div className="flex flex-col gap-2 text-center text-white">
                                <p className="text-lg font-black">{userData.username}</p>
                                <p className="text-md font-medium">{userData.description}</p>

                                <DndContext
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <div className="mt-20 flex flex-col gap-5">
                                        <SortableContext
                                            items={activeLinks}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {
                                                activeLinks.map((link) => (
                                                    <DevtreeLink key={link.name} link={link} />
                                                ))
                                            }
                                        </SortableContext>
                                    </div>
                                </DndContext>

                                {
                                    isPendingSave && (
                                        <button className="bg-cyan-400 p-2 font-bold mt-2" onClick={throwMutate}>
                                            Guardar cambios
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    )
}
