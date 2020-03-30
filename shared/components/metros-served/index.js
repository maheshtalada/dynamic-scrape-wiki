import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import Select from '../common/select/select';

const { areasServed } =require('../../assets/static/metros-served-config').default;
export default class MetrosServed extends Component {

	static contextTypes = {
		router : PropTypes.object,
		i18n : PropTypes.object,
		screenSize : PropTypes.number
	};

	constructor(props) {
		super(props);
	}

	getMetrosSelectOptions() {
		return areasServed.map(area => {
			return {
				name : area.label,
				value : area
			}
		})
	}

	render() {
		const { className, onMetroClick } = this.props;
		const { i18n : {l}, screenSize } = this.context;
		return (
			<div className={Cx("metros-served flex flex-column",className)}>
				{screenSize > 1 && <div className="metros-served__container">
					<Select btnClassName="btn btn-default"
							showOptionsByDefault
							options={this.getMetrosSelectOptions()} 
							isTranslationRequired={false} 
							btnLabel={'CHOOSEMARKETTOANALYZE'}
							onChange={(areaServed)=>{onMetroClick(undefined,areaServed)}}/>
					<div className="flex flex-justify-start help-me-invest__start-link-wrap">
                        <button className="help-me-invest__start-link btn btn-primary flex flex-align-center flex-justify-between" data-tag-category="Analyze Markets" data-tag-action="Click" data-tag-label="Explore" onClick={()=>{onMetroClick(undefined,areasServed[0])}}>
                            {l('EXPLORE')}
                        </button>
                    </div>
				</div>}
				{screenSize === 1 && 
					<div className="metros-served__select-wrap flex flex-column flex-align-center">
						<Select btnClassName="btn btn-default" 
							options={this.getMetrosSelectOptions()} 
							isTranslationRequired={false} 
							displayValue={l('SELECTMETROTOEXPLORE')}
							selected={false} 
							showOptionsInOverlay={true}
							onChange={(areaServed)=>{onMetroClick(undefined,areaServed)}}/>
					</div>
				}
			</div>
		)
	}
}
