import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Main page
import Main_Menu from './menus/Main_Menu'; 

// Second page
import Student_Menu from './menus/Student_Menu';
import Course_Menu from './menus/Course_Menu';
import Registration_Menu from './menus/Registration_Menu';

// Student_Menu page
import Add_Student from './aggregations/Add_Student';
import Modify_Student from './modifications/Modify_Student';
import Consulte_Student from './queries/Consulte_Student';
import Delete_Student from './eliminations/Delete_Student'

import Add_Course from './aggregations/Add_Course'
import Add_Registration from './aggregations/Add_Registration';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main_Menu' component={Main_Menu}/>
        <Stack.Screen name='Student_Menu' component={Student_Menu}/>
        <Stack.Screen name='Course_Menu' component={Course_Menu}/>
        <Stack.Screen name='Registration_Menu' component={Registration_Menu}/>
        <Stack.Screen name='Add_Student' component={Add_Student}/>
        <Stack.Screen name='Modify_Student' component={Modify_Student}/>
        <Stack.Screen name='Consulte_Student' component={Consulte_Student}/>
        <Stack.Screen name='Delete_Student' component={Delete_Student}/>
        <Stack.Screen name='Add_Course' component={Add_Course}/>
        <Stack.Screen name='Add_Registration' component={Add_Registration}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;

