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
        <div>
            {isLoadingDisadvantages && <p className="text-center font-thin mt-4 mb-8">Chargement des inconvénients...</p>}

            {isErrorDisadvantages && <p className="text-center text-red-400 mt-4 mb-8">Erreur inconvénients: {(disadvantagesError as Error).message}</p>}

            {disadvantages && disadvantages.length === 0 && (
                <p className="text-center font-thin mt-4 mb-8">Aucun inconvénient trouvé pour ce type de nutrition.</p>
            )}

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
    )
}