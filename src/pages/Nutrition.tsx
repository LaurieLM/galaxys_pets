import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getAnimals from "../api/animals";
import nutritionLogo from "../assets/nutrition_logo.svg?raw";
import useFoodTypes from "../hooks/useFoodTypes";
import useAdvantages from "../hooks/useAdvantages";
import useDisadvantages from "../hooks/useDisadvantages";

export default function Nutrition() {

    // State pour gérer l'animal sélectionné et l'ouverture du dropdown
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const inlineNutritionLogo = nutritionLogo
        .replace('<svg', '<svg width="48" height="48" style="display:block"')
        .replace(/<\?xml[^>]*>/g, '');

    const {
        data: animals,
        isLoading: isLoadingAnimals,
        isError: isErrorAnimals,
        error: animalsError,
    } = useQuery({
        queryKey: ["animals"],
        queryFn: getAnimals,
    });

    const {
        data: foodTypes,
        isLoading: isLoadingFoodTypes,
        isError: isErrorFoodTypes,
        error: foodTypesError,
    } = useFoodTypes(selectedAnimalId);

    const {
        data: advantages,
        isLoading: isLoadingAdvantages,
        isError: isErrorAdvantages,
        error: advantagesError,
    } = useAdvantages(selectedAnimalId);

    const {
        data: disadvantages,
        isLoading: isLoadingDisadvantages,
        isError: isErrorDisadvantages,
        error: disadvantagesError,
    } = useDisadvantages(selectedAnimalId);

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

    // Récupérer l'animal sélectionné à partir de la liste des animaux
    const selectedAnimal = animals?.find((animal) => animal.id === selectedAnimalId);

    // Gestion des états de chargement et d'erreur pour les types d'animaux
    if (isLoadingAnimals) return <p>Chargement des types d'animaux...</p>;
    if (isErrorAnimals) return <p>Erreur types d'animaux: {(animalsError as Error).message}</p>;

    return (
        <section>
            <h2 className="mt-4 mb-8 flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#ca814e]">
                <span
                    aria-hidden="true"
                    className="inline-flex h-12 w-12 items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: inlineNutritionLogo }}
                />
                Nutrition
            </h2>

            {/* Dropdown pour sélectionner le type d'animal */}
            <div className="m-4 flex justify-center">
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

            {/* Affichage des recommandations de nutrition pour l'animal sélectionné */}
            {selectedAnimalId === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">
                    Veuillez sélectionner un type d'animal pour voir les recommandations de nutrition.
                </p>
            )}

            {/* Affichage des types de nutrition pour l'animal sélectionné */}
            {selectedAnimalId > 0 && (
                <h3 className="m-4 flex items-center justify-center gap-3 text-center font-black text-[1.3rem] text-[#ca814e]">Types de nutrition</h3>
            )}

            {/* Gestion des états de chargement et d'erreur */}
            {selectedAnimalId > 0 && isLoadingFoodTypes && <p className="text-center text-slate-300 font-thin mt-4 mb-8">Chargement des types de nutrition...</p>}
            
            {selectedAnimalId > 0 && isErrorFoodTypes && <p className="text-center text-red-400 mt-4 mb-8">Erreur types de nutrition: {(foodTypesError as Error).message}</p>}
            
            {selectedAnimalId > 0 &&foodTypes && foodTypes.length === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">Aucun type de nutrition trouvé pour cet animal.</p>
            )}

            {selectedAnimalId > 0 && foodTypes && foodTypes.length > 0 && (
                <ul className="ml-4 mr-4 space-y-4">
                    {foodTypes.map((foodType) => (
                        <li key={foodType.name} className="bg-slate-800/40 rounded p-4">
                            <ul>
                                <h3 className="inline-block py-1 px-4 bg-[#87462938] text-center rounded-[0.9rem] text-[#ca814e] text-[1.1rem] font-[800] ">{foodType.name}</h3>

                                <h4 className="text-[#d4a07d] font-[300] text-[1rem] mt-4">Description</h4>
                                <li className="text-slate-300 font-thin text-justify mt-4 mb-4">{foodType.description}</li>

                                {/* Gestion des états de chargement et d'erreur pour les avantages */}
                                {isLoadingAdvantages && <p className="text-center text-slate-300 font-thin mt-4 mb-8">Chargement des avantages...</p>}
                                
                                {isErrorAdvantages && <p className="text-center text-red-400 mt-4 mb-8">Erreur avantages: {(advantagesError as Error).message}</p>}
                                
                                {advantages && advantages.length === 0 && (
                                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">Aucun avantage trouvé pour ce type de nutrition.</p>
                                )}

                                {/* Gestion des états de chargement et d'erreur pour les inconvénients */}
                                {isLoadingDisadvantages && <p className="text-center text-slate-300 font-thin mt-4 mb-8">Chargement des inconvénients...</p>}

                                {isErrorDisadvantages && <p className="text-center text-red-400 mt-4 mb-8">Erreur inconvénients: {(disadvantagesError as Error).message}</p>}

                                {disadvantages && disadvantages.length === 0 && (
                                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">Aucun inconvénient trouvé pour ce type de nutrition.</p>
                                )}

                                {/* Affichage des avantages et inconvénients */}
                                <div className="flex justify-around text-[#ca814e] text-[1.1rem] font-[800] mb-4 mt-8">
                                    <h4>Avantages</h4> 
                                    <h4>Inconvénients</h4>
                                </div>

                                <div className="flex justify-around">
                                    {advantages && advantages.length > 0 && (
                                        <ul>
                                            {advantages.map((advantage) => (
                                                <li key={advantage.label}>{advantage.label}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {disadvantages && disadvantages.length > 0 && (
                                        <ul>
                                            {disadvantages.map((disadvantage) => (
                                                <li key={disadvantage.label}>{disadvantage.label}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}