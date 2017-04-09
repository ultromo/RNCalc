'use strict';

var React = require('react');
var ReactNative = require('react-native');

import {
  View,
  Text,
  AppRegistry
} from 'react-native';

import Style from './Style';

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
