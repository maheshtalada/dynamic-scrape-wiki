import React from 'react';
import PropTypes from 'prop-types';
import ContentGridComponent from '../content/content-grid';
import { isArray } from 'lodash'
import Chart from '../../../charts';

/**
 * @description renders graph
 * @prop classNames {array} Additional classnames to be added to the component
 */
const PIE_CHART_COLORS = ["rgba(15, 37, 87, 0.9)", "rgba(42, 81, 123, 0.9)","rgba(70, 125, 160, 0.9)","rgba(98, 169, 197, 0.9)","rgba(126, 213, 234, 0.9)","#7ed5ea"];

export default class ChartComponent extends ContentGridComponent {

   static propTypes = {
      classNames: PropTypes.array
   };

   static defaultProps = {
      classNames: ['schema__chart']
   };

   static getTickValue(value, values) {

      if(isNaN(value)) {
         return value;
      }
      // If we have lots of ticks, don't use the ones
      let delta = values.length > 3 ? values[2] - values[1] : values[1] - values[0];

      // If we have a number like 2.5 as the delta, figure out how many decimal places we need
      if (Math.abs(delta) > 1) {
         if (value !== Math.floor(value)) {
            // not an integer
            delta = value - Math.floor(value);
         }
      }

      let logDelta = Math.log10(Math.abs(delta));

      if (value !== 0) {
         let numDecimal = -1 * Math.floor(logDelta);
         numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
         return Number(value).toFixed(numDecimal);
      } else {
         return '0'; // never show decimal places for 0
      }

   };

   static handleTooltips(dataset) {
      const { options = undefined } = dataset;
      const { graphType } = this.props.data;
      const dataLabelsConfigOptions = options && options.configOptions && options.configOptions.dataLabels || {};

      if(graphType === 'pie') {
         return {
            callbacks : {
               label: (tooltipItem, data) =>{
                  return data.labels[tooltipItem.index];
               }
            }
         }
      }

      if(options.tooltips && !options.tooltips.enabled){
         return options.tooltips;
      }

      return {
         callbacks : {
            label: (tooltipItem, data) =>{
               const dataItem = data.datasets[tooltipItem.datasetIndex];
               const reducerValue = graphType === 'horizontal-bar' ? tooltipItem.xLabel : tooltipItem.yLabel;
               return `${dataItem.label} - ${this.generateValueReducer({value: reducerValue, configOptions: dataLabelsConfigOptions})}`;
            }
         }
      }

   };

   static handleLegends(dataset) {
      // if single data set
      // no need to show legend
      const { options = undefined } = dataset;

      if(!options) {
         return false;
      }

      if(dataset.datasets.length === 1) {
         return {
            display : false,
            labels : {
               padding : {
                  bottom : 10
               }
            }
         }
      }
      return false;
   };

   static handleDataLabels(dataset) {
      const { options = undefined } = dataset;

      if(!options) {
         return false;
      }

      // override above config in below condition
      // if false by schema config
      // then display value false & no formatter
      if(options && options.hasOwnProperty('displayValue') && !options.displayValue) {
         return  {
            datalabels: {
               display : false
            }
         }
      }

      const dataLabelsConfigOptions = options.configOptions && options.configOptions.dataLabels || {};
      return  {
         datalabels: {
            display : true,
            ...options.dataLabels,
            formatter: (value) => {
               return this.generateValueReducer({value: Math.round(value), configOptions: dataLabelsConfigOptions});
            }
         }
      }
   };

   static handleAxes(dataset, l) {
      const { options = undefined } = dataset;

      if(!options) {
         return false;
      }

      let scales = {};
      const { axisLabels = ''} = options;
      const configXAxesOptions = options.configOptions && options.configOptions.xAxes || {};
      const xTicks = {
         ticks : {
            callback: (value, index, values) => {
               return this.generateValueReducer({value:ChartComponent.getTickValue(value, values), configOptions: configXAxesOptions});
            }
         }
      };

      const configYAxesOptions = options.configOptions && options.configOptions.yAxes || {};
      const yTicks = {
         ticks : {
            callback: (value, index, values) => {
               return this.generateValueReducer({value : ChartComponent.getTickValue(value, values), configOptions: configYAxesOptions});
            }
         }
      };

      scales['xAxes']= xTicks;
      scales['yAxes']= yTicks;
      scales.xAxes = ChartComponent.getScaleAxes(axisLabels.xAxes, xTicks, l);
      scales.yAxes = ChartComponent.getScaleAxes(axisLabels.yAxes, yTicks, l);
      return scales;

   };

   static getScaleAxes(axes, ticks, l) {
      if(isArray(axes)) {
         return ChartComponent.updateAxesLabels(axes, l, ticks);
      } else {
         return [{
            scaleLabel: {
               display: axes ? true : false,
               labelString: l(axes)
            },
            ...ticks
         }]
      }
   };

   static updateAxesLabels(axesArray, l, ticks) {
      let axisName = [];
      axesArray.forEach((axes)=>{
         axisName.push({
            scaleLabel: {
               display: true,
               labelString: l(axes)
            },
            ...ticks
         })
      });
      return axisName;
   };

   static translateDataSetLabels(dataset, l, graphType) {
      dataset.labels.length  && dataset.labels.forEach((label, index)=>{
         dataset.labels[index] = `${l(label)}${graphType === 'pie' ? ` - ${Math.round(Number(dataset.datasets[0].data[index]))}%` : ''}`;
      });

      dataset.datasets.length && dataset.datasets.forEach((data, index)=>{
         if(data.label)
            dataset.datasets[index].label = l(data.label);
      });

      return dataset;
   };

   static modifyBackgroundColors(dataset) {
      dataset.datasets.length && dataset.datasets.forEach((data)=>{
         data.backgroundColor = PIE_CHART_COLORS.slice(0,data.backgroundColor.length);
         data.hoverBackgroundColor = data.backgroundColor;
      });
      return dataset;
   };

   renderLabel(label) {
      return (null);
   }

   renderValue() {
      const { l } = this.props;
      const { dataset = {}, graphType  } = this.props.data;
      const options = this.generateGraphOptions(l, this.props.data.dataset, graphType);
      let modifiedDataset = ChartComponent.translateDataSetLabels(dataset, l, graphType);
      if(graphType.toLowerCase() === 'pie' || graphType.toLowerCase() === 'doughnut') {
         modifiedDataset = ChartComponent.modifyBackgroundColors(modifiedDataset);
      }
      let componentArray = [
         <div key="chartContainer" className="schema__chart__container">
            <Chart
               data = {modifiedDataset}
               isEnlargeRequired={false}
               graphType = {graphType}
			   options = {options}
            />
         </div>
      ];
      return componentArray;
   }

   generateGraphOptions(l, dataset, graphType) {
      const { options={}}  = dataset;
      let optionsObj = {};
      let handlerResults = undefined;

      if(graphType === 'pie') {
         optionsObj['tooltips'] = ChartComponent.handleTooltips.call(this, dataset, l);
         return optionsObj;
      }

      if(Object.keys(options).length === 0 ) {
         return optionsObj
      }

      const optionHandlers = [
         { handler : 'handleTooltips', option : 'tooltips' },
         { handler : 'handleLegends', option : 'legend'},
         { handler : 'handleDataLabels', option : 'plugins'},
         { handler : 'handleAxes', option : 'scales'}
      ];

      optionHandlers.map(handlerObj => {
         handlerResults =  ChartComponent[handlerObj.handler].call(this, dataset, l);
         if(handlerResults) {
            optionsObj[handlerObj.option] = handlerResults;
         }
      });
      return optionsObj;

   };

}


