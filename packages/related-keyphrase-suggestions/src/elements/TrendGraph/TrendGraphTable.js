import React from "react";
import PropTypes from "prop-types";
import { __ } from "@wordpress/i18n";

/**
 * Renders a table for an accessible representation of the SVG area chart.
 *
 * @param {array}    data                      Array of objects with X and Y coordinates for the SVG chart points.
 * @param {Function} mapChartDataToTableData   Function to adapt the chart points to meaningful data for the table.
 *
 * @returns {JSX.Element} The data table for the SVG area chart.
 */
const TrendGraphTable = ( {
	data,
} ) => {
	const dataTableHeaderLabels = [
		__( "Twelve months ago", "wordpress-seo" ),
		__( "Eleven months ago", "wordpress-seo" ),
		__( "Ten months ago", "wordpress-seo" ),
		__( "Nine months ago", "wordpress-seo" ),
		__( "Eight months ago", "wordpress-seo" ),
		__( "Seven months ago", "wordpress-seo" ),
		__( "Six months ago", "wordpress-seo" ),
		__( "Five months ago", "wordpress-seo" ),
		__( "Four months ago", "wordpress-seo" ),
		__( "Three months ago", "wordpress-seo" ),
		__( "Two months ago", "wordpress-seo" ),
		__( "Last month", "wordpress-seo" ),
	];

	/**
	 * Adapts the chart y axis data to a more meaningful format for the alternative representation in the data table.
	 *
	 * @param {number} y The raw y axis data of the chart.
	 *
	 * @returns {number} The formatted y axis data.
	 */
	const mapChartDataToTableData = ( y ) => {
		return Math.round( y * 100 );
	};

	if ( data.length !== dataTableHeaderLabels.length ) {
		return <p>{ __( "The number of headers and header labels don't match.", "wordpress-seo" ) }</p>;
	}

	return (
		<div
			className="yst-absolute yst-border-0 yst-h-0 yst-overflow-hidden yst-w-0 yst-p-0"
		>
			<table>
				<caption>{ __( "Keyphrase volume in the last 12 months on a scale from 0 to 100.", "wordpress-seo" ) }</caption>
				<thead>
					<tr>
						{
							dataTableHeaderLabels.map( ( label, index ) => {
								return <th key={ index }>{ label }</th>;
							} )
						}
					</tr>
				</thead>
				<tbody>
					<tr>
						{
							data.map( ( point, index ) => {
								return <td key={ index }>{ mapChartDataToTableData( point ) }</td>;
							} )
						}
					</tr>
				</tbody>
			</table>
		</div>
	);
};

TrendGraphTable.propTypes = {
	data: PropTypes.arrayOf( PropTypes.number ).isRequired,
};


export default TrendGraphTable;