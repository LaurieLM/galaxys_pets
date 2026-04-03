import { API_GEO_URL } from "../config";

type CityOptionResponse = {
    value: string;
    label: string;
}

type CityApiResult = {
    nom: string;
    code: string;
    departement?: { code: string; nom: string };
}

export default async function getCityOptions(cityName: string): Promise<CityOptionResponse[]> {
    const res = await fetch(`${API_GEO_URL}${cityName}&boost=population&limit=5`);
    if (!res.ok) {
        throw new Error("Failed to fetch advantages");
    }
    const data: CityApiResult[] = await res.json();

    return data.map((city) => ({
        value: city.nom,
        label: city.departement ? `${city.nom} (${city.departement.nom})` : city.nom,
    }));
}