import { API_URL } from '../config';

type AnimalResponse = {
        id: number,
        type: string
};

export default async function getAnimals(): Promise<AnimalResponse[]> {
    const res = await fetch(`${API_URL}/animals`);
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    return res.json();
}