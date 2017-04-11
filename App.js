'use strict';

var React = require('react');
var ReactNative = require('react-native');

import {
  View,
  Text,
  AppRegistry,
  Navigator,
  StatusBar
} from 'react-native';

import ClassicCalculator from './ClassicCalculator';

import SettingsPage from './SettingsPage';

import MainNaviPage from './MainNaviPage';

import Style from './Style';

export default class CalculatorApplication extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{screen: 'ClassicCalculator'}}
        renderScene={(route, nav) => {return this.renderScene(route, nav)}}
      />
    )
  }
  
  renderScene(route,nav) {
    switch(route.screen) {
      case 'ClassicCalculator':
        return <ClassicCalculator navigator={nav} />
      case 'MainNaviPage':
        return <MainNaviPage navigator={nav} />
      case 'SettingsPage':
        return <SettingsPage navigator={nav} />
    }
  }
}

ReactNative.AppRegistry.registerComponent('CalculatorApplication', function() { return CalculatorApplication });
