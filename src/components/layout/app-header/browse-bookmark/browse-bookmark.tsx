import { useState, useEffect } from 'react'
import { GiBookmarklet } from 'react-icons/gi'
import { setSearchTerm } from '@/store/actions/app.action'
import { bookmarkService } from '@/services/bookmark.service'
import { DropdownItem } from '@/models/dropdown-item'
import { Dropdown } from '@/components/common/dropdown/dropdown'
import { eventBus } from '@/services/event-bus.service'


const getFormattedBookmarks = (bookmarks: string[]) => {
    return bookmarks.map(key => ({
        key,
        onClick: () => setSearchTerm(key)
    }))
}

export function BrowseBookmark() {
    const [bookmarks, setBookmarks] = useState<DropdownItem[]>([])

    const updateBookmarks = () => {
        const bookmarksFromStorage = bookmarkService.query()
        const formattedBookmarks = getFormattedBookmarks(bookmarksFromStorage)
        setBookmarks(formattedBookmarks)
    }

    useEffect(() => {
        updateBookmarks()

        const unsubscribeUpdateBookmark = eventBus.on('updateBookmark', _ => {
            updateBookmarks()
        })

        return () => unsubscribeUpdateBookmark()
    }, [])


    if (!bookmarks.length) return <></>
    return (
        <Dropdown
            controller={{
                title: 'Browse saved results',
                display: <><GiBookmarklet />Browse bookmarks</>
            }}
            items={bookmarks}
        />
    )
}