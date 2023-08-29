import styles from './large-message.module.scss'


export function LargeMessage({ title, text, emoji }: Props) {
    return (
        <section className={styles.container}>
            {emoji && <span>{emoji}</span>}

            <p className={styles.title}>{title}</p>
            <p className={styles.text}>{text}</p>
        </section>
    )
}


type Props = {
    title: string
    text: string
    emoji?: string
}