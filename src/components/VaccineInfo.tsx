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
                <h3 className="m-4 mt-8 flex items-center justify-center gap-3 text-center font-black text-[1.3rem] text-[#b8e3c8]">
                    <img src={vaccineLogo} alt="Icône vaccin" className="h-12 w-12" />
                    Vaccins recommandés
                </h3>
            )}

            {selectedAnimalId > 0 && vaccines && vaccines.length > 0 && (
                <div className="mx-4 mb-4 rounded-2xl border border-emerald-300/15 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-slate-900/0 px-5 py-4">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/70">Prévention</p>
                    <p className="mt-1 text-sm text-slate-300/85">Protéger l'animal grâce à un calendrier vaccinal adapté.</p>
                </div>
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
                        
                        <li key={vaccine.name} className="rounded-2xl border border-emerald-400/25 bg-slate-900/40 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                            <div>
                                <h3 className="inline-block rounded-[0.9rem] bg-[#3a8d592e] px-4 py-1 text-center text-[1.1rem] font-[800] text-[#b8e3c8]">{vaccine.name}</h3>

                                <h4 className="mt-4 text-[1rem] font-[300] text-[#b8e3c8]">Description</h4>
                                <p className="mt-4 text-justify font-thin text-slate-300">{vaccine.description}</p>

                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    <article className="rounded-2xl border border-emerald-300/15 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-4">
                                        <h4 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/70">Première dose</h4>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-100">{vaccine.firstDose}</p>
                                    </article>

                                    <article className="rounded-2xl border border-emerald-300/15 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-4">
                                        <h4 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/70">Rappels</h4>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-100">{vaccine.reminders}</p>
                                    </article>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}