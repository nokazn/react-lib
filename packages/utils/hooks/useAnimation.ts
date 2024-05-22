import { useState } from 'react';

export type SetAnimationInit = {
  getAnimation: () => Animation;
  onBeforeStart?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
};

export const useAnimation = (initialAnimation?: Animation) => {
  const [_, setAnimation] = useState(initialAnimation);
  return {
    setAnimation: (init: SetAnimationInit) => {
      const { onBeforeStart, onFinish, onCancel, getAnimation } = init;
      setAnimation((previous) => {
        if (previous?.playState === 'running') {
          previous.cancel();
        }
        onBeforeStart?.();
        const current = getAnimation();
        console.log('start');
        current.play();
        current.addEventListener('finish', () => {
          if (onFinish) {
            onFinish();
          }
          console.log('finished');
        });
        current.addEventListener('cancel', () => {
          console.log('canceled');
          if (onCancel) {
            onCancel();
          }
        });
        return current;
      });
    },
  };
};
