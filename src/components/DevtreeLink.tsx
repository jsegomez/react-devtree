import type { SocialNetwork } from "../types/social-network";

type DevtreeLinkProps = {
    link: SocialNetwork;
}

export default function DevtreeLink({ link }: DevtreeLinkProps) {
    return (
        <li key={link.name} className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg cursor-pointer">
            <div
                style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}                
                className="w-12 h-12"
            />
            <p className="text-slate-800 capitalize">Visita mi: <span className="font-bold">{link.name}</span></p>
        </li>
    )
}
