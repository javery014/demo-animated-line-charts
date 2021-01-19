import React from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  outer: {
    height: 0,
    position: 'relative',
    overflow: 'hidden'
  },
  inner: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    right: 0
  },
  element: {
    width: '100%',
    height: '100%'
  }
});


type IFixedAspectRatioContainerProps = {
  className: string;
  ratio: string;
}

// This component is used to produce a fixed aspect ratio for content. This is used for
// blog post images which might not intrinsically all have the same dimensions, but
// need to be displayed as if they do. This is inspired by: https://css-tricks.com/aspect-ratio-boxes/
export const FixedAspectRatioContainer: React.FunctionComponent<IFixedAspectRatioContainerProps> = ({ children, className, ratio }) => {
  const theme = useTheme();
  const styles = useStyles({ theme });
  
  return (
    <div className={`${styles.outer} ${className}`} style={{ paddingBottom: ratio }}>
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  )
};

type IFixedAspectRatioElementProps = {
  alt?: string;
  el?: any;
}

export const FixedAspectRatioElement: React.FunctionComponent<IFixedAspectRatioElementProps> = ({ alt, el, ...rest }) => {
  const theme = useTheme();
  const styles = useStyles({ theme });
  const El = el || 'img';
  
  return (
    <El className={styles.element} alt={alt} {...rest} />
  );
}

