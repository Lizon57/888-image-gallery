import 'normalize.css'
import { AppHeader } from '@/components/layout/app-header'
import '@/styles/basics/_index.scss'
import styles from './app.module.scss'


export function App() {
    return (
        <div className={styles.appLayout}>
            <AppHeader />
        </div>
    )
}