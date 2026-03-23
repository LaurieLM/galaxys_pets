import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useHealth from "../hooks/useHealth";
import getAnimals from "../api/animals";
import useVaccines from "../hooks/useVaccines";
import useDiseases from "../hooks/useDiseases";
import diseases from "../api/diseases";

export default function Health() {

    // State pour l'animal sélectionné et l'ouverture du dropdown
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { 
        data: animals, 
        isLoading: isLoadingAnimals, 
        isError: isErrorAnimals, 
        error: animalsError
    } = useQuery({
        queryKey: ['animals'],
        queryFn: getAnimals,
    });

    const {
        data: health,
        isLoading: isLoadingHealth,
        isError: isErrorHealth,
        error: healthError
    } = useHealth(selectedAnimalId);

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

    // Ferme le dropdown si on clique en dehors
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedAnimal = animals?.find((animal) => animal.id === selectedAnimalId);

    if (isLoadingAnimals) return <p>Chargement des types d'animaux...</p>;
    if (isErrorAnimals) return <p>Erreur types d'animaux: {(animalsError as Error).message}</p>;

    return (
        <section>
                <h2 className="text-center text-[#8fd3a9] font-bold text-3xl mt-4 mb-8">Santé</h2>

                <div className="m-4 flex justify-center">

                    {/* Dropdown pour sélectionner le type d'animal */}
                    <div className="relative max-w-xs mb-[1.5rem]" ref={dropdownRef}>
                        <button
                            type="button"
                            className="w-[16rem] h-[2.5rem] pl-8 pr-4 text-center flex items-center justify-between rounded-lg border border-slate-500 bg-[#4b5565] text-white shadow-sm"
                            onClick={() => setIsDropdownOpen((current) => !current)}
                        >
                            <span className="truncate">
                                {selectedAnimal ? selectedAnimal.type : "Type d'animal"}
                            </span>
                            <span className={`text-sm transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>
                                v
                            </span>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-slate-500 bg-[#353c48] shadow-lg">
                                <button
                                    type="button"
                                    className="block w-full px-4 py-3 text-left text-white transition-colors hover:bg-slate-600"
                                    onClick={() => {
                                        setSelectedAnimalId(0);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    Sélectionnez un type d'animal
                                </button>

                                {animals?.map((animal) => (
                                    <button
                                        key={animal.id}
                                        type="button"
                                        className="block w-full px-4 py-3 text-left text-white transition-colors hover:bg-slate-600"
                                        onClick={() => {
                                            setSelectedAnimalId(animal.id);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {animal.type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Affichage des recommandations de santé et des vaccins en fonction de l'animal sélectionné */}
                {selectedAnimalId === 0 && (
                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">Veuillez sélectionner un type d'animal pour voir les recommandations de santé.</p>
                )}

                {selectedAnimalId > 0 && isLoadingHealth && <p>Chargement des recommandations de santé...</p>}
                {selectedAnimalId > 0 && isErrorHealth && (
                    <p>Erreur : {(healthError as Error).message}</p>
                )}

                {selectedAnimalId > 0 && health && (
                    <div className="m-4">
                        <h3 className="font-medium text-[1.1rem] text-[#b8e3c8]">Fréquence vermifuge</h3>
                        <p className="text-center text-slate-300 font-thin mt-4 mb-8">{health.dewormingFrequency}</p>

                        <h3 className="font-medium text-[1.1rem] text-[#b8e3c8]">Fréquence visite vétérinaire</h3>
                        <p className="text-center text-slate-300 font-thin mt-4 mb-8">{health.vetCheckFrequency}</p>

                        <h3 className="font-medium text-[1.1rem] text-[#b8e3c8]">Conseils</h3>
                        <p className="text-justify text-slate-300 font-thin mt-4 mb-8 mr-4 ml-4">{health.generalAdvice}</p>
                    </div>
                )}

                {/* Affichage des vaccins recommandés */}
                {selectedAnimalId > 0 && <h3 className="m-4 font-black text-[1.3rem] text-[#b8e3c8] text-center">Vaccins recommandés</h3>}

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
                {selectedAnimalId > 0 && <h3 className="m-4 font-black text-[1.3rem] text-[#b8e3c8] text-center">Maladies courantes</h3>}

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