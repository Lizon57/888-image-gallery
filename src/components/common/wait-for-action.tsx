import styles from './wait-for-action.module.scss'


export function WaitForAction({ title, text }: Props) {
    return (
        <section className={styles.container}>
            <span>
                👀
            </span>

            <p className={styles.title}>{title}</p>
            <p className={styles.text}>{text}</p>
        </section>
    )
}


type Props = {
    title: string
    text?: string
}