import useShelter from "../hooks/useShelter";

export default function ShelterCard() {
    const { 
        data: shelters,
        isLoading: isLoadingShelters,
        isError: isErrorShelters,
        error: sheltersError,
    } = useShelter();

    return (
        <div>
            {isLoadingShelters && <p className="text-center font-thin mt-4 mb-8">Chargement des refuges...</p>}

            {isErrorShelters && <p className="text-center text-red-400 mt-4 mb-8">Erreur refuges: {(sheltersError as Error).message}</p>}

            {shelters && shelters.length === 0 && (
                <p className="text-center font-thin mt-4 mb-8">Aucun refuge trouvé.</p>
            )}

            {shelters && shelters.length > 0 && (
                <ul className="flex flex-wrap justify-center items-center mx-4 my-8">
                    {shelters.map((shelter) => (
                        <li key={shelter.id} className="m-2 p-4 border rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">{shelter.name}</h3>
                            <p className="text-sm text-gray-600">{shelter.city}</p>
                            <p className="text-sm text-gray-600">{shelter.adress}</p>
                            <p className="text-sm text-gray-600">{shelter.phone}</p>
                            <a href={shelter.website} className="text-sm text-blue-500" target="_blank" rel="noopener noreferrer">{shelter.website}</a>
                            <p className="text-sm text-gray-600">{shelter.description}</p>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}