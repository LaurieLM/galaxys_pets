import { useQuery } from '@tanstack/react-query';
import getVaccinesByAnimalId from '../api/vaccines';

export default function useVaccines(animalId: number) {
    return useQuery({
        queryKey: ['vaccines', animalId],
        queryFn: () => getVaccinesByAnimalId(animalId),
        enabled: animalId > 0,
    });
}