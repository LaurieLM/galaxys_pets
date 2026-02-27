interface BtnNavbarProps {
    logo: string;
    text: string;
    color: 'blue' | 'emerald' | 'orange';
    active?: boolean;
    onClick?: () => void;
}

export default function BtnNavbar({ logo, text, color, active = false, onClick }: BtnNavbarProps) {
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

    const inlineLogo = logo
        .replace('<svg', '<svg width="24" height="24" style="display:block"')
        .replace(/<\?xml[^>]*>/g, '')

    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-1/3 m-1 flex flex-col items-center justify-center rounded-xl transition-all duration-200 ${
                active ? activeColorClasses[color] : `text-black ${hoverColorClasses[color]}`
            }`}
        >
            <span
                aria-hidden="true"
                className="inline-flex h-6 w-6 items-center justify-center"
                dangerouslySetInnerHTML={{ __html: inlineLogo }}
            />
            <p className="text-sm font-thin">{text}</p>
        </button>
    )
}