import React from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import config from '../config.js';

const locationApi = config.locationUrl;
const locationKey = config.locationKey;

class SearchBar extends React.Component {
	constructor(props) {
	    super(props);

	    this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  handleSubmit(event) {
	    this.props.searchWeather(event.target.value);
	    event.preventDefault();
	  }

	  render() {
	    return (
	      <form onSubmit={this.handleSubmit}>
	        <label>
	          Name: {this.props.value}
	          <input type="text" value={this.props.value} />
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
	    );
	  }
	// f
	// constructor() {
	// 	super();

	// 	this.state = {
	// 		lat: null,
	// 		lng: null,

	// 	}
	// }

	// componentWillMount() {
	//     this.getLocation();
	//   }

	// getLocation() {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(
	// 		this.handleSuccess,
	// 		this.handleError,
	// 		{ enableHighAccuracy: false, timeout: 30000, maximumAge: 30000 },
	// 		);
	// 	}
	// }

	// handleSuccess = (position) => {
	// 	this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });

	// 	this.fetchForecast();
	// 	this.fetchLocation();
	// }

	// handleError = (error) => {
	// 	if (error.code === 1) {
	// 	this.setState({ error: 'Please allow location permissions' });
	// 	}
	// 	else {
	// 		console.log(error);
	// 		this.setState({ error: 'Woopsie doodles, something happened.'})
	// 	}
	// }

	// fetchLocation() {
	//   	request
	//   	.get(locationApi+this.state.lat+','+this.state.lng+'&key='+locationKey)
	//   	.accept('jsonp')
	//   	.end((err, res) => {
	//   		this.setState({ location: res.body.results[4].formatted_address })
	//   	});
	//   }
}

export default SearchBar;