import React from 'react';
import ReactDOM from 'react-dom';
import Skycons from 'react-skycons';


class ForecastBody extends React.Component {
	constructor(props) {
		super(props);
	}

	capitalizeIconName() {
		return this.props.icon.toUpperCase().split('-').join('_');
	}

	roundTemp(temp) {
		return Math.round(temp);
	}

	render() {
		var icon = this.capitalizeIconName();
		var lowTemp = this.roundTemp(this.props.lowTemp);
		var highTemp = this.roundTemp(this.props.highTemp);

		return (
			<div className="forecast">
				<Skycons color="black" icon={icon} style={{width: '200px'}} />
				<div className="forecast-temp">
					<div className="forecast-high">{highTemp}&deg;</div>
					<div className="forecast-low">{lowTemp}&deg;</div>
				</div>
			</div>
		)
	}
}

export default ForecastBody;