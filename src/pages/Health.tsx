import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useHealth from "../hooks/useHealth";
import getAnimals from "../api/animals";

export default function Health() {
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);
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
        error: healthError,
    } = useHealth(selectedAnimalId);

    if (isLoadingAnimals) return <p>Chargement des types d'animaux...</p>;
    if (isErrorAnimals) return <p>Erreur types d'animaux: {(animalsError as Error).message}</p>;

    
    return (
        <section>
                <h2 className="text-center text-[#8fd3a9] font-bold text-3xl mt-4 mb-8">Santé</h2>

                <div className="m-4">
                    <label>Type d'animal</label>
                    <select value={selectedAnimalId}
                    onChange={(e) => setSelectedAnimalId(Number(e.target.value))}>
                        <option value={0}>Sélectionnez un type d'animal</option>
                        {animals?.map((animal) => (
                            <option key={animal.id} value={animal.id}>
                                {animal.type}
                            </option>
                        ))}
                    </select>
                </div>

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
            </section>
        );
    }