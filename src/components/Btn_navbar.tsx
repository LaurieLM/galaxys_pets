interface BtnNavbarProps {
    logo: string;
    text: string;
}

export default function BtnNavbar({ logo, text }: BtnNavbarProps) {
    return (
        <button type="button" className="font-thin">
            <img src={logo} alt={`${text} Logo`} />
            <p>{text}</p>
            
        </button>
    )
}