import useHealth from "../hooks/useHealth";

export default function Health() {
    const animalId = 3;
    const { data, isLoading, isError, error } = useHealth(animalId);

    if (isLoading) return <p>Chargement...</p>;
    if (isError) return <p>Erreur : {(error as Error).message}</p>;
    if (!data) return <p>Aucune information sur la santé disponible.</p>;
    return (
        <section>
            <h2>Santé</h2>
            <p>Type : {data.animalType}</p>
            <p>Vermifuge : {data.dewormingFrequency}</p>
            <p>Visite vétérinaire : {data.vetCheckFrequency}</p>
            <p>Conseils : {data.generalAdvice}</p>
        </section>
    )
}