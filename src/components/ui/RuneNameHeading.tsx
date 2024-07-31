import classNames from 'classnames'
import styles from './RuneNameHeading.module.css'
import { mulish } from './fonts'

export function RuneNameHeading({ children }: { children: string }) {
    return (
        <h1 className={classNames(mulish.className, styles.wrapper)}>
            {children}
        </h1>
    )
}