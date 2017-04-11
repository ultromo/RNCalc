import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Switch, Slider } from 'react-native';

import Style from './Style'

GLOBAL = require('./Globals');

export default class SettingsPage extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      SFSwitchOn: GLOBAL.SFO
    }
  }
  
  render() {
    return (
      <View style={Style.inputContainer}>
        <TouchableHighlight style={Style.inputButton} onPress={this._goBack.bind(this)}>
          <Text style={Style.inputButtonText}>Back</Text>
        </TouchableHighlight>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Display all numbers to Sf</Text>
          <Switch
            onValueChange={(value) => {GLOBAL.SFO=value; this.setState({SFSwitchOn: value})}}
            value={this.state.SFSwitchOn} />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Precision</Text>
        </View>
        <View>
          <Slider 
            maximumValue={10}
            minimumValue={2} 
            step={1} 
            value={GLOBAL.SF}
            onSlidingComplete={(value) => {GLOBAL.SF=value}}
            />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Settings</Text>
        </View>
      </View>
    )
  }
  
  _goBack() {
    this.props.navigator.pop();
  }
}

