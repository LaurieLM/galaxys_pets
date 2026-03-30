import useVaccines from "../hooks/useVaccines";
import vaccineLogo from "../assets/vaccine_logo.svg";

type VaccineInfoProps = {
    selectedAnimalId: number;
};

export default function VaccineInfo({ selectedAnimalId }: VaccineInfoProps) {

    const { 
        data: vaccines, 
        isLoading: isLoadingVaccines, 
        isError: isErrorVaccines, 
        error: vaccinesError
    } = useVaccines(selectedAnimalId);

    return (
        <div>
            {selectedAnimalId > 0 && (
                <h3 className="m-4 flex items-center justify-center gap-3 text-center font-black text-[1.3rem] text-[#b8e3c8]">
                    <img src={vaccineLogo} alt="Icône vaccin" className="h-12 w-12" />
                    Vaccins recommandés
                </h3>
            )}

            {selectedAnimalId > 0 && isLoadingVaccines && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">Chargement des vaccins...</p>
            )}

            {selectedAnimalId > 0 && isErrorVaccines && (
                <p className="text-center text-red-400 mt-4 mb-8">Erreur vaccins : {(vaccinesError as Error).message}</p>
            )}

            {selectedAnimalId > 0 && vaccines && vaccines.length === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">Aucun vaccin trouvé pour cet animal.</p>
            )}

            {selectedAnimalId > 0 && vaccines && vaccines.length > 0 && (
                <ul className="ml-4 mr-4 space-y-4">
                    {vaccines.map((vaccine) => (
                        <li key={vaccine.name} className="bg-slate-800/40 rounded p-4">
                            <ul>
                                <h3 className="inline-block py-1 px-4 text-[#b8e3c8] text-[1.1rem] font-[800] bg-[#3a8d592e] text-center rounded-[0.9rem]">{vaccine.name}</h3>

                                <h4 className="font-[300] text-[1rem] text-[#b8e3c8] mt-4">Description</h4>
                                <li className="text-slate-300 font-thin text-justify mt-4 mb-4">{vaccine.description}</li> 

                                <h4 className="font-[300] text-[1rem] text-[#b8e3c8]">Première dose</h4>
                                <li className="text-slate-300 font-thin text-center mt-4 mb-4">{vaccine.firstDose}</li>

                                <h4 className="font-[300] text-[1rem] text-[#b8e3c8]">Rappels</h4>
                                <li className="text-slate-300 font-thin text-center mt-4">{vaccine.reminders}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}