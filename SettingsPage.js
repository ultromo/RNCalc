import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Switch, Slider, StatusBar } from 'react-native';

import Style from './Style'

GLOBAL = require('./Globals');

export default class SettingsPage extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      SFSwitchOn: GLOBAL.SFO,
      AMSwitchOn: GLOBAL.STRICT,
      MDSwitchOn: GLOBAL.MDP,
      RSSwitchOn: GLOBAL.RSTOE,
      RISwitchOn: GLOBAL.RSTOI,
      DESwitchOn: GLOBAL.DEDUP
    }
  }
  
  render() {
    return (
      <View style={Style.settingsContainer}>
        <StatusBar
          barStyle="dark-content"
        />
        <TouchableHighlight style={Style.inputButton} onPress={this._goBack.bind(this)}>
          <Text style={Style.inputButtonText}>Back</Text>
        </TouchableHighlight>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Clear expression on eval</Text>
          <Switch
            onValueChange={(value) => {GLOBAL.RSTOE=value; this.setState({RSSwitchOn: value})}}
            value={this.state.RSSwitchOn} />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Clear expression on input</Text>
          <Switch
            onValueChange={(value) => {GLOBAL.RSTOI=value; this.setState({RISwitchOn: value})}}
            value={this.state.RISwitchOn} />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Deduplicate history</Text>
          <Switch
            onValueChange={(value) => {GLOBAL.DEDUP=value; this.setState({DESwitchOn: value})}}
            value={this.state.DESwitchOn} />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Strict mode</Text>
          <Switch
            onValueChange={(value) => {GLOBAL.STRICT=value; this.setState({AMSwitchOn: value})}}
            value={this.state.AMSwitchOn} />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Limit dp</Text>
          <Switch
            onValueChange={(value) => {GLOBAL.MDP=value; this.setState({MDSwitchOn: value})}}
            value={this.state.MDSwitchOn} />
        </View>
        <View style={Style.inputButton}>
          <Text style={Style.inputButtonText}>Display all answers to Sf</Text>
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
        <TouchableHighlight style={Style.inputButton} onPress={this._goMoreSettings.bind(this)}>
          <Text style={Style.inputButtonText}>More Settings</Text>
        </TouchableHighlight>
      </View>
    )
  }
  
  _goBack() {
    this.props.navigator.pop();
  }
  
  _goMoreSettings() {
    this.props.navigator.push({ screen: 'MoreSettings' });
  }
}

