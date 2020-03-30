import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import { isEqual, find } from 'lodash';
import 'chartjs-plugin-datalabels';
import Cx from 'classnames';
//import 'chartjs-plugin-piechart-outlabels';

/* Inspired by react-charts-v2 */

class ChartComponent extends Component {
	static getLabelAsKey = d => d.label;

	static propTypes = {
		data: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.func
		]).isRequired,
		getDatasetAtEvent: PropTypes.func,
		getElementAtEvent: PropTypes.func,
		getElementsAtEvent: PropTypes.func,
		height: PropTypes.number,
		legend: PropTypes.object,
		onElementsClick: PropTypes.func,
		options: PropTypes.object,
		plugins: PropTypes.arrayOf(PropTypes.object),
		redraw: PropTypes.bool,
		type: function(props, propName, componentName) {
			if(!Chart.controllers[props[propName]]) {
				return new Error(
					'Invalid chart type `' + props[propName] + '` supplied to' +
					' `' + componentName + '`.'
				);
			}
		},
		width: PropTypes.number,
		datasetKeyProvider: PropTypes.func,
		isEnlargeRequired: PropTypes.bool
	}

	static defaultProps = {
		legend: {
			display: true,
			position: 'bottom'
		},
		type: 'doughnut',
		height: 150,
		width: 300,
		redraw: false,
		options: {},
		datasetKeyProvider: ChartComponent.getLabelAsKey,
		isEnlargeRequired: true
	}

	componentWillMount() {
		this.chart_instance = undefined;
	}

	componentDidMount() {
		this.renderChart();
		// if(this.props.isEnlargeRequired) {
		// 	this.chartEnlargeMask.addEventListener('click',this.enLarge,false);
		// }
	}

	componentDidUpdate() {
		if (this.props.redraw) {
			this.chart_instance.destroy();
			this.renderChart();
			return;
		}

		this.updateChart();
	}

	shouldComponentUpdate(nextProps) {
		const {
			redraw,
			type,
			options,
			plugins,
			legend,
			height,
			width
		} = this.props;

		if (nextProps.redraw === true) {
			return true;
		}

		if (height !== nextProps.height || width !== nextProps.width) {
			return true;
		}

		if (type !== nextProps.type) {
			return true;
		}

		if (!isEqual(legend, nextProps.legend)) {
			return true;
		}

		if (!isEqual(options, nextProps.options)) {
			return true;
		}

		const nextData = this.transformDataProp(nextProps);

		if( !isEqual(this.shadowDataProp, nextData)) {
			return true;
		}

		return !isEqual(plugins, nextProps.plugins);


	}

	componentWillUnmount() {
		this.chart_instance.destroy();
	}

	transformDataProp(props) {
		const { data } = props;
		if (typeof(data) == 'function') {
			const node = this.element;
			return data(node);
		} else {
			return data;
		}
	}

	// Chart.js directly mutates the data.dataset objects by adding _meta proprerty
	// this makes impossible to compare the current and next data changes
	// therefore we memoize the data prop while sending a fake to Chart.js for mutation.
	// see https://github.com/chartjs/Chart.js/blob/master/src/core/core.controller.js#L615-L617
	memoizeDataProps() {
		if (!this.props.data) {
			return;
		}

		const data = this.transformDataProp(this.props);

		this.shadowDataProp = {
			...data,
			datasets: data.datasets && data.datasets.map(set => {
				return {
					...set
				};
			})
		};

		return data;
	}

	updateChart() {
		const {options} = this.props;

		const data = this.memoizeDataProps(this.props);

		if (!this.chart_instance) return;

		if (options) {
			this.chart_instance.options = Chart.helpers.configMerge(this.chart_instance.options, options);
		}

		// Pipe datasets to chart instance datasets enabling
		// seamless transitions
		let currentDatasets = (this.chart_instance.config.data && this.chart_instance.config.data.datasets) || [];
		const nextDatasets = data.datasets || [];

		// use the key provider to work out which series have been added/removed/changed
		const currentDatasetKeys = currentDatasets.map(this.props.datasetKeyProvider);
		const nextDatasetKeys = nextDatasets.map(this.props.datasetKeyProvider);
		const newDatasets = nextDatasets.filter(d => currentDatasetKeys.indexOf(this.props.datasetKeyProvider(d)) === -1);

		// process the updates (via a reverse for loop so we can safely splice deleted datasets out of the array
		for (let idx = currentDatasets.length - 1; idx >= 0; idx -= 1) {
			const currentDatasetKey = this.props.datasetKeyProvider(currentDatasets[idx]);
			if (nextDatasetKeys.indexOf(currentDatasetKey) === -1) {
				// deleted series
				currentDatasets.splice(idx, 1);
			} else {
				const retainedDataset = find(nextDatasets, d => this.props.datasetKeyProvider(d) === currentDatasetKey);
				if (retainedDataset) {
					// update it in place if it is a retained dataset
					currentDatasets[idx].data.splice(retainedDataset.data.length);
					retainedDataset.data.forEach((point, pid) => {
						currentDatasets[idx].data[pid] = retainedDataset.data[pid];
					});
					const {data, ...otherProps} = retainedDataset;
					currentDatasets[idx] = {
						data: currentDatasets[idx].data,
						...currentDatasets[idx],
						...otherProps
					};
				}
			}
		}
		// finally add any new series
		newDatasets.forEach(d => currentDatasets.push(d));
		const { datasets, ...rest } = data;

		this.chart_instance.config.data = {
			...this.chart_instance.config.data,
			...rest
		};

		this.chart_instance.update();
	}

	renderChart() {
		const {options, legend, type, redraw, plugins} = this.props;
		const node = this.element;
		const data = this.memoizeDataProps();

		if(typeof legend !== 'undefined' && !isEqual(ChartComponent.defaultProps.legend, legend)) {
			options.legend = legend;
		}
		this.chart_instance = new Chart(node, {
			type,
			data,
			options,
			plugins
		});
	}

	handleOnClick = (event) => {
		const instance = this.chart_instance;

		const {
			getDatasetAtEvent,
			getElementAtEvent,
			getElementsAtEvent,
			onElementsClick
		} = this.props;

		getDatasetAtEvent && getDatasetAtEvent(instance.getDatasetAtEvent(event), event);
		getElementAtEvent && getElementAtEvent(instance.getElementAtEvent(event), event);
		getElementsAtEvent && getElementsAtEvent(instance.getElementsAtEvent(event), event);
		onElementsClick && onElementsClick(instance.getElementsAtEvent(event), event); // Backward compatibility
	}

	ref = (element) => {
		this.element = element
	}

	onKeyUp = (e) => {
		if(e.keyCode !== 27) {
			return;
		}
		this.removeEnlarge();
	}

	onChartMaskClick = (e) => {
		if(e.target === e.currentTarget) {
			this.removeEnlarge();
		}
	}

	enLarge = () => {
		document.addEventListener("keyup", this.onKeyUp, false);
		document.body.classList.add('enlarge-graph');
		this.chartEnlargeMask.classList.add('enlarge');
		this.chartEnlargeMask.addEventListener('click',this.onChartMaskClick,false);
	}

	removeEnlarge = () => {
		document.removeEventListener("keyup", this.onKeyUp, false);
		document.body.classList.remove('enlarge-graph');
		this.chartEnlargeMask.classList.remove('enlarge');
		this.chartEnlargeMask.removeEventListener('click',this.onChartMaskClick,false);
	}

	render() {
		const {height, width, onElementsClick, chartTitle, isEnlargeRequired, title} = this.props;
		return (
			<Fragment>
				{title && 
					<h1 className="charts__title"><span>{title}</span>
						{isEnlargeRequired && <button data-html2canvas-ignore="true" className="zoom-btn zoom-in print-hide" title={'Enlarge'} onClick={()=>this.enLarge()}><i className="font-bold pe-7s-zoom-in"/> </button>}
					</h1>}
				<div className={Cx("graph-mask",{'enlarge-required': isEnlargeRequired})} ref={ref => this.chartEnlargeMask = ref}>
					<div className="chart-container">
						<div className="chart-container__header-wrap">
							{chartTitle ? <h1 className="charts__title">{chartTitle}</h1> : <div></div>}
							<button className="zoom-btn zoom-out" onClick={this.removeEnlarge}><i className="font-bold pe-7s-close-3"/></button>
						</div>
						<canvas
							ref={this.ref}
							height={height}
							width={width}
							onClick={this.handleOnClick}
						/>
					</div>
					{!title && isEnlargeRequired && <button data-html2canvas-ignore="true" className="zoom-btn zoom-in canvas-position" title={'Enlarge'} onClick={()=>this.enLarge()}><i className="font-bold pe-7s-zoom-in"/> </button>}
				</div>
			</Fragment>
		);

	}
}

