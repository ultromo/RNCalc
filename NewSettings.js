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

export default class NewSettings extends Component {
  constructor(props){
    super(props);
    //this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      RCSwitchOn: GLOBAL.RSCP,
      SFSwitchOn: GLOBAL.SFO,
      AMSwitchOn: GLOBAL.STRICT,
      MDSwitchOn: GLOBAL.MDP,
      RSSwitchOn: GLOBAL.RSTOE,
      RISwitchOn: GLOBAL.RSTOI,
      DESwitchOn: GLOBAL.DEDUP,
      DGSwitchOn: GLOBAL.DEGS,
      DFS: GLOBAL.DFS.toString(),
      IBS: GLOBAL.IBS.toString(),
      SBS: GLOBAL.SBS.toString(),
      SF: GLOBAL.SF.toString(),
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
            <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
          </View>
          <View style={{flex:1}}>
          </View>
        </View>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            {/*<SettingsList.Header headerStyle={{marginTop:15}}/>
            {this.state.toggleAuthView ?
              <SettingsList.Item
                title='Logged In As...'
                hasNavArrow={false}
              />
              :
              <SettingsList.Item
                isAuth={true}
                authPropsUser={{placeholder:'E-mail'}}
                authPropsPW={{placeholder:'Password'}}
                onPress={() => this.toggleAuthView()}
              />
            }*/}
{/*
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
 */} 
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.DGSwitchOn}
              switchOnValueChange={(value) => {GLOBAL.DEGS=value; this.setState({DGSwitchOn: value})}}
              hasNavArrow={false}
              title='Use degrees instead of radians'
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.RSSwitchOn}
              switchOnValueChange={(value) => {GLOBAL.RSTOE=value; this.setState({RSSwitchOn: value})}}
              hasNavArrow={false}
              title='Clear expression on eval'
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.RISwitchOn}
              switchOnValueChange={(value) => {GLOBAL.RSTOI=value; this.setState({RISwitchOn: value})}}
              hasNavArrow={false}
              title='Clear expression on input'
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.DESwitchOn}
              switchOnValueChange={(value) => {GLOBAL.DEDUP=value; this.setState({DESwitchOn: value})}}
              hasNavArrow={false}
              title='Deduplicate history'
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.AMSwitchOn}
              switchOnValueChange={(value) => {GLOBAL.STRICT=value; this.setState({AMSwitchOn: value})}}
              hasNavArrow={false}
              title='Wrap Ans in brackets'
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.RCSwitchOn}
              switchOnValueChange={(value) => {GLOBAL.RSCP=value; this.setState({RCSwitchOn: value})}}
              hasNavArrow={false}
              title='Reset cursor position'
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.MDSwitchOn}
              switchOnValueChange={(value) => {GLOBAL.MDP=value; this.setState({MDSwitchOn: value})}}
              hasNavArrow={false}
              title='Round answers to 10 dec. places'
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.SFSwitchOn}
              switchOnValueChange={(value) => {GLOBAL.SFO=value; this.setState({SFSwitchOn: value})}}
              hasNavArrow={false}
              title='Round answers to sig. figures'
            />
            <SettingsList.Item
              title='Precision'
              hasNavArrow={false}
              titleInfo={this.state.SF+" sf"}
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <Slider 
              maximumValue={10}
              minimumValue={2} 
              step={1} 
              value={GLOBAL.SF}
              onValueChange={(value) => {this.setState({SF: value.toString()})}}
              onSlidingComplete={(value) => {GLOBAL.SF=value}}
            />
            <SettingsList.Item
              title='Classic calculator button font size'
              hasNavArrow={false}
              titleInfo={this.state.IBS}
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <Slider 
              maximumValue={48}
              minimumValue={8} 
              step={0.5} 
              value={GLOBAL.IBS}
              onValueChange={(value) => {this.setState({IBS: value.toString()})}}
              onSlidingComplete={(value) => {GLOBAL.IBS=value}}
            />
            <SettingsList.Item
              title='Scientific calculator button font size'
              hasNavArrow={false}
              titleInfo={this.state.SBS}
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <Slider 
              maximumValue={48}
              minimumValue={8} 
              step={0.5} 
              value={GLOBAL.SBS}
              onValueChange={(value) => {this.setState({SBS: value.toString()})}}
              onSlidingComplete={(value) => {GLOBAL.SBS=value}}
            />
            <SettingsList.Item
              title='Display font size'
              hasNavArrow={false}
              titleInfo={this.state.DFS}
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <Slider 
              maximumValue={72}
              minimumValue={24} 
              step={0.5} 
              value={GLOBAL.DFS}
              onValueChange={(value) => {this.setState({DFS: value.toString()})}}
              onSlidingComplete={(value) => {GLOBAL.DFS=value}}
            />
            <SettingsList.Item
              title='Help'
              onPress={() => this.props.navigator.push({ screen: 'HelpSettings' })}
              underlayColor='#999999'
            />
            {/*
            <SettingsList.Item
              title='Wi-Fi'
              titleInfo='Bill Wi The Science Fi'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Wifi Page')}
            />
            <SettingsList.Item
              title='Blutooth'
              titleInfo='Off'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Blutooth Page')}
            />
            <SettingsList.Item
              title='Cellular'
              onPress={() => Alert.alert('Route To Cellular Page')}
            />
            <SettingsList.Item
              title='Personal Hotspot'
              titleInfo='Off'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route To Hotspot Page')}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Notifications'
              onPress={() => Alert.alert('Route To Notifications Page')}
            />
            <SettingsList.Item
              title='Control Center'
              onPress={() => Alert.alert('Route To Control Center Page')}
            />
            <SettingsList.Item
              title='Do Not Disturb'
              onPress={() => Alert.alert('Route To Do Not Disturb Page')}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='General'
              onPress={() => Alert.alert('Route To General Page')}
            />
            <SettingsList.Item
              title='Display & Brightness'
              onPress={() => Alert.alert('Route To Display Page')}
            />
            */}
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
  /*
  toggleAuthView() {
    this.setState({toggleAuthView: !this.state.toggleAuthView});
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
  */
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
