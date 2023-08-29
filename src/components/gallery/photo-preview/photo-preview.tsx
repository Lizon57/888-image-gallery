import { PhotoEntity } from "@/models/photo-entity"


export function PhotoPreview({ photo, title, onClick }: Props) {
    const url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`

    return (
        <img
            src={url}
            alt={`${title} photo`}
            onClick={onClick}
        />
    )
}


type Props = {
    photo: PhotoEntity
    title: string
    onClick: () => void
}