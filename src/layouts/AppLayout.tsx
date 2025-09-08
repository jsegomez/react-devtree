import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api/DevTreeApi";
import Devtree from "../components/Devtree";

export default function AppLayout() {
    const { data: userData, isLoading } = useQuery({        
        queryFn: () => getUser(),
        queryKey: ['data-user'],
        retry: 1,
        refetchOnWindowFocus: true,        
    })
    
    if(isLoading) return <div>Loading...</div>
    if(userData) return <Devtree userData={userData}/>
}