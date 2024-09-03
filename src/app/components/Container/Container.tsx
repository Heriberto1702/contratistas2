import React, { ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  displayType?: 'flex' | 'grid';
  flexDirection?: 'row' | 'column';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  gap?: string;
  gridTemplateColumns?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  displayType = 'flex',
  flexDirection = 'row',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  gap = '0',
  gridTemplateColumns = '1fr',
}) => {
  return (
    <div
      className={styles.container}
      style={{
        display: displayType,
        flexDirection: displayType === 'flex' ? flexDirection : undefined,
        justifyContent: displayType === 'flex' ? justifyContent : undefined,
        alignItems: displayType === 'flex' ? alignItems : undefined,
        gap,
        gridTemplateColumns: displayType === 'grid' ? gridTemplateColumns : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default Container;