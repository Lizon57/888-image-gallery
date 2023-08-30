import { store } from "@/store/store"
import { galleryService } from "@/services/gallery.service"
import { debounce } from "@/services/utils/debounce"
import { PhotoEntity } from "@/models/photo-entity"


const setDataDebounce = debounce(setData, 300)


export function setSearchTerm(searchTerm: string) {
    store.dispatch({ type: 'setSearchTerm', searchTerm })
    if (!searchTerm) return

    store.dispatch({ type: 'setIsLoading', isLoading: true })
    setDataDebounce(searchTerm)
}


export function setError(error: number) {
    store.dispatch({ type: 'setError', error })
}


export function addPhotos(photos: PhotoEntity[]) {
    store.dispatch({ type: 'addPhotos', photos })
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