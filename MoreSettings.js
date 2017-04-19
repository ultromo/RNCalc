import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Switch, Slider } from 'react-native';

import Style from './Style'

GLOBAL = require('./Globals');

export default class MoreSettings extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      RCSwitchOn: GLOBAL.RSCP
    }
  }
  
  render() {
    return (
      <View style={Style.settingsContainer}>
        <TouchableHighlight style={Style.inputButton} onPress={this._goBack.bind(this)}>
          <Text style={Style.inputButtonText}>Back</Text>
        </TouchableHighlight>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Button font size</Text>
        </View>
        <View>
          <Slider 
            maximumValue={48}
            minimumValue={16} 
            step={0.5} 
            value={GLOBAL.IBS}
            onSlidingComplete={(value) => {GLOBAL.IBS=value}}
            />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Display font size</Text>
        </View>
        <View>
          <Slider 
            maximumValue={72}
            minimumValue={24} 
            step={0.5} 
            value={GLOBAL.DFS}
            onSlidingComplete={(value) => {GLOBAL.DFS=value}}
            />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Reset cursor position</Text>
          <Switch
            onValueChange={(value) => {GLOBAL.RSCP=value; this.setState({RCSwitchOn: value})}}
            value={this.state.RCSwitchOn} />
        </View>
        <TouchableHighlight style={Style.inputButton} onPress={this._goColourSettings.bind(this)}>
          <Text style={Style.inputButtonText}>Colour Settings</Text>
        </TouchableHighlight>
      </View>
    )
  }
  
  _goBack() {
    this.props.navigator.pop();
  }
  
  _goColourSettings(){
    this.props.navigator.push({ screen: 'ColourSettings' });
  }
}

