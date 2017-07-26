import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import config from './config.js';
import './index.css';

import ForecastBody from './components/ForecastBody.js';
import ForecastHeader from './components/ForecastHeader.js';

const weatherApi = config.forecastUrl;
const weatherKey = config.forecastKey;
const locationApi = config.locationUrl;
const locationKey = config.locationKey;

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      lat: null,
      lng: null,
      location: '',
      forecast: []
    };
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleSuccess,
        this.handleError,
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 },
      );
    }
  }

  handleSuccess = (position) => {
    this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });

    this.fetchForecast();
    this.fetchLocation();
  }

  handleError = (error) => {
    if (error.code === 1) {
      this.setState({ error: 'Please allow location permissions' });
    }
    else {
    	console.log(error);
    	this.setState({ error: 'Woopsie doodles, something happened.'})
    }
  }

  fetchLocation() {
  	request
  	.get(locationApi+this.state.lat+','+this.state.lng+'&key='+locationKey)
  	.accept('jsonp')
  	.end((err, res) => {
  		this.setState({ location: res.body.results[4].formatted_address })
  	});
  }

  fetchForecast() {
  	request
  	.get(weatherApi+weatherKey+'/'+this.state.lat+','+this.state.lng)
  	.accept('jsonp')
  	.end((err, res) => {
    	this.setState({ forecast: res.body.daily.data });
    	console.log(this.state);
  	});
  }

  renderForecastedWeather() {
  	console.log(this.state);
    if (this.state.forecast && this.state.location) {
      const data = this.state.forecast;
      console.log(data);
      return data.map(weather => (
  		<div className="forecast-list-item" key={weather.time}>
          <ForecastBody icon={weather.icon} highTemp={weather.temperatureMax} lowTemp={weather.temperatureMin} />
        </div>
        
        ));
    }
  }

  render() {
    
    return (
      <div className="forecast">
      	<ForecastHeader location={this.state.location} />
          <div className="forecast-list">
	          {this.renderForecastedWeather()}
	        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <WeatherApp />,
  document.getElementById('root')
);