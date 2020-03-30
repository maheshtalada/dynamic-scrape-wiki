import React , { Component } from 'react';
import PropTypes from 'prop-types';


window.chartColors = {
	red: '#0a9a8e',
	orange: '#16776e',
	yellow: '#306e78',
	green: '#1a445a',
	blue: '#00acdc',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};


const dataPie = {
	labels: [
		'Black',
		'Asian',
		'Hispanic',
		'German',
		'Russian'
	],
	datasets: [{
		data: [300, 50, 100, 200, 150],
		backgroundColor: [
			window.chartColors.red,
			window.chartColors.green,
			window.chartColors.orange,
			window.chartColors.yellow,
			window.chartColors.blue,
		],
		hoverBackgroundColor: [
			window.chartColors.red,
			window.chartColors.green,
			window.chartColors.orange,
			window.chartColors.yellow,
			window.chartColors.blue,
		],
		datalabels: {
			display:false
		}
	}]
};

const doughnut = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
			window.chartColors.red,
			window.chartColors.blue,
			window.chartColors.green
		],
		hoverBackgroundColor: [
			window.chartColors.red,
			window.chartColors.blue,
			window.chartColors.green
		],
		datalabels: {
			align: 'center',
			anchor: 'end'
		}
	}]
};


var lineData = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "Example dataset",
			backgroundColor: "rgba(98,203,49,0.5)",
			borderColor: "rgba(98,203,49,0.7)",
			borderWidth : 1,
			data: [16, 32, 18, 26, 42, 33, 44],
			fill : true,
			datalabels: {
				align: 'end',
				anchor: 'end'
			}
		},
		{
			label: "Example dataset",
			backgroundColor: "rgba(220,220,220,0.5)",
			borderColor: "rgba(220,220,220,1)",
			borderWidth : 1,
			data: [22, 44, 67, 43, 76, 45, 12],
			fill : true,
			datalabels: {
				align: 'end',
				anchor: 'end'
			}
		}
	]
};

var barChartData = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [{
		label: 'Dataset 1',
		backgroundColor: "rgba(98,203,49,0.5)",
		borderColor: "rgba(98,203,49,0.7)",
		borderWidth : 1,
		data: [
			23,
			40,
			99,
			22,
			23,
			92,
			56
		],
		datalabels: {
			align: 'end',
			anchor: 'start'
		}
	}]
};


var horizontalBarChartData = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [{
		label: 'Dataset 1',
		backgroundColor: "rgba(98,203,49,0.5)",
		borderColor: "rgba(98,203,49,0.7)",
		borderWidth : 1,
		data: [
			23,
			40,
			99,
			22,
			23,
			92,
			56
		],
		datalabels: {
			align: 'end',
			anchor: 'end'
		}
	}]
};

var multiAxisbarChartData = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [{
		label: 'Dataset 1',
		backgroundColor: "rgba(98,203,49,0.5)",
		borderColor: "rgba(98,203,49,0.7)",
		borderWidth : 1,
		yAxisID: "y-axis-1",
		data: [
			32,
			45,
			12,
			78,
			9,
			24,
			56
		],
		datalabels: {
			align: 'center',
			anchor: 'center'
		}
	}, {
		label: 'Dataset 2',
		backgroundColor: "rgba(220,220,220,0.5)",
		borderColor: "rgba(220,220,220,1)",
		borderWidth : 1,
		yAxisID: "y-axis-2",
		data: [
			82,
			35,
			92,
			38,
			91,
			21,
			26
		],
		datalabels: {
			align: 'center',
			anchor: 'center'
		}
	}]

};

var stackedBarGraph = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: 'red',
			backgroundColor: window.chartColors.red,
			data:[
				30,
				35,
				42,
				18,
				31,
				21,
				26
			],
			datalabels: {
				align: 'end',
				anchor: 'start'
			}
		}, {
			label: 'blue',
			backgroundColor: window.chartColors.blue,
			data:[
				40,
				15,
				42,
				18,
				61,
				11,
				26
			],
			datalabels: {
				align: 'center',
				anchor: 'center'
			}
		}, {
			label: 'green',
			backgroundColor: window.chartColors.green,
			data:[
				10,
				15,
				12,
				18,
				11,
				11,
				16
			],
			datalabels: {
				anchor: 'end',
				align: 'start',
			}
		}]

};

