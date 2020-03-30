import { formatCurrency, getValueByLocale, addlocaleCurrencyCode } from '../utils/localeUtil';

var INSET = 30;

const LOW_CURVE_COLOR = "";
const MARKET_CURVE_COLOR = "#739cc0";
const CURVE_COLOR = "#d7e6ec";
const MIN_COLOR = "#ffd740";
const MAX_COLOR = "#ff8a80";
const AVG_COLOR = "#40c4ff";

var CurveGUI  = (function() {

	function CurveGUI(options, canvasId) {
		const currencyFormat = getValueByLocale(options.country,'currencyFormat');
		const currencySymbol = getValueByLocale(options.country,'currencySymbol');
		//this._mean = 0;
		options.variance = options.stdDeviation*options.stdDeviation;
		this._options = options;
		this._canvas = document.getElementById(canvasId);
		this._ctx = this._canvas.getContext("2d");
		this._options.currentPrice = `${currencySymbol}${formatCurrency(options.current,2,currencyFormat)}`;
		this._options.avgPrice = `${currencySymbol}${formatCurrency(options.avg ,2,currencyFormat)}`;
		this.x1 = INSET;

		this.x2 = ( INSET + this._canvas.width )  - (1 * INSET);
		this.y1 = INSET;
		this.y2 = ( INSET + this._canvas.height ) - (1 * INSET);
		this.constant = 1 / Math.sqrt(2 * Math.PI * options.variance);
		const h = (this.y2 - this.y1)-10;
		const r0 = this._linTran(0, 1.1*this.constant, h, this.y1);
		this.Ay=r0[0]+20;
		this.by=r0[1];
		this._options.lowPrice = `${currencySymbol}${formatCurrency(options.min,2,currencyFormat)}`;
		this._options.highPrice = `${currencySymbol}${formatCurrency(options.max,2,currencyFormat)}`;
		this.lowX = options.avg - 3 * options.stdDeviation;
		this.highX = options.avg + 3 * options.stdDeviation;
		for(let i= 3.5; i< 10 ; i=i+0.5) {
			if(this.highX >= options.max && this.lowX <= options.min ) {
				break;
			}
			this.lowX = options.avg - i * options.stdDeviation;
			this.highX = options.avg + i * options.stdDeviation;
		}

		if(options.stdDeviationLowerBound > 0  && options.current >= options.stdDeviationLowerBound && options.current <= options.stdDeviationUpperBound) {
			this._options.lowPriceOffset = -18;
			this._options.highPriceOffset = -18;
		} else {
			this._options.lowPriceOffset = -this._ctx.measureText(this._options.lowPrice).width;
			this._options.highPriceOffset = -3;
		}

		const r1 = this._linTran(this.lowX, this.highX, this.x1, this.x2);
		this.Ax=r1[0];
		this.bx=r1[1];
	}

	CurveGUI.prototype.drawGraph = function() {
		this.drawCurve();
		this.drawBelow(-999999, this._options.min, LOW_CURVE_COLOR);
		this._options.modeLowerBound && this.drawBelow(this._options.modeLowerBound, this._options.modeUpperBound, MARKET_CURVE_COLOR);
		this.drawArc(this._options.min, this._options.lowPriceLabel, this._options.lowPrice,this._options.lowPriceOffset, false, MIN_COLOR);
		this.drawArc(this._options.avg, this._options.marketPriceLabel, this._options.avgPrice, -18, false, AVG_COLOR);
		this.drawArc(this._options.max, this._options.highPriceLabel, this._options.highPrice,this._options.highPriceOffset, false, MAX_COLOR);
		this._options.current && this.drawCurrent(this._options.current, this._options.currentPriceLabel, this._options.currentPrice, '#000');
		//this._options.modeLowerBound && this.drawMarketPriceLegend(this._options.modeLowerBound,this._options.modeUpperBound,`${addlocaleCurrencyCode(formatCurrency(this._options.modeLowerBound,2,this._options.country))} - ${addlocaleCurrencyCode(formatCurrency(this._options.modeUpperBound,2,this._options.country))}`,this._options.legendLabel);
		this._options.callBack && this._options.callBack();
	}

	CurveGUI.prototype._linTran = function(x0,xf,y0,yf) {
		// finds b and a for transforming from x to y
		var r = [];
		r[1]=(yf-y0)/(xf-x0);
		r[0] = (yf+y0)/2- r[1] * (xf+x0)/2;
		return r;
	};

	CurveGUI.prototype.drawCurrent = function(current, text, displayValue, fontColor) {
		this._ctx.beginPath();
		var x = this.bx * current + this.Ax;
		var y = this.Ay + 15;
		var textStart = x;
		var displayValueStart = x;
		this._ctx.beginPath();
		this._ctx.strokeStyle = "#000";
		this._ctx.setLineDash([5, 3]);
		this._ctx.moveTo(x,this.Ay);
		this._ctx.lineTo(x,this.Ay - this._canvas.height+40);
		this._ctx.stroke();
		this._ctx.font = 'bold 12px Arial';
		var textMeasure = this._ctx.measureText(text);
		var displayValueMeasure = this._ctx.measureText(displayValue);
		if((x+textMeasure.width > this._canvas.width) || (x+displayValueMeasure.width > this._canvas.width)) {
			textStart = (x - textMeasure.width)-4;
			displayValueStart = (x - displayValueMeasure.width)-4;
		} else {
			textStart = x+4;
			displayValueStart = x+4;
		}
		 this._ctx.fillStyle = '#000';
		 this._ctx.fillText(this._options.currentPriceLabel , textStart , this.Ay - this._canvas.height + 45);
		this._ctx.fillStyle = fontColor;
		this._ctx.fillText(displayValue, displayValueStart, this.Ay - this._canvas.height + 60);
	}

	CurveGUI.prototype.drawBelow = function(lower , upper, curveColor) {
		var hFill = upper;
		var lFill=lower;
		//var z=(this._options.avg- hFill) / this._options.min;
		//var p = 1-zProb(z)

		var inc = 1/this.bx,
			dmax = 0,
			xp = 0,
			d = 0,
			dp = 0,
			i = this.lowX;
		this._ctx.beginPath();
		for (; i<= this.highX; i+=inc*.5){
			xp = this.bx*i + this.Ax;
			d =  this.constant*Math.exp(-Math.pow((i-this._options.avg),2)/(2*this._options.variance))
			dmax = Math.max(dmax,d);
			dp= this.by*d+this.Ay;
			if(i<=hFill && i >=lFill) {
				this._ctx.moveTo(xp,this.Ay);
				this._ctx.lineTo(xp,dp+1)
			}
		}
		this._ctx.strokeStyle = curveColor;
		this._ctx.stroke();
	};

	/*CurveGUI.prototype.drawMarketPriceLegend = function(lower,upper,rangeDisplay,label) {
		const lowerX = this.bx * lower + this.Ax;
		const upperX = this.bx * upper + this.Ax;
		const midPointX = ((upperX - lowerX)/2)+lowerX;
		var textStart = midPointX;
		var displayValueStart = midPointX;
		this._ctx.beginPath();
		this._ctx.strokeStyle = "#000";
		this._ctx.setLineDash([5, 3]);
		this._ctx.moveTo(midPointX,this.Ay);
		this._ctx.lineTo(midPointX,this.Ay - this._canvas.height+46);
		this._ctx.stroke();
		this._ctx.font = '12px Arial';
		var textMeasure = this._ctx.measureText(label);
		var displayValueMeasure = this._ctx.measureText(rangeDisplay);
		if((midPointX+textMeasure.width > this._canvas.width) || (midPointX+displayValueMeasure.width > this._canvas.width)) {
			textStart = (midPointX - textMeasure.width)-4;
			displayValueStart = (midPointX - displayValueMeasure.width)-4;
		} else {
			textStart = midPointX+4;
			displayValueStart = midPointX+4;
		}
		this._ctx.fillStyle = '#000';
		this._ctx.fillText(label , textStart , this.Ay - this._canvas.height + 48);
		this._ctx.fillText(rangeDisplay, displayValueStart, this.Ay - this._canvas.height + 62);
	};*/

	CurveGUI.prototype.drawArc = function(value, text, displayValue, textSize, isShowText=true, fillColor) {

		var x = this.bx * value + this.Ax;
		var y = this.Ay + 15;
		this._ctx.beginPath();
		this._ctx.arc(x, this.Ay, 7, 0, Math.PI * 2, true);
		this._ctx.strokeStyle = fillColor;
		this._ctx.stroke();
		this._ctx.fillStyle = fillColor;
		//this._ctx.font = '12px Arial';
		//isShowText && this._ctx.fillText(text, x - 15, y+5);
		//this._ctx.fillText(displayValue, x + textSize , y+5);
		this._ctx.closePath();
		this._ctx.fill();
		/*if(!isShowText) {
			console.log(typeof textSize);
			this._ctx.fillText(displayValue, x + textSize , y+5);
		}else {
			this._ctx.fillText(displayValue, x - 18 , y+20);
		}*/

	};

	//canvas, bounds, mean, standard deviation, lower limit, upper limit, tail (outside or inside)
	CurveGUI.prototype.drawCurve = function() {
		this._ctx.beginPath();
		var x0 = this.lowX * this.bx + this.Ax;
		var xf = this.highX * this.bx + this.Ax;
		// draw axis
		this._ctx.moveTo(xf, this.Ay)
		this._ctx.lineTo(x0, this.Ay)

		var inc = 1/this.bx,
			dmax = 0,
			xp = 0,
			d = 0,
			dp = 0,
			i = this.lowX;

		for (; i<= this.highX; i+=inc*.5){
			xp = this.bx*i + this.Ax;
			d =  this.constant*Math.exp(-Math.pow((i-this._options.avg),2)/(2*this._options.variance))
			dmax = Math.max(dmax,d);
			dp= this.by*d+this.Ay;
			//height in pixels
			this._ctx.lineTo(xp,dp);
		}

		this._ctx.strokeStyle = CURVE_COLOR;
		this._ctx.fillStyle = CURVE_COLOR;
		this._ctx.fill();
		this._ctx.stroke();
		this._ctx.closePath();
	};
	return CurveGUI;
}());

export default CurveGUI;
