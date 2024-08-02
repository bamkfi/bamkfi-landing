'use client';

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './faq.module.css';
import { nunito } from '@/components/ui/fonts';
import ChevronDown from '@/icons/ChevronDown';
import ChevronUp from '@/icons/ChevronUp';

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqData = [
    { question: 'What is Bamkfi?', answer: 'Bamkfi is...' },
    { question: 'How does NUSD work?', answer: 'NUSD works by...' },
    { question: 'How do you mint and redeem NUSD?', answer: 'You can mint and redeem NUSD by...' },
    { question: 'What keeps NUSD pegged at $1?', answer: 'NUSD is pegged to $1 by...' },
  ];

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>FAQ</h2>
      {faqData.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <div
            className={`${styles.question} ${nunito.className} font-extrabold`}
            onClick={() => handleToggle(index)}
          >
            {item.question}
            <span className={styles.arrow}>
              {expandedIndex === index ? <ChevronUp /> : <ChevronDown />}
            </span>
          </div>
          <CSSTransition
            in={expandedIndex === index}
            timeout={300}
            classNames={{
              enter: styles.answerEnter,
              enterActive: styles.answerEnterActive,
              exit: styles.answerExit,
              exitActive: styles.answerExitActive,
            }}
            unmountOnExit
          >
            <div className={`${styles.answer} ${nunito.className} font-extrabold`}>
              {item.answer}
            </div>
          </CSSTransition>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
