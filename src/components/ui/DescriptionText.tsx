import classNames from 'classnames'
import styles from './DescriptionText.module.css'
import { nunito } from './fonts'

export function DescriptionText({ children }: { children: string }) {
    return (
        <h1 className={classNames(nunito.className, styles.wrapper)}>
            {children}
        </h1>
    )
}