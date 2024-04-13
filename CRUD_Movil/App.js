import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main_Menu from './menus/Main_Menu'; 
import Add_Menu from './menus/Add_Menu';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Bienvenida' component={Main_Menu}/>
        <Stack.Screen name='Add_Menu' component={Add_Menu}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;

