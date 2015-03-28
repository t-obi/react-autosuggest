'use strict';

import React from 'react';
import Autosuggest from '../../../src/Autosuggest';
import suburbs from 'json!../suburbs.json';

function getLocations(input, callback) {
  var suburbMatchRegex = new RegExp('^' + input, 'i');
  var locations = suburbs.filter(function(suburbObj) {
    return suburbObj.suburb.search(suburbMatchRegex) !== -1;
  }).slice(0, 7);

  // 'locations' will be an array of objects, e.g.:
  //   [{ suburb: 'Mentone', postcode: '3194' },
  //    { suburb: 'Mill Park', postcode: '3082' },
  //    { suburb: 'Mordialloc', postcode: '3195' }]

  setTimeout(function() {
    callback(null, locations);
  }, 300);
}

function renderLocation(suggestionObj, input) {
  var suburbMatchRegex = new RegExp('\\b' + input, 'i');
  var firstMatchIndex = suggestionObj.suggestion.search(suburbMatchRegex);

  if (firstMatchIndex === -1) {
    return (
      <span>{suggestionObj.suggestion} VIC {suggestionObj.postcode}</span>
    );
  }

  var beforeMatch = suggestionObj.suggestion.slice(0, firstMatchIndex);
  var match = suggestionObj.suggestion.slice(firstMatchIndex, firstMatchIndex + input.length);
  var afterMatch = suggestionObj.suggestion.slice(firstMatchIndex + input.length);

  return (
    <span>{beforeMatch}<strong>{match}</strong>{afterMatch} VIC {suggestionObj.postcode}</span>
  );
}

class CustomRenderer extends React.Component {
  render() {
    var inputAttributes = {
      id: 'custom-renderer',
      placeholder: 'Where are you based?'
    };

    return (
      <Autosuggest inputAttributes={inputAttributes}
                   suggestions={getLocations}
                   suggestionRenderer={renderLocation}
                   key="custom-renderer" />
    );
  }
}

export default CustomRenderer;