import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getAnimals from "../api/animals";
import chevronLogo from "../assets/chevron_logo.svg";

type DropdownProps = {
    selectedAnimalId: number;
    setSelectedAnimalId: (id: number) => void;
};

export default function Dropdown({ selectedAnimalId, setSelectedAnimalId }: DropdownProps) {
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

    // Récupérer l'animal sélectionné à partir de la liste des animaux
    const selectedAnimal = animals?.find((animal) => animal.id === selectedAnimalId);

    // Gestion des états de chargement et d'erreur pour les types d'animaux
    if (isLoadingAnimals) return <p>Chargement des types d'animaux...</p>;
    if (isErrorAnimals) return <p>Erreur types d'animaux: {(animalsError as Error).message}</p>;

    return (
        // Dropdown pour sélectionner le type d'animal
        <div className="m-[1.5rem] flex flex-col justify-center items-center">
            <div className="relative max-w-xs mb-[1.5rem]" ref={dropdownRef}>
                <button
                    type="button"
                    className="w-[16rem] h-[2.5rem] pl-8 pr-4 text-center flex items-center justify-between rounded-lg border border-slate-500 bg-[#4b5565] text-white shadow-sm"
                    onClick={() => setIsDropdownOpen((current) => !current)}
                >
                    <span className="truncate">
                        {selectedAnimal ? selectedAnimal.type : "Type d'animal"}
                    </span>
                    <img
                        src={chevronLogo}
                        alt=""
                        className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
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
    )
}