import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getAnimals from "../api/animals";

export default function Nutrition() {
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const {
        data: animals,
        isLoading: isLoadingAnimals,
        isError: isErrorAnimals,
        error: animalsError,
    } = useQuery({
        queryKey: ["animals"],
        queryFn: getAnimals,
    });

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedAnimal = animals?.find((animal) => animal.id === selectedAnimalId);

    if (isLoadingAnimals) return <p>Chargement des types d'animaux...</p>;
    if (isErrorAnimals) return <p>Erreur types d'animaux: {(animalsError as Error).message}</p>;

    return (
        <section>
            <h2 className="mt-4 mb-8 flex items-center justify-center gap-3 text-center text-3xl font-bold text-[#d89262]">
                Nutrition
            </h2>

            <div className="m-4 flex justify-center">
                <div className="relative max-w-xs mb-[1.5rem]" ref={dropdownRef}>
                    <button
                        type="button"
                        className="w-[16rem] h-[2.5rem] pl-8 pr-4 text-center flex items-center justify-between rounded-lg border border-slate-500 bg-[#4b5565] text-white shadow-sm"
                        onClick={() => setIsDropdownOpen((current) => !current)}
                    >
                        <span className="truncate">
                            {selectedAnimal ? selectedAnimal.type : "Type d'animal"}
                        </span>
                        <span className={`text-sm transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>
                            v
                        </span>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-slate-500 bg-[#353c48] shadow-lg">
                            <button
                                type="button"
                                className="block w-full px-4 py-3 text-left text-white transition-colors hover:bg-slate-600"
                                onClick={() => {
                                    setSelectedAnimalId(0);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                Sélectionnez un type d'animal
                            </button>

                            {animals?.map((animal) => (
                                <button
                                    key={animal.id}
                                    type="button"
                                    className="block w-full px-4 py-3 text-left text-white transition-colors hover:bg-slate-600"
                                    onClick={() => {
                                        setSelectedAnimalId(animal.id);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {animal.type}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedAnimalId === 0 && (
                <p className="text-center text-slate-300 font-thin mt-4 mb-8">
                    Veuillez sélectionner un type d'animal pour voir les recommandations de nutrition.
                </p>
            )}
        </section>
    )
}