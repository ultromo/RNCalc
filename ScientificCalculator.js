'use strict';

var React = require('react');
var ReactNative = require('react-native');

GLOBAL = require('./Globals');

import {
  View,
  Text,
  AppRegistry,
  StatusBar,
  TouchableHighlight
} from 'react-native';

import Style from './Style';

import InputButton from './InputButton';

const inputButtons = [
  ['Ans', ',', '←', '→', '↑', '↓'],
  ['(', ')', 'π', 'e', 'pow('],
  ['AC', '(-)', '%', '/', '⌫'],
  [7, 8, 9, '*', 'sin('],
  [4, 5, 6, '-', 'cos('],
  [1, 2, 3, '+', 'tan('],
  [0, '.', 'ln(', 'exp(', '=']
];

export default class ScientificCalculator extends React.Component {
  
  expression = [];
  expressionInsert = 0;
  dExpression = '';
  Ans = 0;
  
  constructor(props) {
    super(props);
    
    this.state = {
      previousInputValue: 0,
      displayExpression: '|',
    }
  }
  
  render() {
    return (
      <View style={Style.rootContainer}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
        />
        <View style={Style.displayContainer}>
          <View style={Style.navContainer}>
            <TouchableHighlight onPress={this._goMenu.bind(this)}>
              <Text style={Style.menuText}>☰</Text>
            </TouchableHighlight>
          </View>
          <View style={Style.disContainer}>
            <Text style={Style.displayText}>{this.state.displayExpression}</Text>
          </View>
        </View>
        <View style={Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    )
  }
  
  _goMenu(){
    this.props.navigator.push({ screen: 'MainNaviPage' });
  }
  
  _renderInputButtons() {
    let views = [];
    
    for (var r = 0; r < inputButtons.length; r++){
      let row = inputButtons[r];
      
      let inputRow = [];
      for (var i = 0; i < row.length; i++){
        let input = row[i];
        
        inputRow.push(
          <InputButton
            value={input}
            onPress={this._onInputButtonPressed.bind(this, input)}
            key={r + "-" + i}/>
          );
      }
      
      views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
    }
    
    return views;
  }
  
  _onInputButtonPressed(input) {
    return this._handleInput(input)
  }
  
  _renderExpression(){
    this.dExpression = '';
    this.expression.splice(this.expressionInsert, 0, '|');
    for (var r = 0; r < this.expression.length; r++){
      let subExp = this.expression[r];
      this.dExpression = this.dExpression.concat(subExp);
    }
    this.setState({
      displayExpression: this.dExpression
    });
    this.expression.splice(this.expressionInsert, 1);
  }
  
  _evaluateExpression(){
    var evExpression = '';
    for (var r = 0; r < this.expression.length; r++){
      let subExp = this.expression[r];
      switch (subExp) {
        case 'π':
          evExpression = evExpression.concat(' Math.PI ');
          break;
        case 'e':
          evExpression = evExpression.concat(' Math.E ');
          break;
        case 'sin(':
          evExpression = evExpression.concat(' Math.sin( ');
          break;
        case 'cos(':
          evExpression = evExpression.concat(' Math.cos( ');
          break;
        case 'tan(':
          evExpression = evExpression.concat(' Math.tan( ');
          break;
        case 'exp(':
          evExpression = evExpression.concat(' Math.exp( ');
          break;
        case 'pow(':
          evExpression = evExpression.concat(' Math.pow( ');
          break;
        case 'ln(':
          evExpression = evExpression.concat(' Math.log( ');
          break;
        case 'Ans':
          if (GLOBAL.STRICT == true){
            evExpression = evExpression.concat('(' + this.Ans.toString() + ')');
          }
          else{
            evExpression = evExpression.concat(this.Ans.toString());
          }
          break;
        default:
          evExpression = evExpression.concat(subExp);
      }
    }
    console.log(evExpression);
    try{
      var a = eval(evExpression);
      return a;
    }
    catch(err){
      var a = err;
      return a.toString();
    }
  }
  
  _handleInput(str) {
    switch (str) {
      case '(-)':
        str = '-';
        break;
      case 'AC':
        this.expression = [];
        this.expressionInsert = 0;
        this._renderExpression();
        return;
      case '=':
        var evaluatedAnswer = this._evaluateExpression(this.expression);
        if (GLOBAL.SFO == true){
          if (typeof(evaluatedAnswer) === 'number'){
            this.setState({
              displayExpression: evaluatedAnswer.toPrecision(GLOBAL.SF)
            });
            this.Ans = evaluatedAnswer;
          }
          else{
            this.setState({
              displayExpression: evaluatedAnswer
            });
          }
        }
        else{
          this.setState({
            displayExpression: evaluatedAnswer
          });
          if (typeof(evaluatedAnswer) === 'number'){
            this.Ans = evaluatedAnswer;
          }
        }
        return;
      case '←':
        if (this.expressionInsert > 0){
          this.expressionInsert -= 1;
        }
        this._renderExpression();
        return;
      case '→':
        if (this.expressionInsert < this.expression.length){
          this.expressionInsert += 1;
        }
        this._renderExpression();
        return;
      case '↑':
        return;
      case '↓':
        return;
      case '⌫':
        if (this.expressionInsert > 0){
          this.expressionInsert -= 1;
          this.expression.splice(this.expressionInsert, 1);
          this._renderExpression();
        }
        return;
    }
    this.expression.splice(this.expressionInsert, 0, str);
    this.expressionInsert += 1;
    this._renderExpression();
  }
}
