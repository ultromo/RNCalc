import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

GLOBAL = require('./Globals');

import Style from './Style';

export default class InputButton extends Component {
  render() {
    return (
      <TouchableHighlight style={[Style.inputButton, this.props.highlight ? Style.inputButtonHighlighted : null]}
        underlayColor="#999999"
        onPress={this.props.onPress}>
        <Text style={[Style.inputButtonText, { fontSize: GLOBAL.IBS, color: GLOBAL.TCLR }]}>{this.props.value}</Text>
      </TouchableHighlight>
    )
  }
}
