import { useRef, useState } from 'react';

import { useAnimation } from '@react-lib/utils';

import type { Props } from '../Template.js';

type KeyFramesInit = {
  isOpened: boolean;
  content: HTMLElement;
};

const computeKeyframes = (init: KeyFramesInit): Keyframe[] => {
  const { isOpened: previous, content } = init;
  const contentHeight = content.offsetHeight;
  const openedStyle = { height: `${contentHeight}px` };
  const closedStyle = { height: 0 };
  console.log({ openedStyle, closedStyle });
  return previous ? [openedStyle, closedStyle] : [closedStyle, openedStyle];
};

const DEFAULT_ANIMATION_OPTIONS = {
  duration: 500,
  easing: 'ease-out',
} as const satisfies KeyframeAnimationOptions;

const OPEN_ATTRIBUTE = 'open';

export type Init = {
  initialOpen?: boolean;
  animationOptions?: KeyframeAnimationOptions;
};

type ReturnType = Pick<Props, 'detailsRef' | 'contentRef' | 'onToggle'>;

export const useAccordion = (init: Init): ReturnType => {
  const initialOpen = init.initialOpen ?? false;
  const [isOpened, setIsOpened] = useState(initialOpen);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { setAnimation } = useAnimation();

  const onToggle: ReturnType['onToggle'] = (event) => {
    const details = detailsRef.current;
    const content = contentRef.current;
    if (details == null || content == null) {
      return;
    }

    event.preventDefault();
    setIsOpened(!isOpened);

    const getAnimation = () =>
      new Animation(
        new KeyframeEffect(content, computeKeyframes({ isOpened: isOpened, content }), {
          ...DEFAULT_ANIMATION_OPTIONS,
          ...init.animationOptions,
        }),
      );
    if (isOpened) {
      setAnimation({
        getAnimation,
        onFinish: () => {
          detailsRef.current?.removeAttribute(OPEN_ATTRIBUTE);
        },
      });
    } else {
      setAnimation({
        getAnimation,
        onBeforeStart: () => {
          detailsRef.current?.setAttribute(OPEN_ATTRIBUTE, 'true');
        },
      });
    }
  };

  return {
    detailsRef,
    contentRef,
    onToggle,
  };
};
