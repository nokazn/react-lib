import type { ComponentProps, ReactNode } from "react";

import { Template } from "./Template";
import { useAccordion } from "./hooks/useAccordion";

import type { Props as TemplateProps } from "./Template";
import type { Init } from "./hooks/useAccordion";

export type Props = Init &
	Pick<TemplateProps, "summary" | "content" | "initialOpen">;

export const Accordion = (props: Props) => {
	const { summary, content, initialOpen } = props;
	const { detailsRef, contentRef, onToggle } = useAccordion(props);
	return (
		<Template
			summary={summary}
			content={content}
			initialOpen={initialOpen}
			detailsRef={detailsRef}
			contentRef={contentRef}
			onToggle={onToggle}
		/>
	);
};
