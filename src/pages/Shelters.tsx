import { useState } from "react";
import CityFilter from "../components/CityFilter";
import ShelterCard from "../components/ShelterCard";
import Tab from "../components/Tab";

export default function Shelters() {
    const [selectedCity, setSelectedCity] = useState<string>('');

    return (
        <section>
            <CityFilter onChange={setSelectedCity} />
            <ShelterCard selectedCity={selectedCity} />
            <Tab/>
        </section>
    )
}