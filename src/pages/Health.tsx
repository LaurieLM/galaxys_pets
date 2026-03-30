import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import healthSectionLogo from "../assets/health_section_logo.svg";
import Dropdown from "../components/Dropdown";
import Filter from "../components/Filter";
import GeneralInfo from "../components/GeneralInfo";
import VaccineInfo from "../components/VaccineInfo";
import Disease from "../components/Disease";
import Navbar from "../components/Navbar";

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
            <Navbar />
            {/* Dropdown pour sélectionner le type d'animal */}
            <Dropdown selectedAnimalId={selectedAnimalId} setSelectedAnimalId={setSelectedAnimalId} />

            <h2 className="flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#8fd3a9] mb-4">
                <img src={healthSectionLogo} alt="Icône santé" className="h-12 w-12" />
                Santé
            </h2>

            {/* Filtres pour les vaccins et les maladies */}
            <div className="flex justify-around">
                <Filter
                    label="Filtrer par vaccins"
                    options={[
                        { value: "vaccine", label: "Vaccins" },
                    ]}
                    selectedValue="vaccine"
                    onChange={(value) => console.log(value)}
                />

                <Filter
                    label="Filtrer par maladies"
                    options={[
                        { value: "disease", label: "Maladies" },
                    ]}
                    selectedValue="disease"
                    onChange={(value) => console.log(value)}
                />
            </div>


            {selectedAnimalId === 0 && (
                <p className="text-[1.2rem] text-center text-slate-300 font-thin mt-32 mr-4 ml-4">Veuillez sélectionner un type d'animal pour voir les recommandations de santé.</p>
            )}

            {/* Affichage des recommandations de santé pour l'animal sélectionné */}
            <GeneralInfo selectedAnimalId={selectedAnimalId} />

            {/* Affichage des vaccins recommandés */}
            <VaccineInfo selectedAnimalId={selectedAnimalId} />

            {/* Affichage des maladies courantes */}
            <Disease selectedAnimalId={selectedAnimalId} />
        </section>
    );
}