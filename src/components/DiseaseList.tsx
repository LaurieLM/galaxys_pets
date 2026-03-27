import useDiseases from "../hooks/useDiseases";
import Filter from "./Filter";

type DiseaseProps = {
    selectedAnimalId: number;
    selectedDiseaseName: string;
    setSelectedDiseaseName: (name: string) => void;
}

export default function DiseaseList({ selectedAnimalId, selectedDiseaseName, setSelectedDiseaseName }: DiseaseProps) {
    // Recupération de toutes les maladies pour l'animal sélectionné
    const {
        data: diseases,
        isLoading,
        isError,
        error,
    } = useDiseases(selectedAnimalId);

    // Transformation de la liste de maladies en options pour le composant le filtre
    const diseaseOptions =
        diseases?.map((disease) => ({
            value: disease.name,
            label: disease.name,
        })) ?? [];

    // Récupération de l'objet maladie complet à partir de la maladie sélectionnée
    const selectedDisease = diseases?.find((d) => d.name === selectedDiseaseName);

    if (isLoading) return <p className="text-center font-thin mt-4 mb-8">Chargement des maladies...</p>;
    if (isError) return <p className="text-center text-red-400 mt-4 mb-8">Erreur maladies : {(error as Error).message}</p>;

    return (
        <div>
            <Filter
                label="Maladies"
                options={diseaseOptions}
                selectedValue={selectedDiseaseName}
                onChange={setSelectedDiseaseName}
            />

            {/* Affichage des données de la maladie si une maladie est sélectionnée */}
            {selectedDisease && (
                <div className="m-4 rounded bg-slate-800/40 p-4 text-slate-300">
                    <h4 className="mb-2 text-[1rem] font-semibold text-[#b8e3c8]">{selectedDisease.name}</h4>
                    <p className="mb-4 text-justify font-thin">{selectedDisease.description}</p>
                </div>
            )}
        </div>
    )
}