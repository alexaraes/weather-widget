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
	  	event.preventDefault();
	    this.props.onSearch(this.refs.input.value);
	    
	  }

	  render() {
	    return (
	    	<div>
		      <div>
		        <label>
		        	Search the forecast for your city: 
		          <input className="search-bar" ref="input" type="text" value={this.props.value} />
		        </label>
		        <input type="submit" value="Submit" onClick={this.handleSubmit} />
		      </div>
		      <div><h1>Weather for {this.props.location}</h1></div>
	      </div>
	    );
	  }
}

export default SearchBar;