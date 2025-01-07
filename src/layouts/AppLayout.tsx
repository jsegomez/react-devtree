import { Navigate } from "react-router-dom";

import { getUser } from "../api/DevTreeAPI";
import { useQuery } from "@tanstack/react-query";
import DevTree from "../components/DevTree";

export default function AppLayout() {
    const { data, isError, isLoading } = useQuery({        
        queryFn: () => getUser(),
        queryKey: ['data-user'],
        retry: 1,
        refetchOnWindowFocus: false,
    });

    if(isError) return <Navigate to="/auth/login" />
    if(isLoading) return <div>Cargando...</div>
    if(data) return <DevTree data={data}/>
}


