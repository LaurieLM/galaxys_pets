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
            {selectedAnimalId > 0 && isLoadingFoodTypes && <p className="text-center font-thin mt-4 mb-8">Chargement des types de nutrition...</p>}
            
            {selectedAnimalId > 0 && isErrorFoodTypes && <p className="text-center text-red-400 mt-4 mb-8">Erreur types de nutrition: {(foodTypesError as Error).message}</p>}
            
            {selectedAnimalId > 0 && foodTypes && foodTypes.length === 0 && (
                <p className="text-center  font-thin mt-4 mb-8">Aucun type de nutrition trouvé pour cet animal.</p>
            )}

            {selectedAnimalId > 0 && foodTypes && foodTypes.length > 0 && (
                <ul className="ml-4 mr-4 space-y-4">
                    {foodTypes.map((foodType) => (
                        <li key={foodType.id} className="rounded-2xl border border-slate-600/30 bg-slate-900/40 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                            <div>
                                <h3 className="inline-block rounded-[0.9rem] bg-[#87462938] px-4 py-1 text-center text-[1.1rem] font-[800] text-[#ca814e]">{foodType.name}</h3>

                                <h4 className="mt-4 text-[1rem] font-[300] text-[#d4a07d]">Description</h4>
                                <p className="mt-4 mb-4 text-justify font-thin">{foodType.description}</p>

                                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <section className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 to-teal-500/5 p-4 backdrop-blur-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="rounded-xl bg-emerald-500/15 p-2">
                                                <img src={advantagesLogo} alt="Avantages" className="h-6 w-[14px]" />
                                            </div>
                                            <div>
                                                <h4 aria-label="Avantages" className="text-[1rem] font-semibold text-emerald-300">Avantages</h4>
                                                <p className="text-[0.8rem] text-emerald-100/70">Points forts de cette option</p>
                                            </div>
                                        </div>
                                        <Advantage selectedFoodTypeId={foodType.id} />
                                    </section>

                                    <section className="rounded-2xl border border-rose-400/30 bg-gradient-to-br from-rose-500/15 to-red-500/5 p-4 backdrop-blur-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="rounded-xl bg-rose-500/15 p-2">
                                                <img src={disadvantagesLogo} alt="Inconvénients" className="h-6 w-[14px]" />
                                            </div>
                                            <div>
                                                <h4 aria-label="Inconvénients" className="text-[1rem] font-semibold text-rose-300">Inconvénients</h4>
                                                <p className="text-[0.8rem] text-rose-100/70">Points de vigilance</p>
                                            </div>
                                        </div>
                                        <Disadvantage selectedFoodTypeId={foodType.id} />
                                    </section>
                                </div>
                                
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}