import classNames from 'classnames'
import styles from './heading.module.css'
import { nunito } from '../../ui/fonts'

export function Heading({ children }: { children: string }) {
    return (
        <h1 className={classNames(nunito.className, styles.wrapper)}>
            {children}
        </h1>
    )
}