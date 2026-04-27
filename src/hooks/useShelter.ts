import { useQuery } from '@tanstack/react-query';
import getShelters from '../api/shelters';

export default function useShelter() {
    return useQuery({
        queryKey: ['shelters'],
        queryFn: () => getShelters(),
    });
}