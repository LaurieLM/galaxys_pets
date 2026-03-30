import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import healthSectionLogo from "../assets/health_section_logo.svg";
import GeneralInfo from "../components/GeneralInfo";
import VaccineInfo from "../components/VaccineInfo";
import Disease from "../components/Disease";
import Tab from "../components/Tab";

export default function Health() {
    const [searchParams] = useSearchParams();
    // const animalIdParam = searchParams.get("animalId");

    // State pour l'animal sélectionné et l'ouverture du dropdown
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);

    useEffect(() => {
        const parsedAnimalId = Number(searchParams.get("animalId"));
        if (parsedAnimalId > 0) {
            setSelectedAnimalId(parsedAnimalId);
        }
    }, [searchParams]);

    return (
        <section> 
            <h2 className="flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#8fd3a9] mb-4">
                <img src={healthSectionLogo} alt="Icône santé" className="h-12 w-12" />
                Santé
            </h2>

            {/* Affichage des recommandations de santé pour l'animal sélectionné */}
            <GeneralInfo selectedAnimalId={selectedAnimalId} />

            {/* Affichage des vaccins recommandés */}
            <VaccineInfo selectedAnimalId={selectedAnimalId} />

            {/* Affichage des maladies courantes */}
            <Disease selectedAnimalId={selectedAnimalId} />
            
            <Tab/>
        </section>
    );
}