export default ChartComponent;

export class Pie extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='pie'
			/>
		);
	}
}

export class Line extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='line'
			/>
		);
	}
}

export class Doughnut extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='doughnut'
			/>
		);
	}
}

export class Bar extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='bar'
			/>
		);
	}
}

export class HorizontalBar extends React.Component {
	render() {
		return (
			<ChartComponent
				{...this.props}
				ref={ref => this.chart_instance = ref && ref.chart_instance}
				type='horizontalBar'
			/>
		);
	}
}


/*const MODEL_KEY = '$datalabels';

Chart.plugins.register({
	id: 'datalabels',

	afterDatasetUpdate: function(chart, args, options) {
		var dataset = chart.data.datasets[args.index];
		var config = configure(dataset, options);
		var display = config && config.display;
		var elements = args.meta.data || [];
		var ilen = elements.length;
		var ctx = chart.ctx;
		var i, el;

		ctx.save();

		for (i = 0; i < ilen; ++i) {
			el = elements[i];
			el[MODEL_KEY] = display && el && !el.hidden ?
				modelize(el, i, ctx, config, {
					chart: chart,
					dataIndex: i,
					dataset: dataset,
					datasetIndex: args.index
				}) :
				null;
		}

		ctx.restore();
	},

	afterDatasetDraw: function(chart, args) {
		var elements = args.meta.data || [];
		var ilen = elements.length;
		var ctx = chart.ctx;
		var i, el, model, center, rects;

		for (i = 0; i < ilen; ++i) {
			el = elements[i];
			model = el[MODEL_KEY];
			if (!model) {
				continue;
			}

			center = coordinates(el, model);
			rects = boundingRects(model.size, model.padding);

			ctx.save();
			ctx.translate(Math.round(center.x), Math.round(center.y));
			ctx.rotate(model.rotation);

			drawFrame(ctx, rects.frame, model);
			drawText(ctx, model.lines, rects.text, model);

			ctx.restore();
		}
	}
});
/!*
Chart.plugins.register({
	beforeInit: function(chartInstance) {
		chartInstance.pieceLabel = new PieceLabel();
	},
	beforeDatasetsUpdate: function (chartInstance) {
		chartInstance.pieceLabel.beforeDatasetsUpdate(chartInstance);
	},
	afterDatasetsDraw: function (chartInstance) {
		chartInstance.pieceLabel.afterDatasetsDraw(chartInstance);
	}
});*/
export const defaults = Chart.defaults;
export {Chart};





