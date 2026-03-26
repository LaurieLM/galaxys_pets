import { useState } from "react";
import nutritionLogo from "../assets/nutrition_logo_colored.svg";
import Dropdown from "../components/Dropdown";
import FoodTypeInfo from "../components/FoodTypeInfo";
import DangerousFood from "../components/DangerousFood";

export default function Nutrition() {
    // State pour l'animal sélectionné et l'ouverture du dropdown
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);

    return (
        <section className="text-slate-300 ">
            <h2 className="mt-4 mb-8 flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#ca814e]">
                <img src={nutritionLogo} alt="Icône nutrition" className="h-12 w-12" />
                Nutrition
            </h2>

            <Dropdown selectedAnimalId={selectedAnimalId} setSelectedAnimalId={setSelectedAnimalId} />

            {selectedAnimalId === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">
                    Veuillez sélectionner un type d'animal pour voir les recommandations de nutrition.
                </p>
            )}

            {/* Affichage des types de nutrition avantages / inconvénients */}
            <FoodTypeInfo selectedAnimalId={selectedAnimalId} />

            {/* Affichage des aliments dangereux pour l'animal sélectionné */}
            <DangerousFood selectedAnimalId={selectedAnimalId} />
            
        </section>
    );
}