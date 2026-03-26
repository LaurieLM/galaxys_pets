import { API_URL } from "../config";

type DangerousFoodResponse = {
    name: string;
}

export default async function getDangerousFood(animalId: number): Promise<DangerousFoodResponse[]> {
    const res = await fetch(`${API_URL}/animals/${animalId}/dangerousfood`);
    if (!res.ok) {
        throw new Error("Failed to fetch dangerous food");
    }
    return res.json();
}