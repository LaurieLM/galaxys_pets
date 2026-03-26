import { useEffect, useRef, useState } from "react";
import chevronLogo from "../assets/chevron_logo.svg";

type FilterOption = {
    value: string;
    label: string;
};

type FilterProps = {
    label?: string;
    options: FilterOption[];
    selectedValue: string;
    onChange: (value: string) => void;
};

export default function Filter({
    label = "Rubrique",
    options,
    selectedValue,
    onChange,
}: FilterProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

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

    const selectedOption = options.find((option) => option.value === selectedValue);

    return (
        <div className="mt-2 flex flex-col items-center justify-center">
            <div className="relative mb-[1.5rem] max-w-xs" ref={dropdownRef}>
                <label className="mb-2 block text-sm font-semibold text-slate-200">{label}</label>
                <button
                    type="button"
                    className="flex h-[2.5rem] w-[16rem] items-center justify-between rounded-lg border border-slate-500 bg-[#4b5565] pl-8 pr-4 text-center text-white shadow-sm"
                    onClick={() => setIsDropdownOpen((current) => !current)}
                >
                    <span className="truncate">
                        {selectedOption ? selectedOption.label : "Sélectionner une rubrique"}
                    </span>
                    <img
                        src={chevronLogo}
                        alt=""
                        className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-slate-500 bg-[#353c48] shadow-lg">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className="block w-full px-4 py-3 text-left text-white transition-colors hover:bg-slate-600"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}