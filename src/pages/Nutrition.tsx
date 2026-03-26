import Dropdown from "../components/Dropdown";
import { useState } from "react";
import advantagesLogo from "../assets/advantages_logo_green.svg";
import disadvantagesLogo from "../assets/disadvantages_logo_red.svg";
import nutritionLogo from "../assets/nutrition_logo_colored.svg";
import dangerousFoodLogo from "../assets/dangerous_food_logo.svg";
import useAdvantages from "../hooks/useAdvantages";
import useDisadvantages from "../hooks/useDisadvantages";
import useDangerousFood from "../hooks/useDangerousFood";
import FoodTypeInfo from "../components/FoodTypeInfo";

export default function Nutrition() {
    // State pour l'animal sélectionné et l'ouverture du dropdown
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);

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

    const {
        data: dangerousFood,
        isLoading: isLoadingDangerousFood,
        isError: isErrorDangerousFood,
        error: dangerousFoodError,
    } = useDangerousFood(selectedAnimalId);

    return (
        <section className="text-slate-300 ">
            <h2 className="mt-4 mb-8 flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#ca814e]">
                <img src={nutritionLogo} alt="Icône nutrition" className="h-12 w-12" />
                Nutrition
            </h2>

            <Dropdown selectedAnimalId={selectedAnimalId} setSelectedAnimalId={setSelectedAnimalId} />

            {/* Affichage des recommandations de nutrition pour l'animal sélectionné */}
            {selectedAnimalId === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">
                    Veuillez sélectionner un type d'animal pour voir les recommandations de nutrition.
                </p>
            )}

            {/* Affichage des types de nutrition */}
            <FoodTypeInfo selectedAnimalId={selectedAnimalId} />

                                {/* Gestion des états de chargement et d'erreur pour les avantages */}
                                {isLoadingAdvantages && <p className="text-center text-slate-300 font-thin mt-4 mb-8">Chargement des avantages...</p>}
                                
                                {isErrorAdvantages && <p className="text-center text-red-400 mt-4 mb-8">Erreur avantages: {(advantagesError as Error).message}</p>}
                                
                                {advantages && advantages.length === 0 && (
                                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">Aucun avantage trouvé pour ce type de nutrition.</p>
                                )}

                                {/* Gestion des états de chargement et d'erreur pour les inconvénients */}
                                {isLoadingDisadvantages && <p className="text-center font-thin mt-4 mb-8">Chargement des inconvénients...</p>}

                                {isErrorDisadvantages && <p className="text-center text-red-400 mt-4 mb-8">Erreur inconvénients: {(disadvantagesError as Error).message}</p>}

                                {disadvantages && disadvantages.length === 0 && (
                                    <p className="text-center font-thin mt-4 mb-8">Aucun inconvénient trouvé pour ce type de nutrition.</p>
                                )}

                                {/* Affichage des logos avantages et inconvénients */}
                                <div className="flex justify-around text-[#ca814e] text-[1.1rem] font-[800] mb-4 mt-8">
                                    <h4 aria-label="Avantages" className="flex items-center text-emerald-400">
                                        <img src={advantagesLogo} alt="Avantages" className="h-9 w-[18px]" />
                                    </h4>
                                    <h4 aria-label="Inconvénients" className="flex items-center text-red-400">
                                        <img src={disadvantagesLogo} alt="Inconvénients" className="h-9 w-[18px]" />
                                    </h4>
                                </div>

                                {/* Avantages */}
                                <div className="flex justify-around">
                                    {advantages && advantages.length > 0 && (
                                        <ul className="pr-4">
                                            {advantages.map((advantage) => (
                                                <li key={advantage.label} className="mb-2 flex items-center gap-2">
                                                    <span className="inline-block h-[0.3rem] w-[0.3rem] rounded-full bg-gray-400 flex-shrink-0" />
                                                    {advantage.label}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Inconvénients */}
                                    {disadvantages && disadvantages.length > 0 && (
                                        <ul>
                                            {disadvantages.map((disadvantage) => (
                                                <li key={disadvantage.label} className="mb-2 flex items-center gap-2">
                                                    <span className="inline-block h-[0.3rem] w-[0.3rem] rounded-full bg-gray-400 flex-shrink-0" />
                                                    {disadvantage.label}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            
            {/* Affichage des aliments dangereux pour l'animal sélectionné */}
            {selectedAnimalId > 0 && (
                <h4 className="mt-4 mb-8 flex items-center justify-center gap-3 text-center text-[1.3rem] font-bold text-[#ca814e]">
                    <img src={dangerousFoodLogo} alt="Icône aliments dangereux" className="h-10 w-10" />
                    Aliments dangereux
                </h4>
            )}

            {/* Gestion des états de chargement et d'erreur pour les aliments dangereux */}
            {selectedAnimalId > 0 && isLoadingDangerousFood && <p className="text-center font-thin mt-4 mb-8">Chargement des aliments dangereux...</p>}

            {selectedAnimalId > 0 && isErrorDangerousFood && <p className="text-center text-red-400 mt-4 mb-8">Erreur aliments dangereux: {(dangerousFoodError as Error).message}</p>}

            {selectedAnimalId > 0 && dangerousFood && dangerousFood.length === 0 && (
                <p className="text-center font-thin mt-4 mb-8">Aucun aliment dangereux trouvé pour ce type d'animal.</p>
            )}
            
            <div className="mx-4 mb-8">
                {selectedAnimalId > 0 && dangerousFood && dangerousFood.length > 0 && (
                    <ul className="grid grid-cols-2 gap-y-1">
                        {dangerousFood.map((dangerous) => (
                            <li key={dangerous.name} className="mb-2 flex items-center gap-2">
                                <span className="inline-block h-[0.3rem] w-[0.3rem] rounded-full bg-gray-400 flex-shrink-0" />
                                {dangerous.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}