import React from 'react';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  tag: {
    display: 'block',
    fontSize: '1.1rem',
    letterSpacing: '.15rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
});

const Tag = ({ children, className, ...rest }) => {
  const styles = useStyles();
  return <span className={`${styles.tag} ${className}`} {...rest}>{children}</span>
}

Tag.defaultProps = {
  className: ''
};

export default Tag;