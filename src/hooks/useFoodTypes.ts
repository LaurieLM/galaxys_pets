import { useQuery } from '@tanstack/react-query';
import getFoodTypesByAnimalId from '../api/foodTypes';

export default function useFoodTypes(animalId: number) {
    return useQuery({
        queryKey: ['foodTypes', animalId],
        queryFn: () => getFoodTypesByAnimalId(animalId),
        enabled: animalId > 0
    })
}