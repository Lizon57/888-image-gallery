import { ReactElement, useRef } from 'react'
import classNames from 'classnames'
import uuid from 'react-uuid'
import { useOnClickOutside } from '@/hooks/use-onclick-outside'
import { DropdownItem } from '@/models/dropdown-item'
import styles from './dropdown.module.scss'


export function Dropdown({ controller, items, isOpenToRight }: Props) {
    const checkboxRef = useRef<HTMLInputElement>(null)

    const closeDropdownContent = () => {
        if (!checkboxRef.current!.checked) return
        checkboxRef.current!.checked = false
    }

    useOnClickOutside(checkboxRef, closeDropdownContent)


    const onItemClick = (callback: () => void) => {
        callback()
        closeDropdownContent()
    }

    const openToRightClassname = styles.open_to_right


    return (
        <div className={styles.dropdown_container}>
            <input type="checkbox" className={styles.checkbox} ref={checkboxRef} />
            <button title={controller.title} className={styles.controller}>{controller.display}</button>

            <div className={classNames(styles.content_container, { [openToRightClassname]: isOpenToRight })}>
                {items.map(item => <button
                    key={uuid()}
                    className={styles.item}
                    onClick={() => onItemClick(item.onClick)}
                >
                    {item.key}
                </button>)}
            </div>
        </div>
    )
}


type Props = {
    controller: {
        title: string
        display: ReactElement | string
    }
    items: DropdownItem[]
    isOpenToRight: boolean
}