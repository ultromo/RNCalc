import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  
  navContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center'
  },
  
  disContainer: {
    flex: 7,
    backgroundColor: '#000000',
    justifyContent: 'center'
  },
  
  displayContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#000000',
    justifyContent: 'center'
  },
  
  displayText: {
    color: 'white',
    fontSize: 48,
    textAlign: 'right',
    padding: 20
  },
  
  inputContainer: {
    flex: 8,
    backgroundColor: '#DDDDDD'
  },
  
  inputButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000'
  },
  
  inputButtonHighlighted: {
    backgroundColor: '#999999'
  },
  
  inputButtonText: {
    fontSize: 24,
    color: 'grey'
  },
  
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  },
  
  menuText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  
  settingsContainer: {
    flex: 8,
    backgroundColor: '#FFFFFF'
  },
  
  settingsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderColor: '#000000'
  },
  
  settingsBackButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Style;
