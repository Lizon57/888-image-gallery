import uuid from "react-uuid"
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { PhotoEntity } from '@/models/photo-entity'
import { PhotoPreview } from "@/components/gallery/photo-preview/photo-preview"
import styles from './photo-list.module.scss'


export function PhotoList() {
    const { searchTerm, photos } = useSelector((state: RootState) => state.appModule)


    return (
        <>
            <h1 className={styles.title}>"<span>{searchTerm}</span>" photos gallery</h1>

            <section className={styles.container}>
                {photos.map((photo: PhotoEntity) => <PhotoPreview
                    key={uuid()}
                    photo={photo}
                    title={searchTerm}
                />)}
            </section>
        </>
    )
}