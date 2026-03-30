import { useQuery } from '@tanstack/react-query';
import getDisadvantageByFoodTypeId from '../api/disadvantages';

export default function useDisadvantages(foodTypeId: number) {
    return useQuery({
        queryKey: ['disadvantages', foodTypeId],
        queryFn: () => getDisadvantageByFoodTypeId(foodTypeId),
        enabled: foodTypeId > 0
    })
}