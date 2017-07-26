import React, { PropTypes } from 'react';
import moment from 'moment';

class ForecastHeader extends React.Component {
  render() {
    return (
       <div className="header">
          Weather for {this.props.location}
      </div>
    )
  }
}

export default ForecastHeader;