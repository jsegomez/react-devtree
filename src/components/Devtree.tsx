import { Link, Outlet, useNavigate } from "react-router-dom";

import NavigationTabs from "./NavigationTabs";
import type { User } from "../types/user";
import { Toaster } from "sonner";
import type { SocialNetwork } from "../types/social-network";
import { useEffect, useState } from "react";
import DevtreeLink from "./DevtreeLink";

type DevtreeProps = {
    userData: User;
}

export default function Devtree({ userData }: DevtreeProps) {
    const navigate = useNavigate();    
    const [activeLinks, setActiveLinks] = useState<SocialNetwork[]>([]);

    useEffect(() => {
        const socialLinks = JSON.parse(userData.links) as SocialNetwork[];
        const links =socialLinks.filter((link) => link.enabled);
        const sortedLinks = links.sort((a, b) => a.position! - b.position!);           
    
        setActiveLinks(sortedLinks);
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
                            to={''}
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

                                <div className="mt-20 flex flex-col gap-5">
                                    {
                                        activeLinks.map((link) => (
                                            <DevtreeLink key={link.name} link={link} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    )
}
