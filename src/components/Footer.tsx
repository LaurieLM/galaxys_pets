type FooterProps = {
    className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
    return (
        <footer className={`bg-slate-800 text-white text-center ${className}`}>
            <p className="font-thin text-[0.80rem] pt-4 pb-4">
                &copy; 2026 Galaxy's Pets - Plateforme d'informations animalières <br />
                Tous droits réservés. <br /> <br />
                Toutes les informations sont fournies à titre indicatif. <br />
                Consultez toujours un vétérinaire professionnel.
            </p>
        </footer>
    )
}