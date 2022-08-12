import PropTypes from "prop-types";

import { __, sprintf } from "@wordpress/i18n";

import IndexablesPageCard from "./indexables-card";
import { useState, useCallback } from "@wordpress/element";
import { Button, Link } from "@yoast/ui-library";
import { IndexableLinkCount } from "../indexables-page";

/**
 * Renders the four indexable tables.
 *
 * @returns {WPElement} A div containing the empty state page.
 */
const NotEnoughAnalysedContent = ( { indexablesList, seoEnabled } ) => {
	const [ step, setStep ] = useState( 5 );
	const [ numberOfVisibleIndexables, setNumberOfVisibleIndexables ] = useState( step );

	const handleShowMore = useCallback( ( e ) => {
		e.preventDefault();
		const number = numberOfVisibleIndexables + step > indexablesList.length ? indexablesList.length : numberOfVisibleIndexables + step;
		const newStep = indexablesList.length - number > step ? step :  indexablesList.length - number;
		setNumberOfVisibleIndexables( number );
		setStep( newStep );
	}, [ numberOfVisibleIndexables, setNumberOfVisibleIndexables ] );

	return <div className="yst-max-w-full yst-mt-6">
		<div
			id="start-writing-content"
			className="yst-max-w-2xl"
		>
			<IndexablesPageCard
				title={
					/* translators: %1$s expands to the number of posts without a focus keyphrase */
					sprintf(
						__(
							"Posts without a focus keyphrase (%1$s)",
							"wordpress-seo"
						),
						indexablesList.length
					)
				}
			>
				{
					! seoEnabled && <p>{ __( "Most of your post haven't been analyzed yet. Help us to analyze your content by opening and updating your posts. Clicking the 'Open editor' button will open the post editor in a new browser tab. Make sure to click 'Update' at the top of that page.", "wordpress-seo" ) }</p>
				}
				<ul className="yst-divide-y yst-divide-gray-200">
					{ indexablesList.slice( 0, numberOfVisibleIndexables ).map(
						( indexable, index ) => {
							return <li
								key={ `article-${ index }-li` }
								className={ "yst-my-0 yst-max-w-none yst-font-medium yst-text-gray-700 yst-flex yst-flex-row yst-items-center yst-h-14 last:yst-border-b-gray-200 last:border-b-1" }
							>
								<IndexableLinkCount key={ `no-keyphrase-indexable-${ indexable.id }` } count={ parseInt( indexable.incoming_link_count, 10 ) } />
								<span className="yst-min-w-0 yst-rounded-md yst-flex yst-items-center yst-gap-2 yst-no-underline yst-text-inherit yst-grow">
									<span className="yst-text-ellipsis yst-whitespace-nowrap yst-overflow-hidden">{ indexable.breadcrumb_title }</span>
								</span>
								<Button
									as="a"
									type="button"
									href={ "/wp-admin/post.php?action=edit&post=" + indexable.object_id }
									target="_blank"
									rel="noopener noreferrer"
									variant="secondary"
									className="yst-button yst-button--secondary yst-text-gray-700 yst-shrink-0"
								>
									{ seoEnabled ? __( "Add focus keyphrase", "wordpress-seo" ) : __( "Open editor", "wordpress-seo" ) }
								</Button>
							</li>;
						}
					)
					}
				</ul>
				{
					( numberOfVisibleIndexables < indexablesList.length ) &&
					<div className="yst-flex yst-justify-center">
						<Link as="button" onClick={ handleShowMore }>
							{
								/* translators: %1$s expands to the step value (i.e. the number of posts to be added to the visible list) */
								sprintf(
									__(
										"Show %1$s more...",
										"wordpress-seo"
									),
									step
								)
							}
						</Link>
					</div>
				}
			</IndexablesPageCard>
		</div>
	</div>;
};

NotEnoughAnalysedContent.propTypes = {
	indexablesList: PropTypes.arrayOf( PropTypes.object ).isRequired,
	seoEnabled: PropTypes.bool.isRequired,
};

export default NotEnoughAnalysedContent;