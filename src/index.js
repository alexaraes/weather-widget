import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import config from './config.js';
import './index.css';

import ForecastBody from './components/ForecastBody.js';
import SearchBar from './components/SearchBar'

const weatherApi = config.forecastUrl;
const weatherKey = config.forecastKey;

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
  	
  	console.log('searching', this.state.location);
  }

  onCityChange(address) {
  	this.setState({ location: address });
  	console.log('changing:', this.state.location);
  }

  geocodeAddress(e, address) {
  	e.preventDefault();
  	this.searchWeather(address).bind(this);
    // this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

    //   if (status === google.maps.GeocoderStatus.OK) {

    //     this.setState({
    //       foundAddress: results[0].formatted_address,
    //       isGeocodingError: false
    //     });

    //     this.map.setCenter(results[0].geometry.location);
    //     this.marker.setPosition(results[0].geometry.location);

    //     return;
    //   }

    //   this.setState({
    //     foundAddress: null,
    //     isGeocodingError: true
    //   });

    //   this.map.setCenter({
    //     lat: ATLANTIC_OCEAN.latitude,
    //     lng: ATLANTIC_OCEAN.longitude
    //   });

    //   this.marker.setPosition({
    //     lat: ATLANTIC_OCEAN.latitude,
    //     lng: ATLANTIC_OCEAN.longitude
    //   });

    // }.bind(this));
  }

  fetchForecast(lat, lng) {
  	console.log('hello');
  	request
  	.get(weatherApi+weatherKey+'/'+ this.state.lat + ',' + this.state.lng)
  	.accept('jsonp')
  	.end((err, res) => {
  		console.log(res);
    	this.setState({ forecast: res.body.daily.data });
  	});
  }

  renderForecastedWeather() {
      const data = this.state.forecast;
      console.log(data);
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
          	value={this.state.value}
        />
      	<h1>Weather for {this.state.location}</h1>
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