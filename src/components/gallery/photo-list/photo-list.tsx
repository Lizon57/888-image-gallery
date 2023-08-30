import { useState, useRef, useEffect } from 'react'
import uuid from "react-uuid"
import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox"
import Counter from "yet-another-react-lightbox/plugins/counter"
import Download from "yet-another-react-lightbox/plugins/download"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/plugins/counter.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { addPhotos, setError } from '@/store/actions/app.action'
import { galleryService } from '@/services/gallery.service'
import { debounce } from '@/services/utils/debounce'
import { PhotoEntity } from '@/models/photo-entity'
import { IMAGE_PER_PAGE_COUNT } from '@/constants/image-per-page-count'
import { PhotoPreview } from "@/components/gallery/photo-preview/photo-preview"
import styles from './photo-list.module.scss'


export function PhotoList() {
    const { searchTerm, photos, isLoading } = useSelector((state: RootState) => state.appModule)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [isFetchData, setIsFetchData] = useState(false)

    const thumbnailsRef = useRef<ThumbnailsRef>(null)

    const onSetCurrentPhotoIndex = (index: number) => {
        setCurrentPhotoIndex(index)
        setIsLightboxOpen(true)
    }

    const handleScroll = async () => {
        const shouldFetchData = ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 300)
        if (!shouldFetchData || isFetchData) return

        setIsFetchData(true)
        const currPageCount = ((photos.length / IMAGE_PER_PAGE_COUNT) - 1)
        try {
            const nextPagePhotos = await galleryService.fetchData(searchTerm, currPageCount + 1)
            addPhotos(nextPagePhotos)
        } catch (error) {
            setError(500)
        } finally {
            setIsFetchData(false)
        }
    }
    const handleScrollDebounce = debounce(handleScroll, 1000)

    useEffect(() => {
        addEventListener('scroll', handleScrollDebounce)

        return () => removeEventListener('scroll', handleScrollDebounce)
    }, [photos, isFetchData])


    return (
        <>
            <h1 className={styles.title}>"<span>{searchTerm}</span>" photos gallery (showing {photos.length} photos)</h1>

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

            {!isFetchData && <div className={styles.scroll_to_fetch}>
                <p>Scroll for more photos</p>
                <div className={styles.animation_container}></div>
            </div>}

            {!!isFetchData && <p className={styles.infinite_loader}>Getting more photos for you!</p>}
        </>
    )
}