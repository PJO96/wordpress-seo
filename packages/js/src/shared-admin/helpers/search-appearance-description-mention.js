import { useCallback, useState } from "@wordpress/element";
import PropTypes from "prop-types";
import { Root, Badge, Tooltip } from "@yoast/ui-library";
import { Fill } from "@wordpress/components";
import { get } from "lodash";
import { addFilter } from "@wordpress/hooks";
import { __, sprintf, _n } from "@wordpress/i18n";
import { select } from "@wordpress/data";

/**
 * Renders a badge with tooltip for mentions.
 * @param {string} mentionsName The name of the mentions.
 * @param {JSX.node} children The children of the tooltip.
 * @returns {JSX.Element} The badge with a tooltip.
 */
const MentionsWithTooltip = ( { mentionsName, children } ) => {
	const [ isVisible, setIsVisible ] = useState( false );
	const handleMouseEnter = useCallback(
		() => setIsVisible( true ),
		[ setIsVisible ]
	);
	const handleMouseLeave = useCallback(
		() => setIsVisible( false ),
		[ setIsVisible ]
	);
	return (
		<>
			<Badge
				variant="plain"
				className="yst-text-slate-500 yst-relative yst-cursor-pointer"
				aria-describedby={ Tooltip.id }
				onMouseEnter={ handleMouseEnter }
				onMouseLeave={ handleMouseLeave }
			>
				<span>{ mentionsName }</span>
				{ isVisible && (
					<Tooltip
						id={ Tooltip.id }
						className="yst--translate-x-10 yst-max-w-lg yst-text-xs"
					>
						{ children }
					</Tooltip>
				) }
			</Badge>
		</>
	);
};

/**
 * Define the component prop types.
*/
MentionsWithTooltip.propTypes = {
	mentionsName: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired,
};

/**
 * Adds the mentions.
 * @param {JSX.node[]} mentions The current mentions.
 * @param {string} fieldId The replacement variable editor's field ID.
 * @returns {JSX.node[]} The mentions.
 */
const filterReplacementVariableEditorMentions = ( mentions, { fieldId } ) => {
	const isRtl = get( window, "wpseoScriptData.metabox.isRtl", false );
	const getDate = select( "yoast-seo/editor" ).getDateFromSettings;
	const isProduct = select( "yoast-seo/editor" ).getIsProduct();
	const isPreviewField = fieldId === "yoast-google-preview-description-metabox" || fieldId === "yoast-google-preview-description-modal";
	const dateCharacters = getDate().length;
	const emDashCharacters = 3;
	const newMentions = [];
	if ( ! isProduct && isPreviewField ) {
		newMentions.push(
			<Fill
				name={ `yoast.replacementVariableEditor.additionalMentions.${fieldId}` }
			>
				<Root context={ { isRtl } }>
					<MentionsWithTooltip mentionsName={ __( "Date", "wordpress-seo" ) }>
						{ sprintf(
							/* translators: %s expands to the amount of characters */
							_n( "The 'Date' variable is fixed and adds %s character to the length of your meta description.", "The 'Date' variable is fixed and adds %s characters to the length of your meta description.", dateCharacters, "wordpress-seo" ), dateCharacters ) }
					</MentionsWithTooltip>
					&nbsp;
					<MentionsWithTooltip mentionsName={ "—" }>
						{ sprintf(
							/* translators: %s expands to the amount of characters */
							_n( "The em dash (—) is fixed and adds %s character to the length of your meta description.", "The em dash (—) is fixed and adds %s characters to the length of your meta description.", emDashCharacters, "wordpress-seo" ), emDashCharacters ) }
					</MentionsWithTooltip>
					&nbsp;
				</Root>
			</Fill>
		);
	}
	return [ ...mentions, ...newMentions ];
};

/**
 * Registers the search appearance description mention.
 * @returns {void}
 */
export const registerSearchAppearanceDescriptionMention = () => {
	addFilter(
		"yoast.replacementVariableEditor.additionalMentions",
		"yoast/yoast-seo/Mentions",
		filterReplacementVariableEditorMentions
	);
};
