import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setSearchTerm } from '@/store/actions/app.action'
import { BrowseBookmark } from './browse-bookmark/browse-bookmark'
import { BookmarkButton } from './bookmark-button/bookmark-button'
import styles from './app-header.module.scss'


export function AppHeader() {
    const { searchTerm } = useSelector((state: RootState) => state.appModule)


    const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target
        setSearchTerm(value)
    }



    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <input
                    type="search"
                    placeholder="Type to search photos..."
                    title="Type search term"
                    autoFocus
                    onChange={onInputChange}
                    value={searchTerm}
                />

                <div className={styles.actions_container}>
                    {searchTerm && <BookmarkButton />}

                    <BrowseBookmark />
                </div>
            </div>
        </header >
    )
}