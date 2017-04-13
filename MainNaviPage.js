import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import Style from './Style'

export default class MainNaviPage extends Component {
  render() {
    return (
      <View style={Style.inputContainer}>
        <TouchableHighlight style={Style.inputButton} onPress={this._goBack.bind(this)}>
          <Text style={Style.inputButtonText}>Back</Text>
        </TouchableHighlight>
        <TouchableHighlight style={Style.inputButton} onPress={this._goClassicCalculator.bind(this)}>
          <Text style={Style.inputButtonText}>Classic Calculator</Text>
        </TouchableHighlight>
        <TouchableHighlight style={Style.inputButton} onPress={this._goScientificCalculator.bind(this)}>
          <Text style={Style.inputButtonText}>Scientific Calculator</Text>
        </TouchableHighlight>
        <TouchableHighlight style={Style.inputButton} onPress={this._goSettings.bind(this)}>
          <Text style={Style.inputButtonText}>Settings</Text>
        </TouchableHighlight>
      </View>
    )
  }
  
  _goBack() {
    this.props.navigator.pop();
  }

  _goClassicCalculator() {
    this.props.navigator.replacePreviousAndPop({ screen: 'ClassicCalculator' });
  }
  
  _goScientificCalculator() {
    this.props.navigator.replacePreviousAndPop({ screen: 'ScientificCalculator' });
  }
  
  _goSettings() {
    this.props.navigator.push({ screen: 'SettingsPage' });
  }
}
