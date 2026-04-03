import AsyncSelect from 'react-select/async';
import getCityOptions from '../api/geoFilter';

type CityOption = {
    value: string;
    label: string;
};

// Variable pour stocker le timer de debounce
let debounceTimer: ReturnType<typeof setTimeout>;

// Fonction de chargement des options avec debounce
const loadOptions = (inputValue: string): Promise<CityOption[]> => {
    if (!inputValue) return Promise.resolve([]);
    return new Promise((resolve) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            resolve(getCityOptions(inputValue));
        }, 500);
    });
};

export default function CityFilter() {
    return (
        <AsyncSelect
            loadOptions={loadOptions}
            placeholder="Rechercher une ville..."
            unstyled
            className='w-[70%] justify-self-center m-12'
            classNames={{
                control: () => 'bg-slate-100 rounded px-2 py-1',
                menu: () => 'bg-slate-100 rounded mt-1',
                option: ({ isFocused }) => isFocused ? 'bg-slate-400 text-black px-3 py-2 cursor-pointer' : 'text-black px-3 py-2',
                input: () => 'text-black',
                singleValue: () => 'text-black',
                placeholder: () => 'text-black',
                dropdownIndicator: () => 'text-black',
                noOptionsMessage: () => 'text-black px-3 py-2',
                loadingIndicator: () => 'text-black px-3 py-2',
                loadingMessage: () => 'text-black px-3 py-2'
            }}
        />
    );
}