import React, { useCallback, useState } from "react";
import Tooltip from ".";
import { InteractiveDocsPage } from "../../../.storybook/interactive-docs-page";
import Badge from "../badge";
import { component } from "./docs";

export const Factory = {
	render: ( args ) => {
		const [ isVisible, setIsVisible ] = useState( false );
		const handleMouseEnter = useCallback( () => setIsVisible( true ), [ setIsVisible ] );
		const handleMouseLeave = useCallback( () => setIsVisible( false ), [ setIsVisible ] );

		return (
			// The yst-my-6 class gives more space within the Storybook container, allowing the tooltip to be visible.
			// The flex classes are to position the trigger element in the center of the container.
			<div className="yst-my-6 yst-flex yst-justify-center">
				<Badge
					as="button"
					variant="plain"
					aria-describedby={ args.id }
					onMouseEnter={ handleMouseEnter }
					onMouseLeave={ handleMouseLeave }
					// The parent element nesting the tooltip should have a relative position.
					className="yst-relative"
				>Hover me
					<Tooltip { ...args } isVisible={ isVisible } />
				</Badge>
			</div>
		);
	},
	parameters: {
		controls: { disable: false },
	},
	args: {
		id: "id-1",
		children: "I'm a tooltip",
	},
};

export default {
	title: "1) Elements/Tooltip",
	component: Tooltip,
	argTypes: {
		as: { options: [ "div", "span" ] },
	},
	parameters: {
		docs: {
			description: { component },
			page: InteractiveDocsPage,
		},
	},
};
