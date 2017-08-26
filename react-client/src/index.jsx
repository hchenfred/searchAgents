import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Map from '../src/components/Map.jsx';
import Form from '../src/components/Form.jsx';
import List from '../src/components/List.jsx';
import './style.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: {},
      address2: {},
      searchedResults: []
    }
    this.setAddresses = this.setAddresses.bind(this);
    this.saveSearchedResults = this.saveSearchedResults.bind(this);
  }

  setAddresses(addresses) {
    this.setState({address1: addresses[0], address2: addresses[1]});
  }

  saveSearchedResults(results) {
    this.setState({searchedResults: results});
  }

  render() {
    return (
      <div className="container">
        <aside className="side-container">
          <Form setAddresses={this.setAddresses}/>
          <List searchedResults={this.state.searchedResults}/>
        </aside>
        <article className="map-container">
          <Map 
          address1={this.state.address1}
          address2={this.state.address2}
          saveSearchedResults={this.saveSearchedResults}/>
        </article>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));