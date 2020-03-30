import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

export default class SlideshowControls extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			togglePlay: false
		};
		this.onClickToggle = this.onClickToggle.bind(this);
	}

	onClickToggle() {
		this.setState({
			togglePlay: !this.state.togglePlay
		},()=>{
			if(this.state.togglePlay) {
				this.props.onClickPlay();
			}else {
				this.props.onClickPause();
			}
		})
	}

	render() {
		const { togglePlay } = this.state;
		const { l } = this.context.i18n;
		return (
			<div className="slide-show-controls-wrap flex flex-justify-center">
				<div className="slide-show-controls-wrap__controls flex">
					<button onClick={this.props.onClickPrev}>
						<i title={l('PREVIOUS')} className="pe-7s-skip-prev"/>
					</button>
					<button onClick={this.onClickToggle}>
						<i title={l(togglePlay ? 'PAUSE' : 'PLAY')} className={Cx(togglePlay ? 'pe-7s-pause-circle' : 'pe-7s-play-circle')}/>
					</button>
					<button onClick={this.props.onClickNext}>
						<i title={l('NEXT')} className="pe-7s-skip-next"/>
					</button>
				</div>
			</div>
		)
	}

}
