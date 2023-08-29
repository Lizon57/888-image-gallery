import { store } from "@/store/store"
import { galleryService } from "@/services/gallery.service"
import { debounce } from "@/services/utils/debounce"


const setDataDebounce = debounce(setData, 300)


export function setSearchTerm(searchTerm: string) {
    store.dispatch({ type: 'setSearchTerm', searchTerm })
    if (!searchTerm) return

    store.dispatch({ type: 'setIsLoading', isLoading: true })
    setDataDebounce(searchTerm)
}


async function setData(searchTerm: string) {
    try {
        const photos = await galleryService.fetchData(searchTerm)
        store.dispatch({ type: 'setPhotos', photos })
    } catch (error) {
        store.dispatch({ type: 'setError', error })
    } finally {
        store.dispatch({ type: 'setIsLoading', isLoading: false })
    }
}