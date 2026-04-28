import { API_URL } from "../config";

type ShelterResponse = {
    id: number;
    name: string;
    city: string;
    address?: string | null;
    phone?: string | null;
    website?: string | null;
    description?: string | null;
    image_url: string,
    animal_types: string[];
};

export default async function getShelters(): Promise<ShelterResponse[]> {
    const res = await fetch(`${API_URL}/shelters`);
    if (!res.ok) {
        throw new Error("Failed to fetch shelters");
    }
    return res.json();
}