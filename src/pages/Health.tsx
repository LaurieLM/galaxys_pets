import { useState } from "react";
import useVaccines from "../hooks/useVaccines";
import useDiseases from "../hooks/useDiseases";
import healthSectionLogo from "../assets/health_section_logo.svg";
import vaccineLogo from "../assets/vaccine_logo.svg";
import diseaseLogo from "../assets/disease_logo.svg";
import Dropdown from "../components/Dropdown";
import GeneralInfo from "../components/GeneralInfo";

export default function Health() {
    // State pour l'animal sélectionné et l'ouverture du dropdown
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);

    const { 
        data: vaccines, 
        isLoading: isLoadingVaccines, 
        isError: isErrorVaccines, 
        error: vaccinesError
    } = useVaccines(selectedAnimalId);

    const {
        data: diseases,
        isLoading: isLoadingDiseases,
        isError: isErrorDiseases,
        error: diseasesError
    } = useDiseases(selectedAnimalId);

    return (
        <section>
                <h2 className="mt-4 mb-8 flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#8fd3a9]">
                    <img src={healthSectionLogo} alt="Icône santé" className="h-12 w-12" />
                    Santé
                </h2>

                {/* Dropdown pour sélectionner le type d'animal */}
                <Dropdown selectedAnimalId={selectedAnimalId} setSelectedAnimalId={setSelectedAnimalId} />
                <GeneralInfo selectedAnimalId={selectedAnimalId} />

                {/* Affichage des vaccins recommandés */}
                {selectedAnimalId > 0 && (
                    <h3 className="m-4 flex items-center justify-center gap-3 text-center font-black text-[1.3rem] text-[#b8e3c8]">
                        <img src={vaccineLogo} alt="Icône vaccin" className="h-12 w-12" />
                        Vaccins recommandés
                    </h3>
                )}

                {selectedAnimalId > 0 && isLoadingVaccines && (
                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">Chargement des vaccins...</p>
                )}

                {selectedAnimalId > 0 && isErrorVaccines && (
                    <p className="text-center text-red-400 mt-4 mb-8">Erreur vaccins : {(vaccinesError as Error).message}</p>
                )}

                {selectedAnimalId > 0 && vaccines && vaccines.length === 0 && (
                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">Aucun vaccin trouvé pour cet animal.</p>
                )}

                {selectedAnimalId > 0 && vaccines && vaccines.length > 0 && (
                    <ul className="ml-4 mr-4 space-y-4">
                        {vaccines.map((vaccine) => (
                            <li key={vaccine.name} className="bg-slate-800/40 rounded p-4">
                                <ul>
                                    <h3 className="inline-block py-1 px-4 text-[#b8e3c8] text-[1.1rem] font-[800] bg-[#3a8d592e] text-center rounded-[0.9rem]">{vaccine.name}</h3>

                                    <h4 className="font-[300] text-[1rem] text-[#b8e3c8] mt-4">Description</h4>
                                    <li className="text-slate-300 font-thin text-justify mt-4 mb-4">{vaccine.description}</li> 

                                    <h4 className="font-[300] text-[1rem] text-[#b8e3c8]">Première dose</h4>
                                    <li className="text-slate-300 font-thin text-center mt-4 mb-4">{vaccine.firstDose}</li>

                                    <h4 className="font-[300] text-[1rem] text-[#b8e3c8]">Rappels</h4>
                                    <li className="text-slate-300 font-thin text-center mt-4">{vaccine.reminders}</li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Affichage des maladies courantes */}
                {selectedAnimalId > 0 && (
                    <h3 className="m-4 flex items-center justify-center gap-3 text-center font-black text-[1.3rem] text-[#b8e3c8]">
                        <img src={diseaseLogo} alt="Icône maladies" className="h-12 w-12" />
                        Maladies courantes
                    </h3>
                )}

                {selectedAnimalId > 0 && isLoadingDiseases && (
                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">Chargement des maladies...</p>
                )}

                {selectedAnimalId > 0 && isErrorDiseases && (
                    <p className="text-center text-red-400 mt-4 mb-8">Erreur maladies : {(diseasesError as Error).message}</p>
                )}

                {selectedAnimalId > 0 && diseases && diseases.length === 0 && (
                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">Aucune maladie trouvée pour cet animal.</p>
                )}

                {selectedAnimalId > 0 && diseases && diseases.length > 0 && (
                    <ul className="ml-4 mr-4 space-y-4">
                        {diseases.map((disease) => (
                            <li key={disease.name} className="bg-slate-800/40 rounded p-4">
                                <ul>
                                    <h3 className="inline-block py-1 px-4 text-[#b8e3c8] text-[1.1rem] font-[800] bg-[#f5787838] text-center rounded-[0.9rem]">{disease.name}</h3>

                                    <h4 className="font-[300] text-[1rem] text-[#b8e3c8] mt-4">Description</h4>
                                    <li className="text-slate-300 font-thin text-justify mt-4 mb-4">{disease.description}</li> 

                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        );
    }