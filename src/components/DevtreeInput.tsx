import { Switch } from '@headlessui/react'
import type { SocialNetwork } from '../types/social-network';
import type { ChangeEvent } from 'react';

type DevtreeInputProps = {
    devtreeLinks: SocialNetwork;
    handleUrlChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleEnabledChange: (newState: boolean, socialNetwork: string) => void;
}

export default function DevtreeInput({devtreeLinks, handleUrlChange, handleEnabledChange}: DevtreeInputProps) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 cursor-grab">
            <div
                className="w-12 h-12 bg-cover"
                style={{ backgroundImage: `url('/social/icon_${devtreeLinks.name}.svg')` }}
            ></div>

            <input
                type="text"                
                value={ devtreeLinks.url }
                name={ devtreeLinks.name }
                className="flex-1 border border-gray-300 rounded-lg p-2"                
                onChange={ handleUrlChange }                
            />
            <Switch
                className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600 cursor-pointer"
                checked={ devtreeLinks.enabled }
                name={ devtreeLinks.name }
                onChange={ (e)=> handleEnabledChange(e, devtreeLinks.name)}
            >
                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
            </Switch>
        </div>
    )
}
