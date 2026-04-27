import useShelter from "../hooks/useShelter";
import cityLogo from "../assets/city_logo.svg";
import phoneLogo from "../assets/phone_logo.svg";

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
                <ul className="mx-4 my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredShelters.map((shelter) => (
                        <li
                            key={shelter.id}
                            className="group mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-600/60 bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg shadow-slate-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/50"
                        >
                            <img
                                src={shelter.image_url}
                                alt={shelter.name}
                                className="h-48 w-full bg-slate-900 transition-transform duration-500 group-hover:scale-[1.02]"
                            />

                            <div className="flex flex-1 flex-col gap-4 p-5">
                                <h3 className="text-2xl font-semibold leading-tight text-slate-50">{shelter.name}</h3>

                                <p className="text-sm leading-relaxed text-slate-200">{shelter.description}</p>

                                <div className="mt-auto rounded-xl border border-slate-600/70 bg-slate-900/45 p-4">
                                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Informations</p>
                                    <div className="mt-3 space-y-2">
                                        <p className="inline-flex items-start gap-2 text-sm text-slate-100">
                                            <img src={cityLogo} alt="Icône adresse" className="mt-0.5 h-4 w-4 shrink-0" />
                                            <span>{shelter.city}</span>
                                        </p>
                                        {shelter.adress && (
                                            <p className="text-sm text-slate-200 pl-6">{shelter.adress}</p>
                                        )}
                                        {shelter.phone && (
                                            <p className="inline-flex items-start gap-2 text-sm text-slate-200">
                                                <img src={phoneLogo} alt="Icône téléphone" className="mt-0.5 h-4 w-4 shrink-0" />
                                                <span>{shelter.phone}</span>
                                            </p>
                                        )}
                                        {shelter.website && (
                                            <div className="mt-4">
                                                <a
                                                    href={shelter.website}
                                                    className="inline-flex w-fit items-center rounded-full border border-sky-400/50 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-300 transition-colors duration-200 hover:bg-sky-400/20"
                                                    // Ouvre dans un nouvel onglet pour éviter de perdre la page actuelle
                                                    target="_blank"
                                                    // Sécurité : empêche la nouvelle page d'accéder à la page actuelle via window.opener
                                                    rel="noopener noreferrer"
                                                >
                                                    Voir le site
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                            
                            
                    ))}
                </ul>
            )}

        </div>
    )
}