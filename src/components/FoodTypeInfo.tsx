import useFoodTypes from "../hooks/useFoodTypes";
import advantagesLogo from "../assets/advantages_logo_green.svg";
import Advantage from "./Advantage";
import disadvantagesLogo from "../assets/disadvantages_logo_red.svg";
import Disadvantage from "./Disadvantage";

type FoodTypeInfoProps = {
    selectedAnimalId: number;
};

export default function FoodTypeInfo({ selectedAnimalId }: FoodTypeInfoProps) {
    const {
        data: foodTypes,
        isLoading: isLoadingFoodTypes,
        isError: isErrorFoodTypes,
        error: foodTypesError,
    } = useFoodTypes(selectedAnimalId);

    return (
        <div>
            {/* Affichage des types de nutrition pour l'animal sélectionné */}
            {selectedAnimalId > 0 && (
                <h3 className="m-4 flex items-center justify-center gap-3 text-center font-black text-[1.3rem] text-[#ca814e]">Types de nutrition</h3>
            )}

            {selectedAnimalId > 0 && isLoadingFoodTypes && <p className="text-center font-thin mt-4 mb-8">Chargement des types de nutrition...</p>}
            
            {selectedAnimalId > 0 && isErrorFoodTypes && <p className="text-center text-red-400 mt-4 mb-8">Erreur types de nutrition: {(foodTypesError as Error).message}</p>}
            
            {selectedAnimalId > 0 && foodTypes && foodTypes.length === 0 && (
                <p className="text-center  font-thin mt-4 mb-8">Aucun type de nutrition trouvé pour cet animal.</p>
            )}

            {selectedAnimalId > 0 && foodTypes && foodTypes.length > 0 && (
                <ul className="ml-4 mr-4 space-y-4">
                    {foodTypes.map((foodType) => (
                        <li key={foodType.id} className="rounded bg-slate-800/40 p-4">
                            <div>
                                <h3 className="inline-block rounded-[0.9rem] bg-[#87462938] px-4 py-1 text-center text-[1.1rem] font-[800] text-[#ca814e]">{foodType.name}</h3>

                                <h4 className="mt-4 text-[1rem] font-[300] text-[#d4a07d]">Description</h4>
                                <p className="mt-4 mb-4 text-justify font-thin">{foodType.description}</p>

                                
                                    <div className="flex justify-around mb-4 mt-8">
                                        <h4 aria-label="Avantages" className="mb-4 flex items-center text-emerald-400">
                                            <img src={advantagesLogo} alt="Avantages" className="h-9 w-[18px]" />
                                        </h4>
                                        
                                        <h4 aria-label="Inconvénients" className="mb-4 flex items-center text-red-400">
                                            <img src={disadvantagesLogo} alt="Inconvénients" className="h-9 w-[18px]" />
                                        </h4>
                                    </div>

                                    <div className="flex justify-around ">
                                        <Advantage selectedFoodTypeId={foodType.id} />
                                        <Disadvantage selectedFoodTypeId={foodType.id} />
                                    </div>
                                
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}