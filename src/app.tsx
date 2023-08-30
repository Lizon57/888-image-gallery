import 'normalize.css'
import "yet-another-react-lightbox/styles.css"
import { Gallery } from '@/views/gallery/gallery'
import { AppHeader } from '@/components/layout/app-header/app-header'
import { UserMessage } from './components/layout/user-message/user-message'
import '@/styles/basics/_index.scss'
import styles from './app.module.scss'



export function App() {

    return (
        <div className={styles.app_layout}>
            <AppHeader />

            <div className={styles.page_container}>
                <Gallery />
            </div>

            <UserMessage />
        </div>
    )
}          