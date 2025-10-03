import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

import { getPublicUser } from "../api/DevTreeApi";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import HandleData from "../components/HandleData";

export default function UserView() {
  const { user } = useParams<string>();  

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['public-user', user],
    queryFn: () => getPublicUser(user!),
    retry: false,
    refetchOnWindowFocus: true,
    enabled: !!user
  });

  if(isLoading) return <LoadingSpinner />;
  if(isError || isSuccess && !data) {
    return <Navigate to="/public/not-found" replace state={{ user }} />;
  };
    
  return <>
    {data && ( <HandleData user={data} /> )}
  </>;  
}


