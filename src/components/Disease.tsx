import useDiseases from "../hooks/useDiseases";
import diseaseLogo from "../assets/disease_logo.svg";

type DiseaseProps = {
    selectedAnimalId: number;
};

export default function Disease({ selectedAnimalId }: DiseaseProps) {
    const {
        data: diseases,
        isLoading: isLoadingDiseases,
        isError: isErrorDiseases,
        error: diseasesError
    } = useDiseases(selectedAnimalId);

    return (
        <div>
            {selectedAnimalId > 0 && (
                <h3 className="m-4 mt-8 flex items-center justify-center gap-3 text-center font-black text-[1.3rem] text-[#b8e3c8]">
                    <img src={diseaseLogo} alt="Icône maladies" className="h-12 w-12" />
                    Maladies courantes
                </h3>
            )}

            {selectedAnimalId > 0 && diseases && diseases.length > 0 && (
                <div className="mx-4 mb-4 rounded-2xl border border-rose-300/15 bg-gradient-to-r from-rose-500/15 via-red-500/10 to-slate-900/0 px-5 py-4">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-rose-200/70">Vigilance</p>
                    <p className="mt-1 text-sm text-slate-300/85">Identifier rapidement les signaux à surveiller et consulter au bon moment.</p>
                </div>
            )}

            {selectedAnimalId > 0 && isLoadingDiseases && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">Chargement des maladies...</p>
            )}

            {selectedAnimalId > 0 && isErrorDiseases && (
                <p className="text-center text-red-400 mt-4 mb-8">Erreur maladies : {(diseasesError as Error).message}</p>
            )}

            {selectedAnimalId > 0 && diseases && diseases.length === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">Aucune maladie trouvée pour cet animal.</p>
            )}

            {selectedAnimalId > 0 && diseases && diseases.length > 0 && (
                <ul className="ml-4 mr-4 space-y-4">
                    {diseases.map((disease) => (
                        <li key={disease.name} className="rounded-2xl border border-rose-400/25 bg-slate-900/40 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                            <div>
                                <h3 className="inline-block rounded-[0.9rem] bg-[#f5787838] px-4 py-1 text-center text-[1.1rem] font-[800] text-[#ffd4d4]">{disease.name}</h3>

                                <div className="mt-5 rounded-2xl border border-rose-300/15 bg-gradient-to-br from-rose-500/10 to-red-500/5 p-4">
                                    <h4 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-rose-200/70">Description</h4>
                                    <p className="mt-3 text-justify text-sm leading-relaxed text-slate-100">{disease.description}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}