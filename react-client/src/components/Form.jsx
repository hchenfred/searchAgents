import React, {Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm1: '',
      searchTerm2: ''
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.onPlace1Changed = this.onPlace1Changed.bind(this);
    this.onPlace2Changed = this.onPlace2Changed.bind(this);
  }

  componentDidMount() {
    var center = new google.maps.LatLng(30.267153, -97.7430608);
    var circle = new google.maps.Circle({
        center: center,
        radius: 10000
    });
    this.autocomplete1 = new google.maps.places.Autocomplete((
      document.getElementById('autocomplete1')), {
      types: ['address'],
      componentRestrictions: {country: 'us'}
    });
    this.autocomplete1.setBounds(circle.getBounds());
    this.autocomplete1.addListener('place_changed', this.onPlace1Changed);  
    this.autocomplete2 = new google.maps.places.Autocomplete((
      document.getElementById('autocomplete2')), {
      types: ['address'],
      componentRestrictions: {country: "us"}
    });
    this.autocomplete2.setBounds(circle.getBounds());
    this.autocomplete2.addListener('place_changed', this.onPlace2Changed); 
  }

  onPlace1Changed() {
    const place1 = this.autocomplete1.getPlace();
    this.setState({searchTerm1: place1});
  }

  onPlace2Changed() {
    const place2 = this.autocomplete2.getPlace();
    this.setState({searchTerm2: place2});
  }

  handleSubmitForm(e) {
    e.preventDefault();
    let geometry1 = this.state.searchTerm1.geometry;
    let geometry2 = this.state.searchTerm2.geometry;
    if (geometry1 === null || geometry1 === undefined || geometry2 === null || geometry2 === undefined) {
      document.querySelector('.dropdown-info').style.display = 'block';
    } else {
      console.log('....');
      // const lat1 = geometry1.location.lat();
      // const lng1 = geometry1.location.lng();
      // const lat2 = geometry2.location.lat();
      // const lng2 = geometry2.location.lng();
      this.props.setAddresses([this.state.searchTerm1, this.state.searchTerm2]);
    }
  }

  render() {
    return (<div className="form-container">
      <form onSubmit={this.handleSubmitForm} className="location-form">
        <h4>Search for Real Estate Agencies Nearby</h4>
        <div className="row">
        <div className="form-group">
          <input onChange={this.handleInputChange} id="autocomplete1" 
          className="form-control formInput" 
          type="text" 
          placeholder="Enter first address" 
          required/>
          <div className="dropdown-info">Please use autocompleted address</div>
        </div>
        <div className="form-group">
          <input onChange={this.handleInputChange} id="autocomplete2" 
          className="form-control formInput" 
          type="text" 
          placeholder="Enter second address" 
          required/>
          <div className="dropdown-info">Please use autocompleted address</div>
        </div>
        <div className="form-group">
          <input className="btn btn-info formInput submitBtn btn-block" type="submit" value="Search"/>
        </div>
        </div>
      </form>
    </div>);
  }
}

export default Form;