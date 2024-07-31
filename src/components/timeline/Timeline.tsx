'use client';
import React, { useEffect, useRef } from 'react';
import styles from './Timeline.module.css';

const events = [
  { date: '21-4-2024', description: 'BAMK token deployed with 6.25% mint' },
  { date: '21-5-2024', description: 'UTXO Mgmt add $1million to NUSD TVL' },
  { date: '15-6-2024', description: 'NUSD TVL over $4million' },
  { date: '3-7-2024', description: 'BTC/NUSD LP TVL on Dotswap over 10 BTC' },
  { date: 'Future', description: 'NUSD as base pairs on BTCFi ecosystem' },
  { date: 'Future', description: 'Delta-neutral hedging on perp dex' },
];

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateEventWidth = () => {
      const timelineContainer = document.querySelector(`.${styles.timelineContainer}`) as HTMLElement | null;
      if (timelineContainer) {
        const containerWidth = timelineContainer.clientWidth;
        const numberOfEvents = events.length;
        let eventWidth = containerWidth / numberOfEvents - 20;

        if ( eventWidth < 200 ) {
          eventWidth = 200;
        }

        timelineContainer.style.setProperty('--event-width', `${eventWidth}px`);
      }
    };

    updateEventWidth();
    window.addEventListener('resize', updateEventWidth);

    return () => {
      window.removeEventListener('resize', updateEventWidth);
    };
  }, []);

  return (
    <div className={styles.timelineContainer} ref={timelineRef}>
      <div className={styles.timeline}>
        {events.map((event, index) => (
          <div
            key={index}
            className={`${styles.timelineEvent} ${index % 2 === 0 ? styles.bottom : styles.top} ${event.date === 'Future' ? styles.future : ''}`}
          >
            <div className={styles.timelineContent}>
              <time>{event.date}</time>
              <p>{event.description}</p>
            </div>
            <div className={styles.timelineDot}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
