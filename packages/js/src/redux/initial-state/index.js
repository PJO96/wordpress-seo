import get from "lodash/get";
import { facebookInitialState, twitterInitialState } from "./socialAppearance";
import { advancedSettingsInitialState } from "./advancedSettings";
export * from "./socialAppearance";
import primaryTaxonomies from "./primaryTaxonomies";
import schemaTab from "./schemaTab";

const initialState = {
	facebookEditor: facebookInitialState,
	twitterEditor: twitterInitialState,
	advancedSettings: advancedSettingsInitialState,
	focusKeyword: get( window, "wpseoScriptData.metabox.metadata.focuskw", "" ),
	// This used to be a checkbox, then became a hidden input. For consistency, we set the value to '1'.
	isCornerstone: get( window, "wpseoScriptData.metabox.metadata.is_cornerstone", 0 ) === "1",
	primaryTaxonomies,
	schemaTab,
	post: {
		isPost: get( window, "wpseoScriptData.isPost", false ),
		id: Number( get( window, "wpseoScriptData.postId", null ) ),
	},
};

export default initialState;