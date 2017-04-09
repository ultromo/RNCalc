'use strict';

var React = require('react');
var ReactNative = require('react-native');

import {
  View,
  Text,
  AppRegistry,
  StyleSheet
} from 'react-native';

var Style = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  
  displayContainer: {
    flex: 2,
    backgroundColor: '#193441'
  },
  
  inputContainer: {
    flex: 8,
    backgroundColor: '#3E606F'
  }
});

export default class Calculator extends React.Component {
  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}></View>
        <View style={Style.inputContainer}></View>
      </View>
    )
  }
}

ReactNative.AppRegistry.registerComponent('Calculator', function() { return Calculator });
