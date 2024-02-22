import React from 'react';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './src/screens/HomeScreen';
import {TodoScreen} from './src/screens/TodoScreen';
import {SaveScreen} from './src/screens/SaveScreen';
import {TodoDetailModalScreen} from './src/screens/TodoDetailModalScreen';
import {TodoFormModalScreen} from './src/screens/TodoFormModalScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Todo" component={TodoScreen} />
      <Tab.Screen name="Save" component={SaveScreen} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen
        options={{presentation: 'fullScreenModal'}}
        name="Modal"
        component={TodoDetailModalScreen}
      />
      <Stack.Screen
        options={{presentation: 'fullScreenModal'}}
        name="Form"
        component={TodoFormModalScreen}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

export default App;
