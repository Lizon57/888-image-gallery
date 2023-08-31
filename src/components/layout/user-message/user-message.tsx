import { useEffect, useState } from "react"
import { eventBus } from "@/services/event-bus.service"
import styles from './user-message.module.scss'


const delay = 3500

export function UserMessage() {
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        const unsubscribePopMessage = eventBus.on('popMessage', message => {
            setMessage(message as string)
            setTimeout(() => setMessage(''), delay)
        })

        return () => unsubscribePopMessage()
    }, [])


    if (!message) return <></>
    return (
        <aside className={styles.container} title={message}>
            <span>{message}</span>
        </aside>
    )
}