import useVaccines from "../hooks/useVaccines";
import Filter from "./Filter";


type VaccinesProps = {
    selectedAnimalId: number;
    selectedVaccineName: string;
    setSelectedVaccineName: (name: string) => void;
};

export default function VaccineList({ selectedAnimalId, selectedVaccineName, setSelectedVaccineName }: VaccinesProps) {
    // Récupération de tous les vaccins pour l'animal sélectionné
    const {
        data: vaccines,
        isLoading,
        isError,
        error,
    } = useVaccines(selectedAnimalId);

    // Transformation de la liste de vaccins en options pour le composant le filtre
    const vaccineOptions =
        vaccines?.map((vaccine) => ({
            value: vaccine.name,
            label: vaccine.name,
        })) ?? [];

    // Récupération de l'objet vaccin complet à partir du vaccin sélectionné
    // .find() parcourt le tableau et retourne le premier élément qui correspond
    const selectedVaccine = vaccines?.find((v) => v.name === selectedVaccineName);

    if (isLoading) return <p className="text-center font-thin mt-4 mb-8">Chargement des vaccins...</p>;
    if (isError) return <p className="text-center text-red-400 mt-4 mb-8">Erreur vaccins : {(error as Error).message}</p>;

    return (
        <div>
            <Filter
                label="Vaccins"
                options={vaccineOptions}
                selectedValue={selectedVaccineName}
                onChange={setSelectedVaccineName}
            />

            {/* Affichage des données du vaccin si un vaccin est sélectionné */}
            {selectedVaccine && (
                <div className="m-4 rounded bg-slate-800/40 p-4 text-slate-300">
                    <h4 className="mb-2 text-[1rem] font-semibold text-[#b8e3c8]">{selectedVaccine.name}</h4>
                    <p className="mb-4 text-justify font-thin">{selectedVaccine.description}</p>

                    <h4 className="text-[0.9rem] font-medium text-[#b8e3c8]">Première dose</h4>
                    <p className="mb-4 font-thin">{selectedVaccine.firstDose}</p>

                    <h4 className="text-[0.9rem] font-medium text-[#b8e3c8]">Rappels</h4>
                    <p className="font-thin">{selectedVaccine.reminders}</p>
                </div>
            )}

        </div>
    );
}
