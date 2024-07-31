import React from 'react';
import styles from './explainer.module.css';
import NusdIcon from '@/icons/nusd';
import OneNisOneDIcon from '@/icons/1Nis1D';
import { Description } from './text/description';
import { Heading } from './text/heading';

const Explainer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles.section1}`}>
        <div className={styles.iconWrapper}>
          <OneNisOneDIcon className={styles.responsiveIcon} />
        </div>
      </div>
      <div className={`${styles.section} ${styles.section2}`}>
        <div>
          <Heading>STABILITY WITHOUT<br/>TRADITIONAL FINANCE</Heading>
          <Description>
          NUSD is the Bitcoin dollar that requires no reliance<br/>
          on banks to exist. 1 NUSD is backed by $1 of a<br/>
          simultaneous long & short crypto perpetuals<br/>
          position.
          </Description>
        </div>
      </div>
      <div className={`${styles.section} ${styles.section4}`}>
        <div className='flex items-center justify-center h-full p-2'>
          <div className={styles.iconContainer}>
            <NusdIcon className={styles.responsiveIcon} />
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.section3}`}>
        <div>
          <Heading>100% BACKED AND<br/>VERIFIABLE ONCHAIN</Heading>
          <Description>
          Phase 1 NUSD is backed 1:1 with Ethena's USDe.<br/>
          Phase 2 backing will transition to hedging BTC<br/>
          delta-neutral positions on perpetual DEXes. Learn<br/>
          more about what this involves in the <a href="https://docs.bamk.fi/bamkfi">docs</a>.
          </Description>
        </div>
      </div>
    </div>
  );
};

export default Explainer;
