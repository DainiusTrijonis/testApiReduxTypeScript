import 'react-native-gesture-handler';
import React from 'react'
import {createStore,applyMiddleware} from 'redux';
import {allReducers} from './src/reducers';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './src/screens/Home'
import KittenList from './src/screens/KittenList'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

let store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
export type RootStackParamList = {
  Home: undefined;
  KittenList: undefined;
};
const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="KittenList">
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Welcome'}}
          />
          <RootStack.Screen
            name="KittenList"
            component={KittenList}
            options={{title: 'Kitten List'}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App