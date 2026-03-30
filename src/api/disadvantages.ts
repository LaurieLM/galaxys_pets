import { API_URL } from "../config";

type DisadvantageResponse = {
    label: string;
}

export default async function getDisadvantagesByFoodtype(foodTypeId: number): Promise<DisadvantageResponse[]> {
    const res = await fetch(`${API_URL}/animals/${foodTypeId}/disadvantages`);
    if (!res.ok) {
        throw new Error("Failed to fetch disadvantages");
    }
    return res.json();
}