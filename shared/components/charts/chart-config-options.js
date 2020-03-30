
module.exports = {
	"Pie" : {
		height : 100,
		responsive: true,
		zoomOutPercentage: 100,
		legend: {
			position: 'bottom',
			labels : {
				fontStyle : "bold"
 			}
		},
		plugins: {
			datalabels: {
				display: false
			}
		}
	},
	"LineWithLayer" : {
		legend: {
			position: "bottom"
		},
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
				display: true
			}],
			yAxes: [{
				display: true
			}]
		}
	},
	"Bar" : {
		legend: {
			position: "bottom"
		},
		plugins: {
			datalabels: {
				align: 'end',
				anchor: 'end',
				color: '#000',
				padding : {
				 top : -10
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
	},
	"HorizontalBar" : {
		legend: {
			position: "bottom"
		},
		plugins: {
			datalabels: {
				align: 'end',
				anchor: 'end',
				color: '#000',
				padding : {
					right : -5
				},
				font: {
					weight: 'bold'
				},
				formatter: function(value) {
					return value % 1 ? value.toFixed(2) : value;
				}
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
	},
	"MultiAxisBar" : {
		legend: {
			position: "bottom"
		},
		plugins: {
			datalabels: {
				align: 'end',
				anchor: 'end',
				padding : {
					top : -10
				},
				color: '#000',
				display: function(context) {
					return true;
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
				id: "y-axis-1"
			}, {
				type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
				display: false,
				position: "right",
				id: "y-axis-2",
				gridLines: {
					drawOnChartArea: false
				}
			}],
		}
	},
	"StackedBar" : {
		legend: {
			position: "bottom"
		},
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
	},
	"LineWithoutLayer" : {
		legend: {
			position: "bottom"
		},
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
		tooltips: {
			mode: 'point',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true
			}],
			yAxes: [{
				display: true
			}]
		}
	},
	"Doughnut" : {
		legend: {
			position: "bottom"
		},
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
					const dataset = context.dataset;
					const count = dataset.data.length;
					const value = dataset.data[context.dataIndex];
					return value > count * 1.5;
				},
				font: {
					weight: 'bold'
				},
				formatter: Math.round
			}
		}
	},
	getOption : (option)=>{
		option = option.replace(/-\w/g, function(m) {
			return m[1].toUpperCase();
		});
		return option.charAt(0).toUpperCase() + option.slice(1);
	}
};
