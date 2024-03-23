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

import SearchScreen from './src/screens/SearchScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Todo" component={TodoScreen} />
      <Tab.Screen name="Save" component={SaveScreen} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
        <Stack.Screen
          name="TodoDetailModal"
          component={TodoDetailModalScreen}
        />
        <Stack.Screen name="TodoForm" component={TodoFormModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}

export default App;
