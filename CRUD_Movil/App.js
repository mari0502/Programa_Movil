import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main_Menu from './menus/Main_Menu'; 
import Add_Menu from './menus/Add_Menu';
import Consulte_Menu from './menus/Consulte_Menu'
import Modify_Menu from './menus/Modify_Menu'
import Delete_Menu from './menus/Delete_Menu'
import Add_Student from './aggregations/Add_Student'
import Add_Course from './aggregations/Add_Course'
import Add_Registration from './aggregations/Add_Registration';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Bienvenida' component={Main_Menu}/>
        <Stack.Screen name='Add_Menu' component={Add_Menu}/>
        <Stack.Screen name='Consulte_Menu' component={Consulte_Menu}/>
        <Stack.Screen name='Modify_Menu' component={Modify_Menu}/>
        <Stack.Screen name='Delete_Menu' component={Delete_Menu}/>
        <Stack.Screen name='Add_Student' component={Add_Student}/>
        <Stack.Screen name='Add_Course' component={Add_Course}/>
        <Stack.Screen name='Add_Registration' component={Add_Registration}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;

