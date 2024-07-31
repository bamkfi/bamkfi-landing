import classNames from 'classnames';
import styles from './heading.module.css';
import { mulish } from '../../ui/fonts';
import { ReactNode } from 'react';

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h1 className={classNames(mulish.className, styles.wrapper)}>
      {children}
    </h1>
  );
}