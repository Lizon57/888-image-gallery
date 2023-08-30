import { useState, useEffect } from 'react'
import { BsBookmarkHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { bookmarkService } from '@/services/bookmark.service'
import { eventBus, updateBookmark } from "@/services/event-bus.service"
import styles from './bookmark-button.module.scss'
import classNames from 'classnames'


export function BookmarkButton() {
    const { searchTerm } = useSelector((state: RootState) => state.appModule)
    const [isBookmarked, setIsBookmarked] = useState(bookmarkService.isBookmarkExist(searchTerm))

    useEffect(() => {
        setIsBookmarked(bookmarkService.isBookmarkExist(searchTerm))
    }, [searchTerm])


    const toggleBookmark = () => {
        if (isBookmarked) {
            bookmarkService.removeBookmark(searchTerm)
            setIsBookmarked(false)
            eventBus.emit('popMessage', `${searchTerm} removed from bookmarks!`)
        } else {
            bookmarkService.saveBookmark(searchTerm)
            setIsBookmarked(true)
            eventBus.emit('popMessage', `${searchTerm} added to bookmarks!`)
        }

        updateBookmark()
    }


    const bookmarkedClassname = styles.bookmarked

    return (
        <button
            className={classNames(styles.button, { [bookmarkedClassname]: isBookmarked })}
            title="Add to bookmark"
            onClick={toggleBookmark}
        >
            <BsBookmarkHeartFill />
            {isBookmarked ? 'Remove bookmark' : 'Add to bookmarks'}
        </button>
    )
}