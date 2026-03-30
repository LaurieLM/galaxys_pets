import { API_URL } from "../config";

type DiseaseResponse = {
    name: string;
    description: string;
}

export default async function getDiseasesByAnimalId(animalId: number): Promise<DiseaseResponse[]> {
    const res = await fetch(`${API_URL}/animals/${animalId}/diseases`);
    if (!res.ok) {
        throw new Error("Failed to fetch diseases");
    }
    return res.json();
}