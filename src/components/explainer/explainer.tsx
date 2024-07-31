import React from 'react';
import styles from './explainer.module.css';
import NusdIcon from '@/icons/nusd';
import OneNisOneDIcon from '@/icons/1Nis1D';
import { Description } from './text/description';
import { Heading } from './text/heading';

const Explainer: React.FC = () => {
  return (
    <>
      {/* Desktop Layout */}
      <div className={`${styles.container} ${styles.desktop}`}>
        <div className={`${styles.section} ${styles.section1}`}>
          <div>
            <OneNisOneDIcon />
          </div>
        </div>
        <div className={`${styles.section} ${styles.section2}`}>
          <div>
            <Heading>STABILITY WITHOUT TRADITIONAL FINANCE</Heading>
            <Description>NUSD is the Bitcoin dollar that requires no reliance on banks to exist. 1 NUSD is backed by $1 of a simultaneous long & short crypto perpetuals position.</Description>
          </div>
        </div>
        <div className={`${styles.section} ${styles.section3}`}>
          <div>
            <Heading>100% BACKED AND VERIFIABLE ONCHAIN</Heading>
            <Description>Phase 1 NUSD is backed 1:1 with Ethena's USDe. Phase 2 backing will transition to hedging BTC delta-neutral positions on perpetual DEXes. Learn more about what this involves in the <a href="#">docs</a>.</Description>
          </div>
        </div>
        <div className={`${styles.section} ${styles.section4}`}>
          <div className='flex items-center justify-center h-full'>
            <div className="bg-[#F7931A] p-[0.4rem] rounded-full h-80 w-80 flex items-center justify-center">
              <NusdIcon height={175} width={175} className="stroke-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={`${styles.container} ${styles.mobile}`}>
        <div className={`${styles.section} ${styles.section1}`}>
          <div>
            <OneNisOneDIcon />
          </div>
        </div>
        <div className={`${styles.section} ${styles.section2}`}>
          <div>
            <h2>STABILITY WITHOUT TRADITIONAL FINANCE</h2>
            <p>NUSD is the Bitcoin dollar that requires no reliance on banks to exist. 1 NUSD is backed by $1 of a simultaneous long & short crypto perpetuals position.</p>
          </div>
        </div>
        <div className={`${styles.section} ${styles.section3}`}>
          <div>
            <h2>100% BACKED AND VERIFIABLE ONCHAIN</h2>
            <p>Phase 1 NUSD is backed 1:1 with Ethena's USDe. Phase 2 backing will transition to hedging BTC delta-neutral positions on perpetual DEXes. Learn more about what this involves in the <a href="#">docs</a>.</p>
          </div>
        </div>
        <div className={`${styles.section} ${styles.section4}`}>
          <NusdIcon height={200} width={200} />
        </div>
      </div>
    </>
  );
};

export default Explainer;
