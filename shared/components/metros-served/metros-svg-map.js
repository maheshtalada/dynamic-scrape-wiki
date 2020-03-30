import React, { Component } from "react";
import {
	ComposableMap,
	ZoomableGroup,
	Geographies,
	Geography,
	Markers,
	Marker
} from "react-simple-maps";
import US_COUNTRY_GEOGRAPHY from '../../assets/static/us-states-topology.json';

const wrapperStyles = {
	width: "100%",
	maxWidth: 580,
	margin: '0 auto'
};

const CITY_COLOR = '#424242',
	CITY_COLOR_SHADOW = '#757575',
	CITY_HIGHLIGHT_COLOR = '#041e3a',
	CITY_HIGHLIGHT_COLOR_SHADOW = '#12BCAD',
	MAP_BOUNDARY_COLOR = "#BDBDBD";

export default class SvgMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityHighlight : props.cityHighlight || ''
		}
	}
	componentDidMount() {
	}
	componentWillReceiveProps(props) {
		this.setState({
			cityHighlight : props.cityHighlight
		});
	}
	render() {
		const { cityHighlight } = this.state;
		const { mapMarkers } = this.props;
		return (
			<div style={wrapperStyles}>
				<ComposableMap
					projection="albersUsa"
					projectionConfig={{
						scale: 600
					}}
					width={495}
					height={280}
					style={{
						width: "100%",
						height: "auto",
					}}
				>
					<ZoomableGroup disablePanning>
						<Geographies geography={US_COUNTRY_GEOGRAPHY} disableOptimization>
							{(geographies, projection) =>
								geographies.map((geography, i) => {
										return (
											<Geography
												key={`state-${geography.properties.ID_1}`}
												cacheId={`state-${geography.properties.ID_1}`}
												geography={geography}
												projection={projection}
												style={{
													default: {
														fill: "#FFF",
														stroke: MAP_BOUNDARY_COLOR,
														strokeWidth: 0.75,
														outline: "none",
													},
													hover: {
														fill: "#FFF",
														stroke: MAP_BOUNDARY_COLOR,
														strokeWidth: 0.75,
														outline: "none",
													},
													pressed: {
														fill: "#FFF",
														stroke: MAP_BOUNDARY_COLOR,
														strokeWidth: 0.75,
														outline: "none",
													},
												}}
											/>
										)
									}
								)}
						</Geographies>
						<Markers>
							{mapMarkers.map((city, i) => {
								const cityColor = CITY_HIGHLIGHT_COLOR, //city.name === cityHighlight ? CITY_HIGHLIGHT_COLOR : CITY_COLOR,
									cityShadowColor = CITY_HIGHLIGHT_COLOR_SHADOW;//city.name === cityHighlight ? CITY_HIGHLIGHT_COLOR_SHADOW : CITY_COLOR_SHADOW;
								return (
									<Marker key={i} marker={city} onMouseEnter={()=>{this.props.onMarkerMouseEnter(i)}} onClick={()=> {this.props.onMarkerClick(city)}}>
										{!frameworkGlobals.isServer && <circle
											cx={0}
											cy={0}
											r={12}
											opacity={1}
											fill={cityShadowColor}

										>
											<animate attributeName="r" begin="0s" dur="1s" repeatCount="indefinite" from="4" to="12"/>
											<animate attributeName="opacity" begin="0s" dur="1s" repeatCount="indefinite" from="1" to="0"/>
										</circle>}
										<circle
											cx={0}
											cy={0}
											r={4}
											fill={cityColor}

										/>
										{<text
											textAnchor="middle"
											y={city.markerOffsetY}
											x={city.markerOffsetX}
											fill={cityColor}
											style={{
												fontFamily: "Roboto, sans-serif",
												fontSize: "1.2rem"
											}}
										>
											{city.label}
										</text>}
									</Marker>
								)
							})}
						</Markers>
					</ZoomableGroup>
				</ComposableMap>
			</div>
		)
	}
}
