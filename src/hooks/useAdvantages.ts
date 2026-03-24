import { useQuery } from '@tanstack/react-query';
import getAdvantageByFoodTypeId from '../api/advantages';

export default function useAdvantages(foodTypeId: number) {
    return useQuery({
        queryKey: ['advantages', foodTypeId],
        queryFn: () => getAdvantageByFoodTypeId(foodTypeId),
        enabled: foodTypeId > 0
    })
}