import styles from './loading.module.scss'


export function Loading({ text }: Props) {
    return (
        <section className={styles.container}>
            <div className={styles.animation}>
                <span></span>
                <span className={styles.dot2}></span>
                <span></span>
            </div>
            
            <p>{text}</p>
        </section>
    )
}


type Props = {
    text: string
}