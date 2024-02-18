import React from 'react';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './src/screens/HomeScreen';
import {TodoScreen} from './src/screens/TodoScreen';
import {SaveScreen} from './src/screens/SaveScreen';

import ContentModal from './src/components/ui/modal/ContentModal';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Todo" component={TodoScreen} />
            <Tab.Screen name="Save" component={SaveScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <ContentModal isVisible={true} />
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

export default App;
