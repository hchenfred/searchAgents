import React, {Component} from 'react';
import _ from 'lodash';
import agentImg from '../img/agent.png';
import houseImg from '../img/house.png';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.infowindow = null;
    this.createMarker = this.createMarker.bind(this);
    this.nearbySearchAsync = this.nearbySearchAsync.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
  }

  componentDidMount() {
    this.initMap({lat: 30.267153, lng:  -97.7430608});
  }

  initMap(currLocation) {
    this.map = new google.maps.Map(this.refs.map, {
      center: currLocation,
      zoom: 12
    });

    this.infowindow = new google.maps.InfoWindow();
    this.service = new google.maps.places.PlacesService(this.map);
    this.markers = [];
    this.nearbySearchAsync(currLocation, 16000)
    .then(results => {
      results.forEach(place => {
        let marker = this.createMarker(place, agentImg);
        this.markers.push(marker);
      });
      this.props.saveSearchedResults(results);
    });
  }
  
  //promisify this.service.nearBySearch
  nearbySearchAsync(location, radius) {
    var options = {
      location,
      radius,
      type: ['real_estate_agency']
    };

    // return promise
    return new Promise((resolve,reject) => {
      this.service.nearbySearch(options, (results,status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // resolve promise with results on OK status
          resolve(results);
        } else {
          // reject promise otherwise
          reject(status);
        }
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.address1) && !_.isEmpty(nextProps.address2) && !_.isEqual(nextProps.address1, this.props.address1)) {
      this.createMarker(nextProps.address1, houseImg);
      this.createMarker(nextProps.address2, houseImg);
      Promise.all([this.nearbySearchAsync(nextProps.address1.geometry.location, 16000), this.nearbySearchAsync(nextProps.address2.geometry.location, 16000)])
      .then(results => {
        this.clearMarkers();
        var combinedResults = results[0].concat(results[1]);
        combinedResults = _.uniqWith(combinedResults, (a,b) => {
          return a.id === b.id;
        }).sort((a, b) => {
          return google.maps.geometry.spherical.computeDistanceBetween(a.geometry.location, nextProps.address1.geometry.location) + google.maps.geometry.spherical.computeDistanceBetween(a.geometry.location, nextProps.address2.geometry.location) - google.maps.geometry.spherical.computeDistanceBetween(b.geometry.location, nextProps.address1.geometry.location) - google.maps.geometry.spherical.computeDistanceBetween(b.geometry.location, nextProps.address2.geometry.location);
        });
        combinedResults.forEach(place => {
          let marker = this.createMarker(place, agentImg);
          place.marker = marker;
          this.markers.push(marker);
        });
        this.props.saveSearchedResults(combinedResults);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    })
  }

  createMarker(place, img) {
   const pinIcon = new google.maps.MarkerImage(
        img,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(40, 40),
    );    
    //const placeLoc = place.geometry.location;
    const marker = new google.maps.Marker({
      map: this.map,
      icon: pinIcon,
      position: place.geometry.location
    });

    const infowindow = new google.maps.InfoWindow({
          content: `<div>${place.name}</div>`,
    });

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.open(this.map, marker);
      setTimeout(() => { infowindow.close(); }, '1000');
    });

    return marker;
  }

  render() {
    return (
      <div ref="map" className="map" />
    );
  }
};

export default Map;