import classNames from 'classnames';
import styles from './description.module.css';
import { nunito } from '../../ui/fonts';
import { ReactNode } from 'react';

export function Description({ children }: { children: ReactNode }) {
  return (
    <h1 className={classNames(nunito.className, styles.wrapper)}>
      {children}
    </h1>
  );
}
