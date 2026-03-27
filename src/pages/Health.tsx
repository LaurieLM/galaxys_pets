import { useState } from "react";
import healthSectionLogo from "../assets/health_section_logo.svg";
import Dropdown from "../components/Dropdown";
import GeneralInfo from "../components/GeneralInfo";
import VaccineList from "../components/VaccineList";
import DiseaseList from "../components/DiseaseList";


export default function Health() {
    // State pour l'animal sélectionné et l'ouverture du dropdown
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);

    // State pour le vaccin et la maladie sélectionnés dans les filtres
    const [selectedVaccineName, setSelectedVaccineName] = useState<string>("");
    const [selectedDiseaseName, setSelectedDiseaseName] = useState<string>("");

    return (
        <section> 
            {/* Dropdown pour sélectionner le type d'animal */}
            <Dropdown selectedAnimalId={selectedAnimalId} setSelectedAnimalId={setSelectedAnimalId} />

            <h2 className="flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#8fd3a9] mb-4">
                <img src={healthSectionLogo} alt="Icône santé" className="h-12 w-12" />
                Santé
            </h2>
            
            {/* Filtres pour les vaccins et les maladies */}
            <div className="flex justify-around">
                <VaccineList selectedAnimalId={selectedAnimalId} selectedVaccineName={selectedVaccineName} setSelectedVaccineName={setSelectedVaccineName} />
                <DiseaseList selectedAnimalId={selectedAnimalId}  selectedDiseaseName={selectedDiseaseName} setSelectedDiseaseName={setSelectedDiseaseName} />
            </div>

            {/* Affichage des recommandations de santé pour l'animal sélectionné */}
            <GeneralInfo selectedAnimalId={selectedAnimalId} />

            {/* Affichage d'un message si aucun animal n'est sélectionné */}
            {selectedAnimalId === 0 && (
                <p className="text-[1.2rem] text-center text-slate-300 font-thin mt-32 mr-4 ml-4">Veuillez sélectionner un type d'animal pour voir les recommandations de santé.</p>
            )}
            
            {/* Affichage d'un message si un animal est sélectionné mais aucun vaccin ou maladie n'est sélectionné */}
            {selectedAnimalId > 0 && selectedVaccineName === "" && selectedDiseaseName === "" && (
                <p className="text-[1.2rem] text-center text-slate-300 font-thin mt-32 mr-4 ml-4">Veuillez sélectionner un vaccin ou une maladie pour voir ses informations.</p>
            )}
            
        </section>
    );
}