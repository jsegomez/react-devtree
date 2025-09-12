import { useState, type ChangeEvent } from "react"
import { social } from "../data/social"
import type { SocialNetwork } from "../types/social-network";
import DevtreeInput from "../components/DevtreeInput";
import { isValidHttpsUrl } from "../utils/validate-url";
import { toast } from "sonner";
import { errorToast } from "../layouts/sonner-alert";

export default function LinkTreeView() {
  const [ devtreeLinks, setDevtreeLinks ] = useState<SocialNetwork[]>(social);
  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {    
    const { name, value } = event.target;    
    const updatesLinks = devtreeLinks.map((link) => link.name === name ? { ...link, url: value } : link);
    setDevtreeLinks(updatesLinks);
  }

  const handleEnabledChange = (newState: boolean, socialNetwork: string) => {  
    const targetLink = devtreeLinks.find((link)=> link.name == socialNetwork ? link.url : '');
    const isValidUrl = isValidHttpsUrl(targetLink?.url || '');

    if(newState && isValidUrl){
      const updatesLinks = devtreeLinks.map((link) => link.name === socialNetwork ? { ...link, enabled: newState } : link);
      setDevtreeLinks(updatesLinks);
    }else{
      toast.error("La URL no es válida", errorToast);
    }
  }

  return (
    <div className="space-y-5">
      {
        devtreeLinks.map((link: SocialNetwork) => (
          <DevtreeInput
            key={link.name}
            devtreeLinks={link}
            handleUrlChange={handleUrlChange}
            handleEnabledChange={handleEnabledChange}
          />
        ))
      }
    </div>
  )
}
 