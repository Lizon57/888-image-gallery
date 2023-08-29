import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Loading } from '@/components/common/loading/loading'
import { LargeMessage } from '@/components/common/large-message/large-message'


export function Gallery() {
    const { searchTerm, photos, isLoading, error } = useSelector((state: RootState) => state.appModule)


    if (isLoading) return <Loading text="Loading awsome images, please wait..." />
    if (error) return <LargeMessage
        title="OOPS! an error occured."
        text={`We couldn't establish you're request. Please try again in few seconds. Error code: ${error}.`}
        emoji='😔'
    />
    if (!searchTerm) return <LargeMessage
        title="Be amazed by our photos!"
        text="Discover captivating moments with just a search! Explore our vast photo categories. Dive into a world of visual stories. Unleash your curiosity now in the search bar!"
        emoji='👀'
    />
    if (Array.isArray(photos) && !photos.length) return <LargeMessage
        title="Sorry, there are no photos to display."
        text="We couldn't find any photo matches for your request. Please try a new search term."
        emoji='😔'
    />

    return (
        <>
            Gallery
        </>
    )
}