import 'normalize.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { AppHeader } from '@/components/layout/app-header'
import { WaitForAction } from '@/components/common/wait-for-action'
import '@/styles/basics/_index.scss'
import styles from './app.module.scss'


export function App() {
    const { searchTerm } = useSelector((state: RootState) => state.appModule)

    return (
        <div className={styles.app_layout}>
            <AppHeader />

            {!searchTerm && <div className={styles.page_container}>
                <WaitForAction
                    title="Be amazed by our photos"
                    text="Discover captivating moments with just a search! Explore our vast photo categories. Dive into a world of visual stories. Unleash your curiosity now in the search bar!"
                />
            </div>}
        </div>
    )
}