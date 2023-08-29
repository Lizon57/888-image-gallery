import { FlickrPhotoEntity } from "./flickr-photo-entity"

export type FlickrPhotoResponse = {
    photos: {
        page: number
        pages: number
        perpage: number
        total: number
        photo: FlickrPhotoEntity[]
    }
    stat: string
}
