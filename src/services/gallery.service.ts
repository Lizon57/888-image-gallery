import { VALID_CACHE_TIME } from "@/constants/valid-cache-time"
import { GALLERY_CACHE_KEY } from "@/constants/local-storage-keys"
import { IMAGE_PER_PAGE_COUNT } from "@/constants/image-per-page-count"
import { localStorageService } from "./local-storage.service"
import { httpService } from "./http.service"
import { FlickrPhotoEntity } from "@/models/flickr/flickr-photo-entity"


const apikey: string = import.meta.env.VITE_APP_FLICKR_API_KEY


async function fetchData(searchTerm: string, page = 0) {
    try {
        const cachedData = _loadCachedData(searchTerm)
        const shouldGetNextPage = (page + 1 > cachedData?.photos?.length / IMAGE_PER_PAGE_COUNT)
        if (cachedData.cachedAt && (cachedData.cachedAt + VALID_CACHE_TIME > Date.now()) && !shouldGetNextPage) {
            return cachedData.photos
        } else {
            const flickrApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&text=${searchTerm}&per_page=${IMAGE_PER_PAGE_COUNT}&page=${page}&tag_mode=all&format=json&nojsoncallback=1&sort=relevance`
            const data = await httpService.get(flickrApiUrl)
            data.photos.photo = data.photos.photo.map((photo: FlickrPhotoEntity) => ({
                id: photo.id,
                farm: photo.farm,
                server: photo.server,
                secret: photo.secret
            }))

            const result = { cachedAt: Date.now(), photos: data.photos.photo }
            if (page) result.photos = [...cachedData.photos, ...data.photos.photo]

            localStorageService.saveToMap(GALLERY_CACHE_KEY, searchTerm, result)
            return data.photos.photo
        }
    } catch (err) {
        throw err
    }
}


function _loadCachedData(searchTerm: string) {
    let cachedResultMap = localStorageService.read(GALLERY_CACHE_KEY)
    if (!cachedResultMap) {
        localStorageService.save(GALLERY_CACHE_KEY, {})
        cachedResultMap = {}
    }
    return cachedResultMap[searchTerm] || {}
}


export const galleryService = {
    fetchData
}