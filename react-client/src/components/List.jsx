import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <section className="list-group list">
      <h3>Agents Near Your Search</h3>
      {props.searchedResults.map(place => <ListItem place={place} key={place.place_id}/>
    )}
  </section>
);

export default List;