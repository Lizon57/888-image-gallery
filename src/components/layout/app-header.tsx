import { ChangeEvent } from 'react'
import { BiDownload, BiUpload } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setSearchTerm } from '@/store/actions/app.action'
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
                />

                <div className={styles.actions_container}>
                    {searchTerm && <button title="Save results"><BiDownload />Save</button>}
                    <button title="Browse saved results"><BiUpload />Restore</button>
                </div>
            </div>
        </header>
    )
}