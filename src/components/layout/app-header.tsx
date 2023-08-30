import { ChangeEvent } from 'react'
import { BiDownload, BiUpload } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setSearchTerm } from '@/store/actions/app.action'
import { localStorageService } from '@/services/local-storage.service'
import { GALLERY_CACHE_KEY } from '@/constants/gallery-cache-key'
import { Dropdown } from '@/components/common/dropdown/dropdown'
import styles from './app-header.module.scss'


export function AppHeader() {
    const { searchTerm } = useSelector((state: RootState) => state.appModule)

    const searchHistory = Object.keys(localStorageService.read(GALLERY_CACHE_KEY) || {})
    const formattedSearchHistory = searchHistory.map(key => ({
        title: key,
        onClick: () => setSearchTerm(key)
    }))


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
                    {searchTerm && <button title="Save results"><BiDownload />Save</button>}
                    {!!searchHistory.length && <Dropdown
                        controller={{
                            title: 'Browse saved results',
                            display: <><BiUpload />Restore</>
                        }}
                        items={formattedSearchHistory}
                    />}
                </div>
            </div>
        </header >
    )
}