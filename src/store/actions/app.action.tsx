import { store } from "@/store/store"


export const setSearchTerm = (searchTerm: string) => {
    store.dispatch({ type: 'setSearchTerm', searchTerm })
}
