import type { ReactNode, MouseEventHandler, RefObject } from 'react';

export type Props = {
  summary: ReactNode;
  content: ReactNode;
  detailsRef: RefObject<HTMLDetailsElement>;
  contentRef: RefObject<HTMLDivElement>;
  initialOpen?: boolean | undefined;
  onToggle: MouseEventHandler<HTMLDetailsElement>;
};

export const Template = (props: Props) => {
  return (
    <details
      open={props.initialOpen}
      ref={props.detailsRef}
      style={{
        overflowY: 'hidden',
      }}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <summary
        onClick={props.onToggle}
        style={{
          cursor: 'pointer',
          display: 'block',
          // TODO: safariの-webkit-details-markerを削除
        }}
      >
        {props.summary}
      </summary>
      <div ref={props.contentRef}>{props.content}</div>
    </details>
  );
};
