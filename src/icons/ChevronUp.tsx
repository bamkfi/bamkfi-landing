import React, { FC, ReactElement } from 'react';
import ChevronDown from './ChevronDown';

const ChevronUp: FC<{ className?: string; width?: number; height?: number }> = (props): ReactElement => {
  return (
    <div style={{ transform: 'rotate(180deg)' }}>
      <ChevronDown {...props} />
    </div>
  );
};

export default ChevronUp;
