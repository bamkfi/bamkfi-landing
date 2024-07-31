import React from 'react';
import Image from 'next/image';
import styles from './rewards.module.css';
import NusdIcon from '@/icons/nusdfullsize.png';
import DotswapIcon from '@/icons/dotswap.png';
import { Heading } from './text/heading';
import { Description } from './text/description';
import { nunito } from '../ui/fonts';
import { Button } from '../ui/button';

interface RewardsProps {
  apy: number;
}

const Rewards: React.FC<RewardsProps> = ({ apy }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${styles.box1}`}>
        <div className={styles.icon}>
          <Image src={NusdIcon} alt="NUSD Icon" width={64} height={64} />
        </div>
        <div className={styles.content}>
          <Heading>{`Hold NUSD and earn ${apy.toFixed(2)}%`}</Heading>
          <div className={`${styles.paragraph} ${nunito.className} pb-4`}>
            <Description>Automatically earn BAMK for holding NUSD,</Description>
            <Description>tokens unlock ~41k blocks later</Description>
          </div>
          <Button className='font-bold min-w-32 py-6' variant="default">GET NUSD</Button>
        </div>
      </div>
      <div className={`${styles.box} ${styles.box2}`}>
        <div className={styles.icon}>
          <Image src={DotswapIcon} alt="Dotswap Icon" width={64} height={64} />
        </div>
        <div className={styles.content}>
          <Heading>Liquidity Provider Rewards</Heading>
          <div className={`${styles.paragraph} ${nunito.className} pb-4`}>
            <Description>Extra BAMK rewards for NUSD holders who add</Description>
            <Description>liquidity to the BTC/NUSD pool on Dotswap</Description>
          </div>
          <Button className='font-bold min-w-32 py-6' variant="secondary">ADD LIQUIDITY</Button>
        </div>
      </div>
    </div>
  );
};

export default Rewards;