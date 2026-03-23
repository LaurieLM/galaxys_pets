import useHealth from "../hooks/useHealth";

export default function Health() {
    const animalId = 1;
    const { data, isLoading, isError, error } = useHealth(animalId);

    if (isLoading) return <p>Chargement...</p>;
    if (isError) return <p>Erreur : {(error as Error).message}</p>;
    if (!data) return <p>Aucune information sur la santé disponible.</p>;
    return (
        <section>
                <h2 className="text-center text-[#8fd3a9] font-bold text-3xl mt-4 mb-8">Santé</h2>
                <div className="m-4">
                    <h3 className="font-medium text-[1.1rem] text-[#b8e3c8]">Fréquence vermifuge</h3>
                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">{data.dewormingFrequency}</p>

                    <h3 className="font-medium text-[1.1rem] text-[#b8e3c8]">Fréquence visite vétérinaire</h3>
                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">{data.vetCheckFrequency}</p>

                    <h3 className="font-medium text-[1.1rem] text-[#b8e3c8]">Conseils</h3>
                    <p className="text-justify text-slate-300 font-thin mt-4 mb-8 mr-4 ml-4">{data.generalAdvice}</p>
                </div>
            </section>
    )
}