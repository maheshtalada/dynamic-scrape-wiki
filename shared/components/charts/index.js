import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ChartOptions from './chart-config-options';
//var
var merge = require('deepmerge');

export default class Chart extends Component {

	static propTypes = {
		graphType : PropTypes.string.required,
		data : PropTypes.object.required,
		width : PropTypes.string,
		height : PropTypes.string,
		options : PropTypes.object
	};

	static defaultProps = {
		width : 'inherit',
		height : '280px',
		options : {}
	};

	constructor(props) {
		super(props);
		this.Charts = undefined;
	}

	async componentDidMount() {
		if (!this.Charts) {
			try {
				const ChartMain = await import(/* webpackChunkName: "ChartComponent" */ './ChartComponent');
				this.Charts={};
				this.Charts['Pie'] = ChartMain.Pie;
				this.Charts['LineWithLayer'] = ChartMain.Line;
				this.Charts['LineWithoutLayer'] = ChartMain.Line;
				this.Charts['Bar'] = ChartMain.Bar;
				this.Charts['MultiAxisBar'] = ChartMain.Bar;
				this.Charts['StackedBar'] = ChartMain.Bar;
				this.Charts['HorizontalBar'] = ChartMain.HorizontalBar;
				this.Charts['Doughnut'] = ChartMain.Doughnut;
				ChartMain.Chart.helpers.merge(ChartMain.Chart.defaults.global, {
					maintainAspectRatio: false,
					layout: {
						padding: {
							top : 12
						}
					},
					elements: {
						line: {
							fill: false
						},
						point: {
							hoverRadius: 7,
							radius: 5
						}
					}
				});
				this.forceUpdate();
			} catch (err) {
				console.log('Problem loading charts library', err);
			}

		}
	}


	renderChart() {
		const  { data, graphType, options, title, isEnlargeRequired, enlargeChartTitle } = this.props;
		const graph = ChartOptions.getOption(graphType);
		const Chart = this.Charts && this.Charts[graph] || '';
		delete data.options;
		return (
			Chart ? <Chart
				isEnlargeRequired={isEnlargeRequired}
				data={data}
				title={title}
				chartTitle={enlargeChartTitle || title}
				options={merge(ChartOptions[graph],options) }
			/> : null
		);
	}

	render() {
		const  { width, height } = this.props;
		return (
			<div className="charts" style={{ width  , height}}>
				{this.renderChart()}
			</div>
		);

	}
}


