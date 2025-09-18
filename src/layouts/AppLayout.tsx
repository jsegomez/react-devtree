import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api/DevTreeApi";
import Devtree from "../components/Devtree";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function AppLayout() {
    const { data: userData, isLoading } = useQuery({        
        queryFn: () => getUser(),
        queryKey: ['data-user'],
        retry: 1,
        refetchOnWindowFocus: false,        
    })
    
    if(isLoading) return <LoadingSpinner />
    if(userData) return <Devtree userData={userData}/>    
}