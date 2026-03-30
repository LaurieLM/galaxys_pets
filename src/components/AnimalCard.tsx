import useAnimals from "../hooks/useAnimals"


export default function AnimalCard() {
    const {
        data: animals,
        isLoading: isLoadingAnimals,
        isError: isErrorAnimals,
        error: animalsError,
    } = useAnimals();

    return (
        <div>
            
            {isLoadingAnimals && <p className="text-center font-thin mt-4 mb-8">Chargement des animaux...</p>}

            {isErrorAnimals && <p className="text-center text-red-400 mt-4 mb-8">Erreur animaux: {(animalsError as Error).message}</p>}

            {animals && animals.length === 0 && (
                <p className="text-center font-thin mt-4 mb-8">Aucun animal trouvé.</p>
            )}

            {animals && animals.length > 0 && (
                <ul className="flex flex-wrap justify-center items-center mx-4 my-8">
                    {animals.map((animal) => (
                        <li key={animal.id} className="flex flex-col items-center flex-2 rounded bg-slate-800/40 p-4">
                            <img src={animal.image_url} alt={animal.type} className="w-28 h-28 rounded"/>
                            <h3 className="inline-block rounded-[0.9rem] px-4 py-1 text-center text-[1.1rem] font-[800]">{animal.type}</h3>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}