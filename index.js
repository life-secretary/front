/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';

// add to ignore warning "RCTBridge required dispatch_sync to load REAModule"
LogBox.ignoreLogs(['RCTBridge required dispatch_sync to load REAModule']);

// start App
AppRegistry.registerComponent(appName, () => App);
