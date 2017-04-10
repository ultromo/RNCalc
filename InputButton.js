import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import Style from './Style';

export default class InputButton extends Component {
  render() {
    return (
      <TouchableHighlight style={Style.inputButton}
        underlayColor="#888888"
        onPress={this.props.onPress}>
        <Text style={Style.inputButtonText}>{this.props.value}</Text>
      </TouchableHighlight>
    )
  }
}
