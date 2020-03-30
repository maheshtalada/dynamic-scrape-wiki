import React from 'react';
import df from 'dateformat';
import moment from 'moment';
import { getYearInShort } from 'utils/dateUtil';

const MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	TIMELINE_WRAPPER_PADDING = 10;
class Timeless extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			trackCursor : false,
			cursorPos : 0,
			trackPos : 0
		};

		this.handleDrag = this.handleDrag.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.onCursorTransitionEnd = this.onCursorTransitionEnd.bind(this);
	}


	static defaultProps = {
		cursorWidth: 96,
	}

	componentWillMount() {
		this.addListeners();
		this.delay = null;
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	componentDidMount() {
		this.setComponentStyles();
	}

	render() {
		const { trackCursor, trackWidth, trackPos , cursorPos , animate } = this.state;
		const { cursorWidth } = this.props;
		let animateTransition = {};
		const trackStyles = trackWidth ? {
			width : `${trackWidth}px` ,
			opacity : 1,
			transform: `translate3d(${trackPos}px,0,0)`
		} : { width : '100%', transform: `translate3d(${trackPos}px,0,0)`};
		//translate3d(-1038px, 0px, 0px)
		if( animate) {
			animateTransition.transition = 'all 0.25s ease';
		}
		const timelineWrapperStyles = {
			'padding' : `0 ${TIMELINE_WRAPPER_PADDING}px`
		};
		const trackCursorStyles = 	trackCursor ? {
			display : 'block',
			width : `${cursorWidth}px`,
			transform: `translate3d(${cursorPos}px,0,0)`,
			...animateTransition
		} : { display : 'none', transform: `translate3d(${cursorPos}px,0,0)`, width : `${cursorWidth}px`}
		const dates =  trackWidth && this.getDateRanges(trackPos, cursorPos);
		return (
			<div className="timeline noselect" style={timelineWrapperStyles} ref={ el => this.timelineWrapper = el}>
				<div className="timeline__track"
					 style={trackStyles}
					 ref={el => this.timelinetrack = el}
					 onMouseDown={this.handleMouseDown.bind(this, 'track')}
				>
					{trackWidth && this.renderTrack()}
				</div>
				{ trackWidth && <div className="timeline__cursor" ref={ (el) => this.timelineCursor = el } style={trackCursorStyles} onMouseDown={this.handleMouseDown.bind(this,'cursor')}>
					<div className="timeline__cursor__left-pointer"></div>
					<div className="timeline__cursor__left-marker">{this.getCurrentCursorDate(dates.startDate)}</div>
					<div className="timeline__cursor__right-marker">{this.getCurrentCursorDate(dates.endDate)}</div>
					<div className="timeline__cursor__right-pointer"></div>
				</div> }
			</div>
		)
	}

	getCurrentCursorDate(date) {
		const dateParts = date.split('/');
		return `${dateParts[1]}/${getYearInShort(dateParts[2])}`;
	}

	setComponentStyles() {
		const { cursorWidth, minYear, maxYear } = this.props;
		const wrapperWidth = this.timelineWrapper.getBoundingClientRect().width;
		let trackPos = 0, cursorPos = 0;
		this.fittableYears = Math.round(wrapperWidth/cursorWidth);
		this.yearDiff = maxYear - minYear;
		// this.diffByHalf = Math.round(this.fittableYears / 2) - Math.round(this.yearDiff/2);
		this.diffByHalf = Math.round(this.fittableYears) - Math.round(this.yearDiff);
		let trackWidth = 0;
		const date =  this.convertUnixToDate(this.props.minCursorDefaultTimestamp);
		if(this.yearDiff >= this.fittableYears) {
			this.minYear = minYear;
			this.maxYear = maxYear;
			trackWidth = ((this.maxYear - this.minYear) + 1) * cursorWidth;
			trackPos =  (wrapperWidth - trackWidth) - TIMELINE_WRAPPER_PADDING;
			cursorPos = (wrapperWidth - ((maxYear - date.getFullYear() + 1) * cursorWidth) + ((date.getMonth()) * 8) - 8)
		} else {
			this.minYear = minYear - this.diffByHalf;
			this.maxYear = maxYear;
			trackWidth = ((this.maxYear  - this.minYear) + 1 ) * cursorWidth;
			trackPos =  (wrapperWidth - trackWidth) - TIMELINE_WRAPPER_PADDING;
			// cursorPos = ((date.getFullYear() - this.minYear) * cursorWidth) + ((date.getMonth()) * 8);
			cursorPos = (wrapperWidth - ((maxYear - date.getFullYear() + 1) * cursorWidth) + ((date.getMonth()) * 8) - 8)
		}

		this.setState({
			trackWidth : trackWidth,
			trackCursor  : true,
			loadTrack : true,
			wrapperOffsetLeft : this.timelineWrapper.offsetLeft,
			cursorPos,
			trackPos
		})
	}

	convertUnixToDate(datestamp) {
		return moment.utc(datestamp).toDate();
	}

	renderTrackItem(year) {
		return [].concat.apply([],Array(12)).map( (item, key) => (<div key={year} className="timeline__track__items__item"></div>))
	}

	renderTrack() {
		let tracks = [];
		const { minYear , maxYear, cursorWidth } = this.props;
		if( this.yearDiff >= this.fittableYears) {
			let i = 0;
			for(; i <= this.yearDiff ; i++) {
				tracks.push((
					<div className="timeline__track__items" style={{width : `${cursorWidth}px`}} onClick={this.transitionTo.bind(this, (minYear+i), i)}>
						<div className="timeline__track__items__item-wrap">
							{this.renderTrackItem()}
						</div>
						<div className="timeline__track__items__legend">{minYear + i}</div>
					</div>
				))
			}
		} else if((this.fittableYears / 2) > (this.yearDiff/2)) {
			let i = this.diffByHalf, j = 0, k =0 , l = -1;
			//print dummies before
			for(; i > 0 ; i--) {
				l++;
				tracks.push((
					<div className="timeline__track__items disable" style={{width : `${cursorWidth}px`}} onClick={this.transitionTo.bind(this, (minYear - i), l)}>
						<div className="timeline__track__items__item-wrap">
							{this.renderTrackItem()}
						</div>
						<div className="timeline__track__items__legend">{minYear - i}</div>
					</div>
				))
			}
			//print originals
			for(; k <= this.yearDiff; k++) {
				l++;
				tracks.push((
					<div className="timeline__track__items" style={{width : `${cursorWidth}px`}} onClick={this.transitionTo.bind(this, (minYear + k), l)}>
						<div className="timeline__track__items__item-wrap">
							{this.renderTrackItem()}
						</div>
						<div className="timeline__track__items__legend">{minYear + k}</div>
					</div>
				))
			}
			//print dummies after
			// for(; j < this.diffByHalf ; j++) {
			// 	l++;
			// 	tracks.push((
			// 		<div className="timeline__track__items disable" style={{width : `${cursorWidth}px`}}>
			// 			<div className="timeline__track__items__item-wrap">
			// 				{this.renderTrackItem()}
			// 			</div>
			// 			<div className="timeline__track__items__legend">{maxYear + j}</div>
			// 		</div>
			// 	))
			// }
		}

		return tracks;
	}

	onChange() {
		const { minTimestamp, maxTimestamp } = this.props;
		const dates = this.getDateRanges();
		const minDate = this.convertUnixToDate(minTimestamp);
		const maxDate = this.convertUnixToDate(maxTimestamp);
		const startDate = moment(dates.startDate,'DD/MM/YYYY').utc().toDate();
		const endDate = moment(dates.endDate,'DD/MM/YYYY').utc().toDate();
		if(moment(startDate).isBetween(minDate,maxDate) || moment(endDate).isBetween(minDate,maxDate)) {
			this.props.onChange(dates);
		}
	}

	onCursorTransitionEnd() {
		this.onChange();
		this.timelineCursor.removeEventListener('transitionend', this.onCursorTransitionEnd, false);
	}

	isYearClick(){
		const trackPosDiff = Math.abs(this.state.trackPos - this.lastrackPos);
		return trackPosDiff <= 3
	}

	isCursorMoved(){
		const cursorPosDiff = Math.abs(this.state.cursorPos - this.lastCursorPos);
		return cursorPosDiff > 1 && this.eventStep === 'move'
	}

	transitionTo(year, yearNumber, event) {
		// prevent from being clicked while moving track
		if(!this.isYearClick()) {
			return;
		}
		event.stopPropagation();
		const trackTransformX =  this.timelinetrack.style.transform.split(/\w+\(|\);?/)[1].split(/,\s?/g)[0].replace('px','');
		this.setState({
			cursorPos : ( this.props.cursorWidth * yearNumber) + parseInt(trackTransformX, 10),
			cursorOffSet : event.clientX - this.state.cursorPos,
			animate: true,
		}, ()=>{
			this.timelineCursor.addEventListener('transitionend', this.onCursorTransitionEnd, false);
		})
	}

	getActiveDragger(ele, x) {
		const  { cursorPos, trackPos } = this.state;
		if(ele === 'cursor') {
			return {
				cursorOffSet : x - cursorPos,
			}
		}
		return {
			trackOffSet : x - trackPos
		}
	}

	handleMouseDown(ele, event){
		this.eventStep = 'down';
		this.lastrackPos = this.state.trackPos;
		this.lastCursorPos = this.state.cursorPos;
		this.setState(
			{
				animate: false,
				activeWrapper : ele,
				...this.getActiveDragger(ele, event.clientX)
			}, () => {
				window.addEventListener('mousemove', this.handleDrag, true);
			}
		)
	}

	isDatesOutOfRange() {
		const { minTimestamp, maxTimestamp } = this.props;
		const { trackWidth, trackPos, cursorPos } = this.state;
		const dates =  trackWidth && this.getDateRanges(trackPos, cursorPos);
		const minDate = this.convertUnixToDate(minTimestamp);
		const maxDate = this.convertUnixToDate(maxTimestamp);
		const startDate = moment(dates.startDate,'DD/MM/YYYY').utc().toDate();
		const endDate = moment(dates.endDate,'DD/MM/YYYY').utc().toDate();
		if((moment(startDate).isAfter(maxDate) || moment(startDate).isBefore(minDate)) && this.eventStep) {
			return true;
		}
		return false;
	}

	handleDrag(event) {
		this.eventStep = 'move';
		const { activeWrapper, cursorOffSet,  trackOffSet = 0, trackWidth, trackPos } = this.state;
		let translateValue = 0;
		const wrapperWidth = this.timelineWrapper.getBoundingClientRect().width;
		if(activeWrapper === 'cursor') {
			translateValue = event.clientX -  cursorOffSet;
			if((translateValue > (wrapperWidth - this.props.cursorWidth)) || translateValue < 0) {
			} else {
				this.setState({ 'cursorPos' : translateValue});
			}
		} else {
			translateValue = event.clientX - trackOffSet;
			if((translateValue > 0) || ((Math.abs(translateValue) + wrapperWidth) > (trackWidth))) {
			} else {
				this.setState({ 'trackPos' : translateValue});
			}
		}
	}

	getDateRanges(trackPos, cursorPos) {
		const track =  trackPos || (this.timelinetrack && this.timelinetrack.style.transform.split(/\w+\(|\);?/)[1].split(/,\s?/g)[0].replace('px','')) || 0;
		const cursor =  cursorPos || (this.timelineCursor && this.timelineCursor.style.transform.split(/\w+\(|\);?/)[1].split(/,\s?/g)[0].replace('px','')) || 0;
		const { cursorWidth } = this.props;
		const yearNumber = (Math.abs(parseInt(track, 10)) + parseInt(cursor, 10)) / cursorWidth;
		const droppedYear = this.minYear + yearNumber;
		const fraction = (droppedYear + "").indexOf('.') > -1 && Number((droppedYear + "").split(".")[1].substring(0,2));
		const startMonth = fraction && Math.ceil(fraction / 8) || 1;
		const startDate = new Date(Number(droppedYear), (startMonth - 1), 1);
		const endDate  = new Date(startDate);
		endDate.setMonth(startDate.getMonth()+12);
		endDate.setDate(endDate.getDate()-1);
		return {
			startDate : df(new Date(startDate), "dd/mm/yyyy"),
			endDate : df(new Date(endDate), "dd/mm/yyyy")
		}
	}

	handleMouseUp(event) {
		if(this.eventStep) {
			this.eventStep = '';
			this.onChange();
		}
		window.removeEventListener('mousemove', this.handleDrag, true);
	}

	addListeners() {
		window.addEventListener('mouseup', this.handleMouseUp, false);
	}

	removeListeners() {
		window.removeEventListener('mouseup', this.handleMouseUp, false);
	}

}

export default Timeless;

