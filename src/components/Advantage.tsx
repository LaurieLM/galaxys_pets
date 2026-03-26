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
        <div>
            {isLoadingAdvantages && <p className="text-center text-slate-300 font-thin mt-4 mb-8">Chargement des avantages...</p>}
                                
            {isErrorAdvantages && <p className="text-center text-red-400 mt-4 mb-8">Erreur avantages: {(advantagesError as Error).message}</p>}
                                
            {advantages && advantages.length === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">Aucun avantage trouvé pour ce type de nutrition.</p>
            )}

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
        </div>
    )
}