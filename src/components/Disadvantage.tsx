import useDisadvantages from "../hooks/useDisadvantages"

type DisadvantageProps = {
    selectedFoodTypeId: number;
};

export default function Disadvantage({ selectedFoodTypeId }: DisadvantageProps) {
    const {
        data: disadvantages,
        isLoading: isLoadingDisadvantages,
        isError: isErrorDisadvantages,
        error: disadvantagesError,
    } = useDisadvantages(selectedFoodTypeId);

    return (
        <div className="min-w-0">
            {isLoadingDisadvantages && <p className="mt-2 text-sm text-rose-100/80">Chargement des inconvénients...</p>}

            {isErrorDisadvantages && <p className="mt-2 text-sm text-rose-300">Erreur inconvénients: {(disadvantagesError as Error).message}</p>}

            {disadvantages && disadvantages.length === 0 && (
                <p className="mt-2 text-sm text-rose-100/70">Aucun inconvénient trouvé pour ce type de nutrition.</p>
            )}

            {disadvantages && disadvantages.length > 0 && (
                <ul className="space-y-2">
                    {disadvantages.map((disadvantage) => (
                        <li key={disadvantage.label} className="flex items-start gap-2 text-[0.95rem] text-slate-100">
                            <span className="mt-[0.45rem] inline-block h-[0.35rem] w-[0.35rem] rounded-full bg-rose-300 flex-shrink-0" />
                            <span className="leading-snug">{disadvantage.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}