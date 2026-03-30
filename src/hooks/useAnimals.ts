import { useQuery } from "@tanstack/react-query"
import getAnimals from "../api/animals"

export default function useAnimals() {
    return useQuery({
        queryKey: ['animal'],
        queryFn: () => getAnimals()
    })
}