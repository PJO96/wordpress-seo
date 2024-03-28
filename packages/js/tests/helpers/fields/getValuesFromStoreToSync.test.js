import {
	getFacebookImageId,
	getFacebookTitle,
	getFacebookDescription,
	getFacebookImageUrl,
	getTwitterImageId,
	getTwitterTitle,
	getTwitterDescription,
	getTwitterImageUrl,
	getNoIndex,
	getNoFollow,
	getAdvanced,
	getBreadcrumbsTitle,
	getCanonical,
	getWordProofTimestamp,
} from "../../../src/helpers/fields";
import { EDITOR_STORE } from "../../../src/shared-admin/constants";
import { select } from "@wordpress/data";

// Tests for the facebookFieldsStore.js, twitterFieldsStore.js and adnacedSettingsFieldsStore.js files.

jest.mock( "@wordpress/data", () => ( {
	select: jest.fn(),
} ) );

const testCasesInteger = [
	{ method: "getFacebookImageId", getFunction: getFacebookImageId  },
	{ method: "getTwitterImageId", getFunction: getTwitterImageId },
	{ method: "getNoIndex", getFunction: getNoIndex  },
	{ method: "getNoFollow", getFunction: getNoFollow },
];

describe.each( testCasesInteger )( "$method", ( { method, getFunction } ) => {
	it( `should return string from ${method} when the value is an integer`, () => {
		select.mockImplementation( ( store ) => {
			if ( store === EDITOR_STORE ) {
				return {
					[ method ]: () => 5,
				};
			}
		} );

		const result = getFunction();
		expect( result ).toBe( "5" );
	  } );
} );


const testCases = [
	{ method: "getFacebookImageId", getFunction: getFacebookImageId  },
	{ method: "getFacebookTitle", getFunction: getFacebookTitle },
	{ method: "getFacebookDescription", getFunction: getFacebookDescription },
	{ method: "getFacebookImageUrl", getFunction: getFacebookImageUrl },
	{ method: "getTwitterImageId", getFunction: getTwitterImageId },
	{ method: "getTwitterTitle", getFunction: getTwitterTitle },
	{ method: "getTwitterDescription", getFunction: getTwitterDescription },
	{ method: "getTwitterImageUrl", getFunction: getTwitterImageUrl },
	{ method: "getAdvanced", getFunction: getAdvanced  },
	{ method: "getBreadcrumbsTitle", getFunction: getBreadcrumbsTitle },
	{ method: "getCanonical", getFunction: getCanonical },

];

describe.each( testCases )( "$method", ( { method, getFunction } ) => {
	it( `should return string from ${method} when value is string`, () => {
		select.mockImplementation( ( store ) => {
			  if ( store === EDITOR_STORE ) {
				  return {
					  [ method ]: () => "string_result",
				  };
			  }
		  } );

		  const result = getFunction();
		  expect( result ).toBe( "string_result" );
	  } );
} );


describe.each( testCases )( "$method", ( { method, getFunction } ) => {
	it( `should return empty string from ${method} when null`, () => {
	  select.mockImplementation( ( store ) => {
			if ( store === EDITOR_STORE ) {
				return {
					[ method ]: () => null,
				};
			}
		} );

		const result = getFunction();
		expect( result ).toBe( "" );
	} );
} );

describe.each( testCases )( "$method", ( { method, getFunction } ) => {
	it( `should return empty string from ${method} when undefined`, () => {
	  select.mockImplementation( ( store ) => {
			if ( store === EDITOR_STORE ) {
				return {
					[ method ]: () => undefined,
				};
			}
		} );

		const result = getFunction();
		expect( result ).toBe( "" );
	} );
} );

const testCasesWithDefaultZero = [
	{ method: "getNoIndex", getFunction: getNoIndex  },
	{ method: "getNoFollow", getFunction: getNoFollow },
];

describe.each( testCasesWithDefaultZero )( "$method", ( { method, getFunction } ) => {
	it( `should return zero string from ${method} when null`, () => {
	  select.mockImplementation( ( store ) => {
			if ( store === EDITOR_STORE ) {
				return {
					[ method ]: () => null,
				};
			}
		} );

		const result = getFunction();
		expect( result ).toBe( "0" );
	} );
} );

describe.each( testCasesWithDefaultZero )( "$method", ( { method, getFunction } ) => {
	it( `should return zero string from ${method} when null`, () => {
	  select.mockImplementation( ( store ) => {
			if ( store === EDITOR_STORE ) {
				return {
					[ method ]: () => undefined,
				};
			}
		} );

		const result = getFunction();
		expect( result ).toBe( "0" );
	} );
} );

describe( "getWordProofTimestamp", () => {
	it( "should return '1' when true", () => {
		select.mockImplementation( ( store ) => {
			if ( store === EDITOR_STORE ) {
				return {
					getWordProofTimestamp: () => true,
				};
			}
		} );

		const result = getWordProofTimestamp();
		expect( result ).toBe( "1" );
	} );
} );

const getWordProofTimestampTestCases = [
	{ value: true, expected: "1" },
	{ value: false, expected: "" },
	{ value: null, expected: "" },
	{ value: undefined, expected: "" },
];
describe.each( getWordProofTimestampTestCases )( "getWordProofTimestamp", ( { value, expected } ) => {
	it( `should return ${expected} from getWordProofTimestamp when value is ${value}`, () => {
	  select.mockImplementation( ( store ) => {
			if ( store === EDITOR_STORE ) {
				return {
					getWordProofTimestamp: () => value,
				};
			}
		} );

		const result = getWordProofTimestamp();
		expect( result ).toBe( expected );
	} );
} );


