import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Switch, Slider } from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

import Style from './Style'

GLOBAL = require('./Globals');

export default class ColourSettings extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }
  
  render() {
    return (
      <View style={Style.settingsContainer}>
        <TouchableHighlight style={Style.inputButton} onPress={this._goBack.bind(this)}>
          <Text style={Style.inputButtonText}>Back</Text>
        </TouchableHighlight>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Button colour</Text>
        </View>
        <ColorPicker
          defaultColor={GLOBAL.BCLR}
          onColorChange={(color) => {GLOBAL.BCLR=fromHsv(color)}}
          style={{flex: 2}}
        />
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Text colour</Text>
        </View>
        <ColorPicker
          defaultColor={GLOBAL.TCLR}
          onColorChange={(color) => {GLOBAL.TCLR=fromHsv(color)}}
          style={{flex: 2}}
        />
      </View>
    )
  }
  
  _goBack() {
    this.props.navigator.pop();
  }
}


