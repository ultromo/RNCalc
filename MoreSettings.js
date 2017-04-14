import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Switch, Slider } from 'react-native';

import Style from './Style'

GLOBAL = require('./Globals');

export default class MoreSettings extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }
  
  render() {
    return (
      <View style={Style.inputContainer}>
        <TouchableHighlight style={Style.inputButton} onPress={this._goBack.bind(this)}>
          <Text style={Style.inputButtonText}>Back</Text>
        </TouchableHighlight>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Colour Settings</Text>
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Font size</Text>
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
      </View>
    )
  }
  
  _goBack() {
    this.props.navigator.pop();
  }
}

