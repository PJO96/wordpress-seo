import { select } from "@wordpress/data";
import { STORE } from "../../constants";

/**
 * Retrieve twitter image id.
 * @returns {integer} The twitter image id.
 */
export const getTwitterImageId = () => select( STORE )?.getTwitterImageId();

/**
 * Get twitter title.
 * @returns {string} The twitter title.
 */
export const getTwitterTitle = () => select( STORE )?.getTwitterTitle();

/**
 * Get twitter description.
 * @returns {string} The twitter description.
 */
export const getTwitterDescription = () => select( STORE )?.getTwitterDescription();

/**
 * Get twitter image Url.
 * @returns {string} The twitter image Url.
 */
export const getTwitterImageUrl = () => select( STORE )?.getTwitterImageUrl();

