import 'normalize.css'
import "yet-another-react-lightbox/styles.css"
import { AppHeader } from '@/components/layout/app-header'
import { Gallery } from '@/views/gallery/gallery'
import '@/styles/basics/_index.scss'
import styles from './app.module.scss'



export function App() {

    return (
        <div className={styles.app_layout}>
            <AppHeader />

            <div className={styles.page_container}>
                <Gallery />
            </div>
        </div>
    )
}          