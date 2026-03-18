import { API_URL } from '../config';

type HealthResponse = {
        animalType: string,
        dewormingFrequency: string,
        vetCheckFrequency: string,
        generalAdvice: string
};

export default async function getHealth(animalId: number): Promise<HealthResponse> {
    const res = await fetch(`${API_URL}/health/${animalId}`);
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    return res.json();
}


