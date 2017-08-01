import React from 'react';
import ReactDOM from 'react-dom';
import Skycons from 'react-skycons';


class ForecastBody extends React.Component {
	constructor(props) {
		super(props);
		
	}

	capitalizeIconName() {
		return this.props.weather.icon.toUpperCase().split('-').join('_');
	}

	roundTemp(temp) {
		return Math.round(temp);
	}

	render() {
		var icon = this.capitalizeIconName();
		var lowTemp = this.roundTemp(this.props.weather.temperatureMin);
		var highTemp = this.roundTemp(this.props.weather.temperatureMax);

		return (
			<div className="forecast">
				<Skycons color="black" icon={icon} style={{width: '150px', marginBottom: '10px'}} />
				<div className="forecast-temp">
					<div className="forecast-high">{highTemp}&deg;</div>
					<div className="forecast-low">{lowTemp}&deg;</div>
				</div>
			</div>
		)
	}
}

export default ForecastBody;