import { API_URL } from "../config";

type VaccineResponse = {
    name: string;
    description: string;
    firstDose: string;
    reminders: string;
}

export default async function getVaccinesByAnimalId(animalId: number): Promise<VaccineResponse[]> {
    const res = await fetch(`${API_URL}/animals/${animalId}/vaccines`);
    if (!res.ok) {
        throw new Error("Failed to fetch vaccines");
    }
    return res.json();
}