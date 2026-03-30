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
                <h3 className="m-4 flex items-center justify-center gap-3 text-center font-black text-[1.3rem] text-[#b8e3c8]">
                    <img src={diseaseLogo} alt="Icône maladies" className="h-12 w-12" />
                    Maladies courantes
                </h3>
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
                        <li key={disease.name} className="bg-slate-800/40 rounded p-4">
                            <ul>
                                <h3 className="inline-block py-1 px-4 text-[#b8e3c8] text-[1.1rem] font-[800] bg-[#f5787838] text-center rounded-[0.9rem]">{disease.name}</h3>

                                <h4 className="font-[300] text-[1rem] text-[#b8e3c8] mt-4">Description</h4>
                                <li className="text-slate-300 font-thin text-justify mt-4 mb-4">{disease.description}</li> 
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}