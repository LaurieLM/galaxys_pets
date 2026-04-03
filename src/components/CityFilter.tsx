import AsyncSelect from 'react-select/async';
import getCityOptions from '../api/geoFilter';

type CityOption = {
    value: string;
    label: string;
};

const loadOptions = async (inputValue: string): Promise<CityOption[]> => {
    if (!inputValue) return [];
    return getCityOptions(inputValue);
};

export default function CityFilter() {
    return (
        <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions className='text-black'/>
    );
}