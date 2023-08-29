import { useState, useRef } from 'react'
import uuid from "react-uuid"
import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox"
import Counter from "yet-another-react-lightbox/plugins/counter"
import Download from "yet-another-react-lightbox/plugins/download"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/plugins/counter.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { PhotoEntity } from '@/models/photo-entity'
import { PhotoPreview } from "@/components/gallery/photo-preview/photo-preview"
import styles from './photo-list.module.scss'


export function PhotoList() {
    const { searchTerm, photos } = useSelector((state: RootState) => state.appModule)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

    const thumbnailsRef = useRef<ThumbnailsRef>(null)

    const onSetCurrentPhotoIndex = (index: number) => {
        setCurrentPhotoIndex(index)
        setIsLightboxOpen(true)
    }

    return (
        <>
            <h1 className={styles.title}>"<span>{searchTerm}</span>" photos gallery</h1>

            <Lightbox
                open={isLightboxOpen}
                slides={photos.map((photo: PhotoEntity) => ({
                    src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                }))}
                index={currentPhotoIndex}
                close={() => setIsLightboxOpen(false)}
                plugins={[Counter, Download, Thumbnails]}
                thumbnails={{ ref: thumbnailsRef }}
                on={{
                    click: () => {
                        if (thumbnailsRef.current?.visible) thumbnailsRef.current?.hide?.()
                        else thumbnailsRef.current?.hide?.()
                    }
                }}
            />

            <section className={styles.container}>
                {photos.map((photo: PhotoEntity, index: number) => <PhotoPreview
                    key={uuid()}
                    photo={photo}
                    title={searchTerm}
                    onClick={() => onSetCurrentPhotoIndex(index)}
                />)}
            </section>
        </>
    )
}