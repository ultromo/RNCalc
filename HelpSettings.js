'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Slider,
  StatusBar,
  TouchableHighlight
} from 'react-native';

import SettingsList from 'react-native-settings-list';

import Icon from 'react-native-vector-icons/FontAwesome';

GLOBAL = require('./Globals');

export default class HelpSettings extends Component {
  constructor(props){
    super(props);
    this.state = {
      BC: "#007AFF"
    }
  }
  render() {
    var bgColor = '#DCE3F4';
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <StatusBar
          barStyle="dark-content"
        />
        <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc',flexDirection:'row',paddingLeft:10,paddingRight:10}}>
          <TouchableHighlight style={[{alignSelf:'center',flex:1,marginTop:30,marginBottom:10},this.props.highlight ? {alignSelf:'center',flex:1,marginTop:30,marginBottom:10,backgroundColor:'#f7f7f8'} : null]} onPress={this._goBack.bind(this)} onShowUnderlay={this._lightButton.bind(this)} onHideUnderlay={this._darkButton.bind(this)} underlayColor='#f7f7f8'>
            <Icon name="chevron-left" size={25} color={this.state.BC} />
          </TouchableHighlight>
          <View style={{flex:4}}>
            <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Help</Text>
          </View>
          <View style={{flex:1}}>
          </View>
        </View>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              hasNavArrow={false}
              title={'AC\nClear input'}
            />
            <SettingsList.Item
              hasNavArrow={false}
              title={'RST\nClear input as well as history'}
            />
            <SettingsList.Item
              hasNavArrow={false}
              title={'(-)\nNegate number'}
            />
            <SettingsList.Item
              hasNavArrow={false}
              title={'pow(a, b)\nEquivalent to a^b'}
            />
            <SettingsList.Item
              hasNavArrow={false}
              title={'log(a, b)\nLogarithm of a to base b'}
            />
            <SettingsList.Item
              hasNavArrow={false}
              title={'fac(a)\nFactorial of a'}
            />
            <SettingsList.Item
              hasNavArrow={false}
              title={'%\nModulo'}
            />
            <SettingsList.Item
              hasNavArrow={false}
              title={'← →\nMove cursor'}
            />
            <SettingsList.Item
              hasNavArrow={false}
              title={'↑ ↓\nNavigate history'}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              hasNavArrow={false}
              title={'Colour pickers\nSliders - (Hue, Saturation, Value)'}
            />
          </SettingsList>
        </View>
      </View>
    );
  }
    
  _goBack() {
    this.props.navigator.pop();
  }
  
  _lightButton() {
    this.setState({
      BC: "#229CFF"
    });
  }
  
  _darkButton() {
    this.setState({
      BC:"#007AFF"
    });
  }
}

const styles = StyleSheet.create({
  imageStyle:{
    marginLeft:15,
    alignSelf:'center',
    height:30,
    width:30
  },
  titleInfoStyle:{
    fontSize:16,
    color: '#8e8e93'
  }
});

