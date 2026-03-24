import { API_URL } from "../config";

type FoodTypeResponse = {
    name: string;
    description: string;
}

export default async function getFoodTypesByAnimalId(animalId: number): Promise<FoodTypeResponse[]> {
    const res = await fetch(`${API_URL}/animals/${animalId}/foodtypes`);
    if (!res.ok) {
        throw new Error("Failed to fetch food types");
    }
    return res.json();
}