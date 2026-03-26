import { useState } from "react";
import healthSectionLogo from "../assets/health_section_logo.svg";
import Dropdown from "../components/Dropdown";
import GeneralInfo from "../components/GeneralInfo";
import VaccineInfo from "../components/VaccineInfo";
import Disease from "../components/Disease";

export default function Health() {
    // State pour l'animal sélectionné et l'ouverture du dropdown
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);

    return (
        <section>
                <h2 className="mt-4 mb-8 flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#8fd3a9]">
                    <img src={healthSectionLogo} alt="Icône santé" className="h-12 w-12" />
                    Santé
                </h2>

                {/* Dropdown pour sélectionner le type d'animal */}
                <Dropdown selectedAnimalId={selectedAnimalId} setSelectedAnimalId={setSelectedAnimalId} />

                {/* Affichage des recommandations de santé pour l'animal sélectionné */}
                <GeneralInfo selectedAnimalId={selectedAnimalId} />

                {/* Affichage des vaccins recommandés */}
                <VaccineInfo selectedAnimalId={selectedAnimalId} />

                {/* Affichage des maladies courantes */}
                <Disease selectedAnimalId={selectedAnimalId} />
            </section>
        );
    }