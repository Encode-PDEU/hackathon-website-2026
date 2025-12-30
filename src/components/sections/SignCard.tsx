import React from 'react';
import { LucideIcon } from 'lucide-react';
import hangingSign from '../../../public/hanging-sign-removebg-preview.png';

interface SignCardProps {
    icon: LucideIcon;
    title: string;
    date: string;
    description: string;
    iconClassName?: string;
}

export function SignCard({ icon: Icon, title, date, description, iconClassName }: SignCardProps) {
    return (
        <div
            className="relative w-[260px] sm:w-[440px] origin-top hover:animate-[swing_2s_ease-in-out_infinite]"
        >
            <img
                src={hangingSign}
                alt="Timeline sign"
                draggable={false}
                className="w-full h-auto select-none pointer-events-none mix-blend-screen"
            />

            <div className="absolute left-0 right-0 top-[42%] sm:top-[46%] px-6 sm:px-12 text-center pointer-events-none">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <Icon className={`w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 drop-shadow-[2px_2px_0_rgba(0,0,0,1)] ${iconClassName || ''}`} />
                    <h3 className="text-lg sm:text-2xl font-pixel font-bold text-yellow-400 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                        {title}
                    </h3>
                </div>

                <p className="text-sm sm:text-xl font-retro font-bold text-[#55FFFF] drop-shadow-[2px_2px_0_rgba(0,0,0,1)] mb-2 sm:mb-3 opacity-100">
                    {date}
                </p>

                <p className="text-sm sm:text-lg font-minecraft text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)] leading-relaxed max-w-[220px] sm:max-w-[340px] mx-auto opacity-100">
                    {description}
                </p>
            </div>
        </div>
    );
}
