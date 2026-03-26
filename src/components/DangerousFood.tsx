import useDangerousFood from "../hooks/useDangerousFood";
import dangerousFoodLogo from "../assets/dangerous_food_logo.svg";

type DangerousFoodProps = {
    selectedAnimalId: number;
};

export default function DangerousFood({ selectedAnimalId }: DangerousFoodProps) {

    const {
        data: dangerousFood,
        isLoading: isLoadingDangerousFood,
        isError: isErrorDangerousFood,
        error: dangerousFoodError,
    } = useDangerousFood(selectedAnimalId);

    return (

        <div>
            {selectedAnimalId > 0 && (
                <h4 className="mt-4 mb-8 flex items-center justify-center gap-3 text-center text-[1.3rem] font-bold text-[#ca814e]">
                    <img src={dangerousFoodLogo} alt="Icône aliments dangereux" className="h-10 w-10" />
                    Aliments dangereux
                </h4>
            )}

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
        </div>
    )
}