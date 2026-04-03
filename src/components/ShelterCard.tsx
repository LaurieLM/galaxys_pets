import useShelter from "../hooks/useShelter";

type ShelterCardProps = {
    selectedCity: string;
}

export default function ShelterCard({ selectedCity }: ShelterCardProps) {
    const { 
        data: shelters,
        isLoading: isLoadingShelters,
        isError: isErrorShelters,
        error: sheltersError,
    } = useShelter();

    const normalizeCity = (value: string) =>
        value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase();

    const filteredShelters = shelters?.filter((shelter) =>
        selectedCity ? normalizeCity(shelter.city) === normalizeCity(selectedCity) : true
    );

    return (
        <div>
            {isLoadingShelters && <p className="text-center font-thin mt-4 mb-8">Chargement des refuges...</p>}

            {isErrorShelters && <p className="text-center text-red-400 mt-4 mb-8">Erreur refuges: {(sheltersError as Error).message}</p>}

            {filteredShelters && filteredShelters.length === 0 && (
                <p className="text-center font-thin mt-4 mb-8">Aucun refuge trouvé.</p>
            )}

            {filteredShelters && filteredShelters.length > 0 && (
                <ul className="flex flex-wrap justify-center items-center mx-4 my-8">
                    {filteredShelters.map((shelter) => (
                        <li key={shelter.id} className="flex flex-col items-center m-2 p-4 border rounded-lg shadow-md">
                            <h3 className="text-[1.4rem] font-semibold">{shelter.name}</h3>
                            <img src={shelter.image_url} alt={shelter.name} className="w-28 h-28 rounded" />
                            <p className="text-sm text-gray-600">{shelter.city}</p>
                            <p className="text-sm text-gray-600">{shelter.adress}</p>
                            <p className="text-sm text-gray-600">{shelter.phone}</p>
                            <a href={shelter.website} className="text-sm text-blue-500" target="_blank" rel="noopener noreferrer">{shelter.website}</a>
                            <p className="text-sm text-gray-600 text-justify">{shelter.description}</p>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}