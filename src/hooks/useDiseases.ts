import { useQuery } from '@tanstack/react-query';
import getDiseasesByAnimalId from '../api/diseases';

export default function useDiseases(animalId: number) {
    return useQuery({
        queryKey: ['diseases', animalId],
        queryFn: () => getDiseasesByAnimalId(animalId),
        enabled: animalId > 0
    })
}