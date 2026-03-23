import { useQuery } from "@tanstack/react-query";
import getHealth from "../api/health";

export default function useHealth(animalId: number) {
    return useQuery({
        queryKey: ['health', animalId],
        queryFn: () => getHealth(animalId),
        enabled: animalId > 0,
    });
};