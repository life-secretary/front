import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EventProvider} from 'react-native-outside-press';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ErrorBoundary from 'react-native-error-boundary';

import {HomeScreen} from './src/screens/HomeScreen';
import {TodoScreen} from './src/screens/todo/TodoScreen';
import {ScrapScreen} from './src/screens/ScrapScreen';
import {TodoDetailModalScreen} from './src/screens/todo/TodoDetailModalScreen';
import {TodoFormModalScreen} from './src/screens/todo/TodoFormModalScreen';
import {SettingScreen} from './src/screens/setting/SettingScreen';
import {SettingModalScreen} from './src/screens/setting/SettingModalScreen';
import {MyInfoModalScreen} from './src/screens/setting/MyInfoModalScreen';
import SearchScreen from './src/screens/SearchScreen';
import {AppText} from './src/components/common/AppText';
import {AppErrorFallback} from './src/components/common/AppErrorFallback';
import color from './src/styles/color';
import {font} from './src/styles/font';

import HomeIcon from './src/assets/icon/bottomTab/icon_home.svg';
import SearchIcon from './src/assets/icon/bottomTab/icon_search.svg';
import TodoIcon from './src/assets/icon/bottomTab/icon_todo.svg';
import ScrapIcon from './src/assets/icon/bottomTab/icon_scrap.svg';
import SettingIcon from './src/assets/icon/bottomTab/icon_setting.svg';

import {getFontSize} from './src/utils/font';

// import Content from './src/components/contentDetail/ContentModal';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <View style={styles.tabShadow} />,
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => {
            const iconColor = focused ? color.main.primary : color.grey.grey400;

            return <HomeIcon stroke={iconColor} color={iconColor} />;
          },
          tabBarLabel: ({focused}) => (
            <AppText style={[styles.tabLabel, focused && styles.focused]}>
              홈
            </AppText>
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({focused}) => {
            const iconColor = focused ? color.main.primary : color.grey.grey400;

            return <SearchIcon color={iconColor} />;
          },
          tabBarLabel: ({focused}) => (
            <AppText style={[styles.tabLabel, focused && styles.focused]}>
              검색
            </AppText>
          ),
        }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="Todo"
        options={{
          tabBarIcon: ({focused}) => {
            const iconColor = focused ? color.main.primary : color.grey.grey400;

            return <TodoIcon color={iconColor} />;
          },
          tabBarLabel: ({focused}) => (
            <AppText style={[styles.tabLabel, focused && styles.focused]}>
              할일
            </AppText>
          ),
        }}
        component={TodoScreen}
      />
      <Tab.Screen
        name="Scrap"
        options={{
          tabBarIcon: ({focused}) => {
            const iconColor = focused ? color.main.primary : color.grey.grey400;

            return <ScrapIcon color={iconColor} />;
          },
          tabBarLabel: ({focused}) => (
            <AppText style={[styles.tabLabel, focused && styles.focused]}>
              저장
            </AppText>
          ),
        }}
        component={ScrapScreen}
      />
      <Tab.Screen
        name="Setting"
        options={{
          tabBarIcon: ({focused}) => {
            const iconColor = focused ? color.main.primary : color.grey.grey400;

            return <SettingIcon color={iconColor} />;
          },
          tabBarLabel: ({focused}) => (
            <AppText style={[styles.tabLabel, focused && styles.focused]}>
              관리
            </AppText>
          ),
        }}
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="HomeTab" component={HomeTabs} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
        <Stack.Screen
          name="TodoDetailModal"
          component={TodoDetailModalScreen}
        />
        <Stack.Screen name="TodoForm" component={TodoFormModalScreen} />
        <Stack.Screen name="SettingModal" component={SettingModalScreen} />
        <Stack.Screen name="MyInfoModal" component={MyInfoModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <EventProvider>
          <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
              <ErrorBoundary FallbackComponent={AppErrorFallback}>
                <NavigationContainer>
                  <RootStack />
                </NavigationContainer>
              </ErrorBoundary>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </EventProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 85,
    paddingTop: 10,
    borderRadius: 24,
    position: 'absolute',
  },
  tabShadow: {
    backgroundColor: color.main.white,
    borderRadius: 24,
    height: 100,
    ...Platform.select({
      ios: {
        shadowColor: color.shadow.bottomTab,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: -2},
      },
      android: {
        shadowColor: color.shadow.bottomTab,
        elevation: 1,
      },
    }),
  },
  tabLabel: {
    fontSize: getFontSize(12),
    fontWeight: font.fontWeight.medium,
    lineHeight: 14.32,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey400,
    marginTop: 2,
  },
  focused: {
    color: color.main.primary,
  },
});

export default App;
