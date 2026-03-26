import useHealth from "../hooks/useHealth";

type GeneralInfoProps = {
    selectedAnimalId: number;
};

export default function GeneralInfo({ selectedAnimalId }: GeneralInfoProps) {

    const {
        data: health,
        isLoading: isLoadingHealth,
        isError: isErrorHealth,
        error: healthError
    } = useHealth(selectedAnimalId);
        
    return (
        <div>
            {selectedAnimalId === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">Veuillez sélectionner un type d'animal pour voir les recommandations de santé.</p>
            )}

            {selectedAnimalId > 0 && isLoadingHealth && <p>Chargement des recommandations de santé...</p>}
            {selectedAnimalId > 0 && isErrorHealth && (
                <p>Erreur : {(healthError as Error).message}</p>
            )}

            {selectedAnimalId > 0 && health && (
                <div className="m-4">
                    <h3 className="font-medium text-[1.1rem] text-[#b8e3c8]">Fréquence vermifuge</h3>
                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">{health.dewormingFrequency}</p>

                    <h3 className="font-medium text-[1.1rem] text-[#b8e3c8]">Fréquence visite vétérinaire</h3>
                    <p className="text-center text-slate-300 font-thin mt-4 mb-8">{health.vetCheckFrequency}</p>

                    <h3 className="font-medium text-[1.1rem] text-[#b8e3c8]">Conseils</h3>
                    <p className="text-justify text-slate-300 font-thin mt-4 mb-8 mr-4 ml-4">{health.generalAdvice}</p>
                </div>
            )}
        </div>
    )
}