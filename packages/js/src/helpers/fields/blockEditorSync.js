
import { dispatch, select, subscribe } from "@wordpress/data";
import { debounce, forEach, pickBy } from "lodash";
import createWatcher, { createCollectorFromObject } from "../../helpers/create-watcher";
import { STORE, CORE_EDITOR_STORE, SYNC_TIME, METADATA_IDS } from "../../constants";
import { getFacebookImageId, getFacebookTitle, getFacebookDescription, getFacebookImageUrl } from "./facebookFieldsStore";
import { getTwitterImageId, getTwitterTitle, getTwitterDescription, getTwitterImageUrl } from "./twitterFieldsStore";
import { getPageType, getArticleType } from "./schemaFieldsStore";
import { getFocusKeyphrase, isCornerstoneContent, getReadabilityScore, getSeoScore, getInclusiveLanguageScore } from "./analysisFieldsStore";
import { getNoIndex, getNoFollow, getAdvanced, getBreadcrumbsTitle, getCanonical, getWordProofTimestamp } from "./advancedFieldsStore";

/**
 * Retrieves the no index value.
 *
 * @returns {integer} The no index value.
 */
const getPrimaryCategoryId = () => String( select( STORE )?.getPrimaryTaxonomyId( "category" ) );


/**
 * Creates an updater.
 * @returns {function} The updater.
 */
const createUpdater = () => {
	const { editPost } = dispatch( CORE_EDITOR_STORE );

	/**
	 * Syncs the data to the WP entity record.
	 * @param {Object} data The collected data.
	 * @returns {void}
	 */
	return ( data ) => {
		// Unfortunately, we need to pass the full metadata to update a part of it.
		const metadata = select( CORE_EDITOR_STORE ).getCurrentPost().meta;

		if ( ! metadata || ! data ) {
			return;
		}
		console.log( { data } );
		console.log( { metadata } );

		const changedData = pickBy( data, ( value, key ) => value !== metadata[ METADATA_IDS[ key ] ] );
		console.log( { changedData } );

		if ( changedData ) {
			const newMetadata = {};
			forEach( changedData, ( value, key ) => {
				newMetadata[ METADATA_IDS[ key ] ] = String( value );
			} );

			editPost( {
				meta: newMetadata,
			} );
		}
	};
};

/**
 * Initializes the sync: from Yoast editor store to product metadata.
 * @returns {function} The un-subscriber.
 */
export const blockEditorSync = () => {
	return subscribe( debounce( createWatcher(
		createCollectorFromObject( {
			focusKeyphrase: getFocusKeyphrase,
			noIndex: getNoIndex,
			noFollow: getNoFollow,
			primaryCategory: getPrimaryCategoryId,
			facebookTitle: getFacebookTitle,
			facebookDescription: getFacebookDescription,
			facebookImageUrl: getFacebookImageUrl,
			facebookImageId: getFacebookImageId,
			twitterTitle: getTwitterTitle,
			twitterDescription: getTwitterDescription,
			twitterImageUrl: getTwitterImageUrl,
			twitterImageId: getTwitterImageId,
			pageType: getPageType,
			articleType: getArticleType,
			isCornerstone: isCornerstoneContent,
			readabilityScore: getReadabilityScore,
			seoScore: getSeoScore,
			inclusiveLanguageScore: getInclusiveLanguageScore,
			advanced: getAdvanced,
			breadcrumbsTitle: getBreadcrumbsTitle,
			canonical: getCanonical,
			wordProofTimestamp: getWordProofTimestamp,

		} ),
		createUpdater()
	), SYNC_TIME.wait, { maxWait: SYNC_TIME.max } ), STORE );
};
