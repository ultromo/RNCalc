import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Switch, Slider } from 'react-native';

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
      <View style={Style.inputContainer}>
        <TouchableHighlight style={Style.inputButton} onPress={this._goBack.bind(this)}>
          <Text style={Style.inputButtonText}>Back</Text>
        </TouchableHighlight>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Button red</Text>
        </View>
        <View>
          <Slider 
            maximumValue={256}
            minimumValue={0} 
            step={0.5} 
            value={GLOBAL.BR}
            onSlidingComplete={(value) => {GLOBAL.BR=value}}
            />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Button green</Text>
        </View>
        <View>
          <Slider 
            maximumValue={256}
            minimumValue={0} 
            step={0.5} 
            value={GLOBAL.BG}
            onSlidingComplete={(value) => {GLOBAL.BG=value}}
            />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Button blue</Text>
        </View>
        <View>
          <Slider 
            maximumValue={256}
            minimumValue={0} 
            step={0.5} 
            value={GLOBAL.BB}
            onSlidingComplete={(value) => {GLOBAL.BB=value}}
            />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Text red</Text>
        </View>
        <View>
          <Slider 
            maximumValue={256}
            minimumValue={0} 
            step={0.5} 
            value={GLOBAL.TR}
            onSlidingComplete={(value) => {GLOBAL.TR=value}}
            />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Text blue</Text>
        </View>
        <View>
          <Slider 
            maximumValue={256}
            minimumValue={0} 
            step={0.5} 
            value={GLOBAL.TB}
            onSlidingComplete={(value) => {GLOBAL.TB=value}}
            />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Text green</Text>
        </View>
        <View>
          <Slider 
            maximumValue={256}
            minimumValue={0} 
            step={0.5} 
            value={GLOBAL.TG}
            onSlidingComplete={(value) => {GLOBAL.TG=value}}
            />
        </View>
      </View>
    )
  }
  
  _goBack() {
    this.props.navigator.pop();
  }
}


