import { inherits } from "util";

import Assessor from "../../assessor.js";
import IntroductionKeywordAssessment from "../../../assessments/seo/IntroductionKeywordAssessment.js";
import KeyphraseLengthAssessment from "../../../assessments/seo/KeyphraseLengthAssessment.js";
import KeyphraseDensityAssessment from "../../../assessments/seo/KeywordDensityAssessment.js";
import MetaDescriptionKeywordAssessment from "../../../assessments/seo/MetaDescriptionKeywordAssessment.js";
import TextCompetingLinksAssessment from "../../../assessments/seo/TextCompetingLinksAssessment.js";
import FunctionWordsInKeyphraseAssessment from "../../../assessments/seo/FunctionWordsInKeyphraseAssessment.js";
import ImageKeyphraseAssessment from "../../../assessments/seo/KeyphraseInImageTextAssessment.js";

import { createAnchorOpeningTag } from "../../../../helpers";

/**
 * Creates the Assessor
 *
 * @param {Researcher} researcher   The researcher to use for the analysis.
 * @param {Object?} options         The options for this assessor.
 *
 * @constructor
 */
const ProductCornerStoneRelatedKeywordAssessor = function( researcher, options ) {
	Assessor.call( this, researcher, options );
	this.type = "productPageCornerstoneRelatedKeywordAssessor";

	this._assessments = [
		new IntroductionKeywordAssessment( {
			urlTitle: createAnchorOpeningTag( options.introductionKeyphraseUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.introductionKeyphraseCTAUrl ),
		} ),
		new KeyphraseLengthAssessment( {
			parameters: {
				recommendedMinimum: 4,
				recommendedMaximum: 6,
				acceptableMaximum: 8,
				acceptableMinimum: 2,
			},
			isRelatedKeyphrase: true,
			urlTitle: createAnchorOpeningTag( options.keyphraseLengthUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.keyphraseLengthCTAUrl ),
		}, true ),
		new KeyphraseDensityAssessment( {
			urlTitle: createAnchorOpeningTag( options.keyphraseDensityUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.keyphraseDensityCTAUrl ),
		} ),
		new MetaDescriptionKeywordAssessment( {
			urlTitle: createAnchorOpeningTag( options.metaDescriptionKeyphraseUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.metaDescriptionKeyphraseCTAUrl ),
		} ),
		new TextCompetingLinksAssessment( {
			urlTitle: createAnchorOpeningTag( options.textCompetingLinksUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.textCompetingLinksCTAUrl ),
		} ),
		new FunctionWordsInKeyphraseAssessment( {
			urlTitle: createAnchorOpeningTag( options.functionWordsInKeyphraseUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.functionWordsInKeyphraseCTAUrl ),
		} ),
		new ImageKeyphraseAssessment( {
			scores: {
				withAltNonKeyword: 3,
				withAlt: 3,
				noAlt: 3,
			},
			urlTitle: createAnchorOpeningTag( options.imageKeyphraseUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.imageKeyphraseCTAUrl ),
		} ),
	];
};

inherits( ProductCornerStoneRelatedKeywordAssessor, Assessor );

export default ProductCornerStoneRelatedKeywordAssessor;
