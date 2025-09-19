import type { SocialNetwork } from "../types/social-network";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type DevtreeLinkProps = {
    link: SocialNetwork;
}

export default function DevtreeLink({ link }: DevtreeLinkProps) {    
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: link.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li
            ref={ setNodeRef }
            style={ style }            
            { ...attributes }
            { ...listeners }
            className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg cursor-pointer"
        >
            <div
                style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}                
                className="w-12 h-12"
            />
            <p className="text-slate-800 capitalize">Visita mi: <span className="font-bold">{link.name}</span></p>
        </li>
    )
}
