import React, { Component } from 'react';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.place.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      this.props.place.marker.setAnimation(null);
     }, 1000);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="card">
        <h5 className="card-title">
          {this.props.place.name}
        </h5>  
        <p><i className="fa fa-star" aria-hidden="true"></i> {this.props.place.rating}</p>
        <p>Categories: {this.props.place.types[0].split('_').join(' ')}</p>
        <p><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.place.vicinity}</p>
      </div>
    );
  }
};

export default ListItem;