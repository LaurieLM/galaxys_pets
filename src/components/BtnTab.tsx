interface BtnTabProps {
    logo: string;
    text: string;
    color: 'blue' | 'emerald' | 'orange';
    active?: boolean;
}

export default function BtnTab({ logo, text, color, active = false }: BtnTabProps) {
    const activeColorClasses = {
        blue: 'text-blue-600 bg-blue-50',
        emerald: 'text-emerald-600 bg-emerald-50',
        orange: 'text-orange-600 bg-orange-50',
    }

    const hoverColorClasses = {
        blue: 'hover:text-blue-600 hover:bg-blue-50',
        emerald: 'hover:text-emerald-600 hover:bg-emerald-50',
        orange: 'hover:text-orange-600 hover:bg-orange-50',
    }

    return (
        <div
            className={`h-full flex flex-col items-center justify-center rounded-xl ${
                active ? activeColorClasses[color] : `text-black ${hoverColorClasses[color]}`
            }`}
        >
            <img src={logo} alt="" className="h-6 w-6" />
            <p className="text-sm font-thin">{text}</p>
        </div>
    )
}