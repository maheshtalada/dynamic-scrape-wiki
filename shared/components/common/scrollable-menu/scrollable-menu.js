import React, { Component } from 'react';

const DIRECTION_LEFT = "left",
	DIRECTION_RIGHT = "right",
	DIRECTION_BOTH = "both",
	DIRECTION_NONE = "none",
	BASE_TRAVEL_DISTANCE = 150;

export default class ScrollableMenu extends Component {

	constructor(props) {
		super(props);
		this.content = undefined;
		this.container = undefined;

		this.state = {
			dirIndicator : DIRECTION_NONE,
			isMenuTravelling : false,
			baseTravelDistance : BASE_TRAVEL_DISTANCE,
			scrollPixels : undefined
		}
	}

	componentDidMount() {
		this.determineIndicatorPositions()
		/*this.content.addEventListener("transitionend",()=>{
			this.setState({
				isMenuTravelling: false
			})
		});*/
	}

	componentWillUnmount() {
		//this.content.removeEventListener("transitionend");
	}


	/*
	 .addEventListener("transitionend",function() {
	 // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
	 var styleOfTransform = window.getComputedStyle(pnProductNavContents, null);
	 var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
	 // If there is no transition we want to default to 0 and not null
	 var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
	 pnProductNavContents.style.transform = "none";
	 pnProductNavContents.classList.add("pn-ProductNav_Contents-no-transition");
	 // Now lets set the scroll position
	 if (SETTINGS.navBarTravelDirection === "left") {
	 pnProductNav.scrollLeft = pnProductNav.scrollLeft - amount;
	 } else {
	 pnProductNav.scrollLeft = pnProductNav.scrollLeft + amount;
	 }
	 SETTINGS.navBarTravelling = false;
	 },false);
	 */
	determineIndicatorPositions() {
		const containerMetrics = this.container.getBoundingClientRect(),
			 containerMetricsRight = Math.floor(containerMetrics.right),
			 containerMetricsLeft = Math.floor(containerMetrics.left),
			 contentMetrics = this.content.getBoundingClientRect(),
			 contentMetricsRight = Math.floor(contentMetrics.right),
			 contentMetricsLeft = Math.floor(contentMetrics.left);
		if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
			this.setState({
				dirIndicator : DIRECTION_BOTH
			})
		} else if (contentMetricsLeft < containerMetricsLeft) {
			this.setState({
				dirIndicator : DIRECTION_LEFT
			})
		} else if (contentMetricsRight > containerMetricsRight) {
			this.setState({
				dirIndicator : DIRECTION_RIGHT
			})
		} else {
			this.setState({
				dirIndicator : DIRECTION_NONE
			})
		}
	}

	onNavigation(direction) {
		const  { isMenuTravelling } = this.state;
		// If in the middle of a move return
		if (isMenuTravelling) {
			return;
		}

		if(direction === DIRECTION_LEFT) {
			this.onLeftNavigation();
		} else {
			this.onRightNavigation()
		}
	}

	onRightNavigation() {
		const  { dirIndicator, baseTravelDistance } = this.state;
		// If we have content overflowing both sides or on the right
		if (dirIndicator === DIRECTION_RIGHT || dirIndicator === DIRECTION_BOTH) {
			// Get the right edge of the container and content
			const navBarRightEdge = this.content.getBoundingClientRect().right,
			 navBarScrollerRightEdge = this.container.getBoundingClientRect().right,
			// Now we know how much space we have available to scroll
			 availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
			// If the space available is less than two lots of our desired distance, just move the whole amount
			// otherwise, move by the amount in the settings
			let distance = undefined;
			if (availableScrollRight < baseTravelDistance * 2) {
				distance = `-${availableScrollRight}px`;
			} else {
				distance = `-${baseTravelDistance}px`;
			}
			this.setState({
				dirIndicator : DIRECTION_RIGHT,
				isMenuTravelling : true,
				scrollPixels : distance
			});
			// We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
			//pnProductNavContents.classList.remove("pn-ProductNav_Contents-no-transition");

		}
	}

	onLeftNavigation() {
		const  { dirIndicator, baseTravelDistance } = this.state;
		// If we have content overflowing both sides or on the left
		if (dirIndicator === DIRECTION_LEFT || dirIndicator === DIRECTION_BOTH) {
			// Find how far this panel has been scrolled
			const availableScrollLeft = this.content.scrollLeft;
			// If the space available is less than two lots of our desired distance, just move the whole amount
			// otherwise, move by the amount in the settings
			let distance = undefined;
			if (availableScrollLeft < baseTravelDistance * 2) {
				distance = `${availableScrollLeft}px`;
			} else {
				distance = `${baseTravelDistance}px`;
			}
			this.setState({
				dirIndicator : DIRECTION_LEFT,
				isMenuTravelling : true,
				scrollPixels : distance
			});
			// We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
			//pnProductNavContents.classList.remove("pn-ProductNav_Contents-no-transition");
		}
	}

	renderDirectionIndicators() {

	}

	render() {
		const { scrollPixels } = this.state;
		return (
			<div className="pn-ProductNav_Wrapper">
				<nav id="pnProductNav" className="pn-ProductNav" ref={el=>this.container=el}>
					<div id="pnProductNavContents"  className="pn-ProductNav_Contents" ref={el=>this.content=el} style={{
						transform : `translateX(${scrollPixels})`
					}}>
						<a href="#" className="pn-ProductNav_Link" aria-selected="true">Chairs</a>
						<a href="#" className="pn-ProductNav_Link">Tables</a>
						<a href="#" className="pn-ProductNav_Link">Cookware</a>
						<a href="#" className="pn-ProductNav_Link">Beds</a>
						<a href="#" className="pn-ProductNav_Link">Desks</a>
						<a href="#" className="pn-ProductNav_Link">Flooring</a>
						<a href="#" className="pn-ProductNav_Link">Lighting</a>
						<a href="#" className="pn-ProductNav_Link">Mattresses</a>
						<a href="#" className="pn-ProductNav_Link">Solar Panels</a>
						<a href="#" className="pn-ProductNav_Link">Bookcases</a>
						<a href="#" className="pn-ProductNav_Link">Mirrors</a>
						<a href="#" className="pn-ProductNav_Link">Rugs</a>
						<a href="#" className="pn-ProductNav_Link">Curtains &amp; Blinds</a>
						<a href="#" className="pn-ProductNav_Link">Frames &amp; Pictures</a>
						<a href="#" className="pn-ProductNav_Link">Wardrobes</a>
						<a href="#" className="pn-ProductNav_Link">Storage</a>
						<a href="#" className="pn-ProductNav_Link">Decoration</a>
						<a href="#" className="pn-ProductNav_Link">Appliances</a>
						<a href="#" className="pn-ProductNav_Link">Racks</a>
						<a href="#" className="pn-ProductNav_Link">Worktops</a>
						<span id="pnIndicator" className="pn-ProductNav_Indicator"></span>
					</div>
				</nav>
				<button id="pnAdvancerLeft" className="pn-Advancer pn-Advancer_Left btn btn-primary" type="button" onClick={e=>this.onNavigation(DIRECTION_LEFT)}>
					left
				</button>
				<button id="pnAdvancerRight" className="pn-Advancer pn-Advancer_Right btn btn-primary" type="button" onClick={e=>this.onNavigation(DIRECTION_RIGHT)}>
					right
				</button>
			</div>
		)
	}
}