var linesData = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [{
		label : "green",
		backgroundColor: window.chartColors.green,
		borderColor: window.chartColors.green,
		data: [
			46,
			23,
			89,
			66,
			23,
			12,
			22
		],
		datalabels: {
			align: 'start',
			anchor: 'start'
		}
	}, {
		label : "blue",
		backgroundColor: window.chartColors.blue,
		borderColor: window.chartColors.blue,
		data: [
			16,
			43,
			19,
			66,
			33,
			62,
			22
		],
	}, {
		label : "red",
		backgroundColor: window.chartColors.red,
		borderColor: window.chartColors.red,
		data: [
			26,
			53,
			29,
			76,
			43,
			32,
			2
			],
		datalabels: {
			align: 'end',
			anchor: 'end'
		}
	}]
};




export default class SchemaGraphComponents extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);


		if (!frameworkGlobals.isServer) {
			// this.ReactQuill = require('react-quill')
			const ChartMain = require('../components/charts/ChartComponent');
			this.PieChart = ChartMain.Pie;
			this.LineChart = ChartMain.Line;
			this.BarChart = ChartMain.Bar;
			this.HorizontalBar = ChartMain.HorizontalBar;
			this.Doughnut = ChartMain.Doughnut;
			ChartMain.Chart.helpers.merge(ChartMain.Chart.defaults.global, {
				maintainAspectRatio: false,
				layout: {
					padding: 20
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
		}

	}

	enLarge() {

	}


	render() {
		const Pie =  !frameworkGlobals.isServer ? this.PieChart : '';
		const Line =  !frameworkGlobals.isServer ? this.LineChart : '';
		const Bar =  !frameworkGlobals.isServer ? this.BarChart : '';
		const HorizontalBar =  !frameworkGlobals.isServer ? this.HorizontalBar : '';
		const Doughnut =  !frameworkGlobals.isServer ? this.Doughnut : '';

		return (
			<div className="listing-financial-page" style={{'paddingTop' : '50px'}}>
				{/*<h2 className="test-chart-title">Pie Chart</h2>
				<div style={{width: '500px', height : '400px', float : 'left' , display : 'inline-bock'}}>
				{ !frameworkGlobals.isServer && <Pie
					data={dataPie}
					options = {{
						height : '100px',
						responsive: true,
						legend: {
							display: false
						},
						maintainAspectRatio: false
					}}
				/>}</div>
				<div className="json-pretty">
					<pre>{JSON.stringify(dataPie, undefined, 4)}</pre>
				</div>*/}
				<h2 className="test-chart-title">Line Chart with colored layer</h2>
				<div style={{paddingLeft : '30px',width: '500px', height : '400px',float : 'left' , display : 'inline-bock'}}>
						{ !frameworkGlobals.isServer && <Line
					data={lineData}
					options = {{
						plugins: {
							datalabels: {
								backgroundColor: function(context) {
									return context.dataset.backgroundColor;
								},
								borderRadius: 4,
								color: 'white',
								font: {
									weight: 'bold'
								},
								formatter: Math.round
							}
						},
						responsive: true,
						title:{
							display:true,
							text:'Chart.js Line Chart'
						},
						tooltips: {
							mode: 'index',
							intersect: false,
						},
						hover: {
							mode: 'nearest',
							intersect: false
						},
						scales: {
							xAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Month'
								}
							}],
							yAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Value'
								}
							}]
						}
					}}
				/>}
					</div>
			
				{/*<div className="json-pretty">
					<pre>{JSON.stringify(lineData, undefined, 4)}</pre>
				</div>
				<h2 className="test-chart-title">Bar Chart</h2>
				<div style={{paddingLeft : '30px',width: '500px', height : '400px',float : 'left' , display : 'inline-bock'}}>
					{ !frameworkGlobals.isServer && <Bar
						data={barChartData}
						options = {{
							plugins: {
								datalabels: {
									color: 'white',
									display: function(context) {
										return context.dataset.data[context.dataIndex] > 15;
									},
									font: {
										weight: 'bold'
									},
									formatter: Math.round
								}
							},
							scales: {
								xAxes: [{
									stacked: true
								}],
								yAxes: [{
									stacked: true
								}]
							}
						}}
					/>}</div>
				<div className="json-pretty">
					<pre>{JSON.stringify(barChartData, undefined, 4)}</pre>
				</div>
				<h2 className="test-chart-title">Horizontal Bar Chart</h2>
				<div style={{paddingLeft : '30px',width: '500px', height : '400px',float : 'left' , display : 'inline-bock'}}>
					{ !frameworkGlobals.isServer && <HorizontalBar
						data={horizontalBarChartData}
						options = {{
							plugins: {
								datalabels: {
									color: '#2C3E50',
									display: function(context) {
										return context.dataset.data[context.dataIndex] > 15;
									},
									font: {
										weight: 'bold'
									},
									formatter: Math.round
								}
							},
							scales: {
								xAxes: [{
									stacked: true
								}],
								yAxes: [{
									stacked: true
								}]
							}
						}}
					/>}</div>
				<div className="json-pretty">
					<pre>{JSON.stringify(horizontalBarChartData, undefined, 4)}</pre>
				</div>
				<h2 className="test-chart-title">MultiAxis Bar Chart</h2>
				<div style={{paddingLeft : '30px',width: '500px', height : '400px',float : 'left' , display : 'inline-bock'}}>
					{ !frameworkGlobals.isServer && <Bar
						data={multiAxisbarChartData}
						options = {{
							plugins: {
								datalabels: {
									color: 'white',
									display: function(context) {
										return context.dataset.data[context.dataIndex] > 15;
									},
									font: {
										weight: 'bold'
									},
									formatter: Math.round
								}
							},
							scales: {
								yAxes: [{
									type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
									display: true,
									position: "left",
									id: "y-axis-1",
								}, {
									type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
									display: true,
									position: "right",
									id: "y-axis-2",
									gridLines: {
										drawOnChartArea: false
									}
								}],
							}
						}}
					/>}</div>
				<div className="json-pretty">
					<pre>{JSON.stringify(multiAxisbarChartData, undefined, 4)}</pre>
				</div>
				<h2 className="test-chart-title">Stacked Bar Chart</h2>
				<div style={{paddingLeft : '30px',width: '500px', height : '400px',float : 'left' , display : 'inline-bock'}}>
					{ !frameworkGlobals.isServer && <Bar
						data={stackedBarGraph}
						options = {{
							plugins: {
								datalabels: {
									color: 'white',
									display: function(context) {
										return context.dataset.data[context.dataIndex] > 15;
									},
									font: {
										weight: 'bold'
									},
									formatter: Math.round
								}
							},
							scales: {
								xAxes: [{
									stacked: true
								}],
								yAxes: [{
									stacked: true
								}]
							}
						}}
					/>}</div>
				<div className="json-pretty">
					<pre>{JSON.stringify(stackedBarGraph, undefined, 4)}</pre>
				</div>
				<h2 className="test-chart-title">Lines Graph Time Line</h2>
				<div style={{paddingLeft : '30px',width: '500px', height : '400px',float : 'left' , display : 'inline-bock'}}>
					{ !frameworkGlobals.isServer && <Line
						data={linesData}
						options = {{
							plugins: {
								datalabels: {
									backgroundColor: function(context) {
										return context.dataset.backgroundColor;
									},
									borderRadius: 4,
									color: 'white',
									font: {
										weight: 'bold'
									},
									formatter: Math.round
								}
							},
							responsive: true,
							title:{
								display:true,
								text:'Chart.js Line Chart'
							},
							tooltips: {
								mode: 'index',
								intersect: false,
							},
							hover: {
								mode: 'nearest',
								intersect: true
							},
							scales: {
								xAxes: [{
									display: true,
									scaleLabel: {
										display: true,
										labelString: 'Month'
									}
								}],
								yAxes: [{
									display: true,
									scaleLabel: {
										display: true,
										labelString: 'Value'
									}
								}]
							}
						}}
					/>}</div>
				<div className="json-pretty">
					<pre>{JSON.stringify(linesData, undefined, 4)}</pre>
				</div>
				<h2 className="test-chart-title">Doughnut Graph</h2>
				<div style={{paddingLeft : '30px',width: '500px', height : '400px',float : 'left' , display : 'inline-bock'}}>
					{ !frameworkGlobals.isServer && <Doughnut
						data={doughnut}
						options = {{
							plugins: {
								datalabels: {
									backgroundColor: function(context) {
										return context.dataset.backgroundColor;
									},
									borderColor: 'white',
									borderRadius: 25,
									borderWidth: 2,
									color: 'white',
									display: function(context) {
										var dataset = context.dataset;
										var count = dataset.data.length;
										var value = dataset.data[context.dataIndex];
										return value > count * 1.5;
									},
									font: {
										weight: 'bold'
									},
									formatter: Math.round
								}
							}
						}}
					/>}</div>
				<div className="json-pretty">
					<pre>{JSON.stringify(doughnut, undefined, 4)}</pre>
				</div>*/}
			</div>
		);

	}

}



