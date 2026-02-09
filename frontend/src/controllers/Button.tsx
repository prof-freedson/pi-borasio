import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
