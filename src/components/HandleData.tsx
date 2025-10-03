import type { SocialNetwork } from "../types/social-network";
import type { PublicUser } from "../types/user";

type HandleDataProps = {
    user: PublicUser;
}

const getEnabledLinks = (links: string): SocialNetwork[] => {    
    const parsedLinks = JSON.parse(links || '[]') as SocialNetwork[];
    return parsedLinks.filter( (link: SocialNetwork) => link.enabled === true ).sort( (a: SocialNetwork, b: SocialNetwork) => a.id - b.id );
}

export default function HandleData({ user }: HandleDataProps) {
    const links = getEnabledLinks(user.links || '[]');

    return (
        <div className="space-y-6 text-white">
            <p className="text-5xl text-center font-black">{user.username}</p>
            { user.image && <img src={user.image} alt={user.username} className="max-w-[250px] mx-auto" /> }
            <p className="text-lg text-center font-black">{user.description}</p>

            <div className="mt-20 flex flex-col gap-4">
                { 
                    links.length == 0 ? (
                        <p className="text-center">No hay enlaces activos</p>
                    ) : (
                        links.map( (link: SocialNetwork) => (
                            <a 
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-black text-center p-3 rounded-lg font-bold hover:bg-gray-200 transition flex items-center justify-center"
                            >
                                <img src={`/social/icon_${link.name}.svg`} alt={link.name} className="w-10 mr-2" />
                                <p>
                                    Visita mi <span className="capitalize">{link.name}</span>
                                </p>
                            </a>
                        ))
                    )
                }
            </div>
        </div>
    )
}
