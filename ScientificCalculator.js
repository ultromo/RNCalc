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
  ['AC', 'RST', '(-)', 'π', 'e', '⌫'],
  ['(', ')', '%', '/', 'pow('],
  [7, 8, 9, '*', 'sin('],
  [4, 5, 6, '-', 'cos('],
  [1, 2, 3, '+', 'tan('],
  [0, '.', 'ln(', 'exp(', '=']
];

export default class ScientificCalculator extends React.Component {
  
  expression = [];
  expressionHistory = [];
  expressionPointer = 0;
  expressionInsert = 0;
  dExpression = '';
  Ans = 0;
  AnsMode = false;
  reflectMode = false;
  
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
  
  _resetAll(){
    this.expression = [];
    this.expressionInsert = 0;
    this.expressionHistory = [];
    this.expressionPointer = 0;
    this.Ans = 0;
    this.AnsMode = false;
    this.reflectMode = false;
    this._renderExpression();
  }
  
  _pushExpressionHistory(ex, exI){
    this.expressionHistory.unshift([ex, exI]);
  }
  
  _backExpressionHistory(){
    console.log("Backward");
    console.log(this.expressionHistory, this.expressionPointer);
    if (this.expressionPointer < this.expressionHistory.length){
      [this.expression, this.expressionInsert] = this.expressionHistory[this.expressionPointer];
      this.expressionPointer += 1;
      this._renderExpression();
      this.reflectMode = true;
    }
  }
  
  _forwardExpressionHistory(){
    console.log("Forward");
    console.log(this.expressionHistory, this.expressionPointer);
    if (this.expressionPointer > 1 && this.expressionHistory.length > 0){
      this.expressionPointer -= 2;
      [this.expression, this.expressionInsert] = this.expressionHistory[this.expressionPointer];
      this.expressionPointer += 1;
      this._renderExpression();
    }
    else{
      this.expression = [];
      this.expressionInsert = 0;
      this.expressionPointer = 0;
      this._renderExpression()
      this.reflectMode = false;
    }
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
    if (str !== '↑' && str !== '↓'){
      this.AnsMode = false;
    }
    switch (str) {
      case 'RST':
        this._resetAll();
        return;
      case '(-)':
        str = '-';
        break;
      case 'AC':
        this.expression = [];
        this.expressionInsert = 0;
        this._renderExpression();
        return;
      case '=':
        this.expressionPointer = 0;
        this.AnsMode = true;
        this.reflectMode = false;
        var evaluatedAnswer = this._evaluateExpression(this.expression);
        this._pushExpressionHistory(this.expression, this.expressionInsert);
        this.expression = [];
        this.expressionInsert = 0;
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
        if (this.expression.length > 0 && this.AnsMode == false && this.reflectMode == false){
          this._pushExpressionHistory(this.expression, this.expressionInsert);
          this.expressionPointer += 1;
          this.AnsMode = true;
        }
        this._backExpressionHistory();
        return;
      case '↓':
        this._forwardExpressionHistory();
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