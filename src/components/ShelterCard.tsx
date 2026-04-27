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
                        <li key={shelter.id} className="flex flex-col items-center m-4 p-4 bg-slate-700 border rounded-lg shadow-md">
                            <h3 className="mb-4 text-[1.4rem] font-semibold">{shelter.name}</h3>
                            <img src={shelter.image_url} alt={shelter.name} className="w-60 h-36 rounded" />
                            <p className="m-4 text-[0.9rem]  text-slate-200 text-justify">{shelter.description}</p>
                            <div className="w-[100%] p-4 flex flex-col items-center border bg-slate-800 rounded-lg">
                                {shelter.adress && <p className="mt-4 text-sm text-slate-200">{shelter.adress}</p>}
                                <p className="text-sm text-slate-200">{shelter.city}</p>
                                {shelter.phone && <p className="mt-4 text-sm text-slate-200">{shelter.phone}</p>}
                                {shelter.website && <a href={shelter.website} className="mt-4 text-sm text-blue-500" target="_blank" rel="noopener noreferrer">Voir le site</a>}
                            </div>
                        </li>
                            
                            
                    ))}
                </ul>
            )}

        </div>
    )
}