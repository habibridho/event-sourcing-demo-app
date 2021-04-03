import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Toast from 'react-native-fast-toast';
import HomeScreen from './screen/Home';
import PayScreen from './screen/Pay';
const Stack = createStackNavigator();

function App() {
  const toast = useRef(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'home'}>
        <Stack.Screen
          name={'home'}
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name={'pay'}
          options={{title: 'Pay'}}
        >
          {props => <PayScreen {...props} toast={toast.current} />}
        </Stack.Screen>
      </Stack.Navigator>
      <Toast ref={toast} />
    </NavigationContainer>
  );
}

export default App;
