import { API_URL } from "../config";

type ShelterResponse = {
    id: number,
    name: string,
    city: string,
    address: string,
    phone: string,
    website: string,
    description: string,
    image_url: string;
}

export default async function getShelters(): Promise<ShelterResponse[]> {
    const res = await fetch(`${API_URL}/shelters`);
    if (!res.ok) {
        throw new Error("Failed to fetch shelters");
    }
    return res.json();
}