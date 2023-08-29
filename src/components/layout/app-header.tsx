import styles from './app-header.module.scss'
import { BiDownload, BiUpload } from 'react-icons/bi'

export function AppHeader() {
    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <input type="search" placeholder="Type to search photos..." title="Type search term" autoFocus />

                <div className={styles.actions_container}>
                    <button title="Save results"><BiDownload />Save</button>
                    <button title="Browse saved results"><BiUpload />Restore</button>
                </div>
            </div>
        </header>
    )
}