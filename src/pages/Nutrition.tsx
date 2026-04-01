import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import nutritionLogo from "../assets/nutrition_logo_colored.svg";
import FoodTypeInfo from "../components/FoodTypeInfo";
import DangerousFood from "../components/DangerousFood";
import Tab from "../components/Tab";

export default function Nutrition() {
    const [searchParams] = useSearchParams();

    // State pour l'animal sélectionné et l'ouverture du dropdown
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);

    // Récupération de l'animal sélectionné
    useEffect(() => {
        const parsedAnimalId = Number(searchParams.get("animalId"));
        if (parsedAnimalId > 0) {
            setSelectedAnimalId(parsedAnimalId);
        }
    }, [searchParams]);

    return (
        <section className="text-slate-300 ">
            <h2 className="mt-4 mb-8 flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#ca814e]">
                <img src={nutritionLogo} alt="Icône nutrition" className="h-12 w-12" />
                Nutrition
            </h2>

            {selectedAnimalId === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">
                    Veuillez sélectionner un type d'animal pour voir les recommandations de nutrition.
                </p>
            )}

            {/* Affichage des types de nutrition avantages / inconvénients */}
            <FoodTypeInfo selectedAnimalId={selectedAnimalId} />

            {/* Affichage des aliments dangereux pour l'animal sélectionné */}
            <DangerousFood selectedAnimalId={selectedAnimalId} />

            {/* Affichage de la barre de navigation en bas de l'écran */}
            <Tab/>
        </section>
    );
}