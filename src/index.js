import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import config from './config.js';
import './index.css';

import ForecastBody from './components/ForecastBody.js';
import SearchBar from './components/SearchBar'

const weatherApi = config.forecastUrl;
const weatherKey = config.forecastKey;
const locationApi = config.locationUrl;
const locationKey = config.locationKey;

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		error: '',
		lat: 30.2671530,
		lng: -97.7430610,
		location: 'Austin',
		forecast: []
    };

    this.searchWeather = this.searchWeather.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    
  }

  componentDidMount() {
  	this.fetchForecast(this.state.defaultLat, this.state.defaultLng);
  }

  searchWeather(address) {
  	this.geocodeAddress(this.state.location);
  }
  onCityChange(address) {
 	this.setState({ location: address });
  }

  geocodeAddress(address) {
  	request
  	.get(locationApi + address + '&key=' + locationKey)
  	.accept('json')
  	.end((err, res) => {
  		this.setState({
  			lat: res.body.results[0].geometry.location.lat,
  			lng: res.body.results[0].geometry.location.lng,
  		});
  		this.fetchForecast();
  	});
  }

  fetchForecast() {
  	request
  	.get(weatherApi+weatherKey+'/'+ this.state.lat + ',' + this.state.lng)
  	.accept('jsonp')
  	.end((err, res) => {
    	this.setState({ forecast: res.body.daily.data });
  	});
  }

  renderForecastedWeather() {
      const data = this.state.forecast;
      
      return data.map(weather => (
  		<div className="forecast-list-item" key={weather.time}>
          <ForecastBody weather={weather} />
        </div>
     ));
  }

  render() {
    return (
      <div className="forecast">
      	<SearchBar
      		onCityChange={this.onCityChange}
          	onSearch={this.searchWeather}
          	location={this.state.location}
        />
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