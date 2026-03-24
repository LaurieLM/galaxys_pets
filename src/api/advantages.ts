import { API_URL } from "../config";

type AdvantageResponse = {
    label: string;
}

export default async function getAdvantagesByFoodtype(foodTypeId: number): Promise<AdvantageResponse[]> {
    const res = await fetch(`${API_URL}/animals/${foodTypeId}/advantages`);
    if (!res.ok) {
        throw new Error("Failed to fetch advantages");
    }
    return res.json();
}