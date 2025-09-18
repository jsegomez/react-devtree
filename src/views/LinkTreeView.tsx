import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEffect, useState, type ChangeEvent } from "react"
import { social } from "../data/social"
import type { SocialNetwork } from "../types/social-network";
import DevtreeInput from "../components/DevtreeInput";
import { isValidHttpsUrl } from "../utils/validate-url";
import { toast } from "sonner";
import { errorToast, successToast } from "../layouts/sonner-alert";
import { updateUser } from "../api/DevTreeApi";
import type { User } from "../types/user";

export default function LinkTreeView() {
  const queryClient = useQueryClient();
  const userData: User = queryClient.getQueryData(['data-user'])!;
  const initialState = () => {       
    if(userData.links && userData.links != '[]') return JSON.parse(userData.links);
    else return social;
  }
  
  const [ devtreeLinks, setDevtreeLinks ] = useState<SocialNetwork[]>(initialState);
  const [ isButtonDisabled, setIsButtonDisabled ] = useState<boolean>(false);

  const { isPending, mutate: updateUserMutation } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast("Links actualizados exitosamente", successToast);
      queryClient.invalidateQueries({ queryKey: ['data-user'] });
      setIsButtonDisabled(false);
    },
    onError: (error: Error) => {
      if(isAxiosError(error)) toast(error.response?.data.message as string, errorToast);
      else toast("Error al actualizar los links", errorToast);
    },
  });

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {    
    const { name, value } = event.target;    
    const updatesLinks = devtreeLinks.map((link) => link.name === name ? { ...link, url: value } : link);
    setDevtreeLinks(updatesLinks);
  }

  const updateButtonState = (isEnablingSocialNetwork: boolean, socialNetwork: string) => {      
    const targetLink = devtreeLinks.find((link)=> link.name == socialNetwork ? link.url : '');        
    const isValidUrl = isValidHttpsUrl(targetLink?.url || '');    

    if(isValidUrl && targetLink){
      const result =modifiedLinks(targetLink, isEnablingSocialNetwork);
      setDevtreeLinks(result);      
    }else{
      toast.error("La URL no es válida", errorToast);
    }
  }

  const modifiedLinks = (targetLink: SocialNetwork, isEnablingSocialNetwork: boolean):SocialNetwork[] => {
    if(isEnablingSocialNetwork){
      const position = devtreeLinks.filter((link)=> link.enabled).length + 1;
      return devtreeLinks.map((link) => link.name === targetLink.name ? { ...link, position, enabled: true } : link);      
    }else{      
      return devtreeLinks.map((link) => link.name === targetLink.name ? { ...link, position: null, enabled: false } : link);      
    }
  }

  const sendUserProfileUpdate = () => {
    const updatedUser: User = {
      ...userData,
      links: JSON.stringify(devtreeLinks),
    }
    updateUserMutation(updatedUser);
  }

  useEffect(() => {
    const areAllLinksValid = devtreeLinks.every((link) => link.url === '' ? true : isValidHttpsUrl(link.url));
    const isStateUnchanged = JSON.stringify(JSON.parse(userData.links)) == JSON.stringify(devtreeLinks);    
    
    setIsButtonDisabled(areAllLinksValid && !isStateUnchanged);
  }, [devtreeLinks, userData.links]);

  return (
    <div className="space-y-5">
      {
        devtreeLinks.map((link: SocialNetwork) => (
          <DevtreeInput
            key={link.name}
            devtreeLinks={link}
            handleUrlChange={handleUrlChange}
            handleEnabledChange={updateButtonState}
          />
        ))
      }

      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={ isPending || !isButtonDisabled }
        onClick={ sendUserProfileUpdate }
      >Guardar cambios</button>
    </div>
  )
}
 