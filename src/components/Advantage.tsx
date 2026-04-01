import useAdvantages from "../hooks/useAdvantages";

type AdvantageProps = {
    selectedFoodTypeId: number;
};

export default function Advantage({ selectedFoodTypeId }: AdvantageProps) {

    const {
        data: advantages,
        isLoading: isLoadingAdvantages,
        isError: isErrorAdvantages,
        error: advantagesError,
    } = useAdvantages(selectedFoodTypeId);

    return (
        <div className="min-w-0">
            {isLoadingAdvantages && <p className="mt-2 text-sm text-emerald-100/80">Chargement des avantages...</p>}
                                
            {isErrorAdvantages && <p className="mt-2 text-sm text-rose-300">Erreur avantages: {(advantagesError as Error).message}</p>}
                                
            {advantages && advantages.length === 0 && (
                <p className="mt-2 text-sm text-emerald-100/70">Aucun avantage trouvé pour ce type de nutrition.</p>
            )}

            {advantages && advantages.length > 0 && (
                <ul className="space-y-2">
                    {advantages.map((advantage) => (
                        <li key={advantage.label} className="flex items-start gap-2 text-[0.95rem] text-slate-100">
                            <span className="mt-[0.45rem] inline-block h-[0.35rem] w-[0.35rem] rounded-full bg-emerald-300 flex-shrink-0" />
                            <span className="leading-snug">{advantage.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}