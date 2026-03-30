import { useQuery } from '@tanstack/react-query';
import getDangerousFood from '../api/dangerousFood';

export default function useDangerousFood(animalId: number) {
    return useQuery({
        queryKey: ['dangerousFood', animalId],
        queryFn: () => getDangerousFood(animalId),
        enabled: animalId > 0
    })
}