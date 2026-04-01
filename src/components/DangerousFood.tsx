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

        <div className="mx-4 mb-8 mt-8">

            {selectedAnimalId > 0 && isLoadingDangerousFood && <p className="mt-4 mb-8 text-center font-thin">Chargement des aliments dangereux...</p>}

            {selectedAnimalId > 0 && isErrorDangerousFood && <p className="mt-4 mb-8 text-center text-red-400">Erreur aliments dangereux: {(dangerousFoodError as Error).message}</p>}

            {selectedAnimalId > 0 && dangerousFood && dangerousFood.length === 0 && (
                <p className="mt-4 mb-8 text-center font-thin">Aucun aliment dangereux trouvé pour ce type d'animal.</p>
            )}

            {selectedAnimalId > 0 && dangerousFood && dangerousFood.length > 0 && (
                <section className="overflow-hidden rounded-2xl border border-amber-400/25 bg-slate-900/40 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                    <div className="border-b border-amber-300/15 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-rose-500/10 px-5 py-4">
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-amber-400/15 p-2">
                                <img src={dangerousFoodLogo} alt="Icône aliments dangereux" className="h-7 w-7" />
                            </div>
                            <div>
                                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-amber-200/70">Vigilance</p>
                                <h5 className="mt-1 text-[1.05rem] font-semibold text-amber-100">À éviter pour cet animal</h5>
                                <p className="mt-1 max-w-[34rem] text-sm text-slate-300/85">
                                    Certains aliments peuvent provoquer des troubles digestifs, neurologiques ou une intoxication.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-5">
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {dangerousFood.map((dangerous) => (
                                <li
                                    key={dangerous.name}
                                    className="flex min-w-0 items-center gap-3 rounded-xl border border-amber-300/15 bg-gradient-to-br from-slate-800/90 to-slate-900/90 px-4 py-3"
                                >
                                    <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-sm font-bold text-rose-300">
                                        !
                                    </span>
                                    <span className="leading-snug text-slate-100">{dangerous.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </div>
    )
}