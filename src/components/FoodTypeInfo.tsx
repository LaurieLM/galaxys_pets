import useFoodTypes from "../hooks/useFoodTypes";

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
            
            {selectedAnimalId > 0 &&foodTypes && foodTypes.length === 0 && (
                <p className="text-center  font-thin mt-4 mb-8">Aucun type de nutrition trouvé pour cet animal.</p>
            )}

            {selectedAnimalId > 0 && foodTypes && foodTypes.length > 0 && (
                <ul className="ml-4 mr-4 space-y-4">
                    {foodTypes.map((foodType) => (
                        <li key={foodType.name} className="bg-slate-800/40 rounded p-4">
                            <ul>
                                <h3 className="inline-block py-1 px-4 bg-[#87462938] text-center rounded-[0.9rem] text-[#ca814e] text-[1.1rem] font-[800] ">{foodType.name}</h3>

                                <h4 className="text-[#d4a07d] font-[300] text-[1rem] mt-4">Description</h4>
                                <li className="font-thin text-justify mt-4 mb-4">{foodType.description}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}