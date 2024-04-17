import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Main page
import Main_Page from './Main_Page'; 

// Studen Menu
import Student_Menu from './menus/Student_Menu';
import Add_Student from './Student/Add_Student';
import Modify_Student from './Student/Modify_Student';
import Search_Student from './Student/Search_Student';
import Delete_Student from './Student/Delete_Student';

// Course Menu
import Course_Menu from './menus/Course_Menu';
import Add_Course from './Course/Add_Course';
import Modify_Course from './Course/Modify_Course';
import Search_Course from './Course/Search_Course';
import Delete_Course from './Course/Delete_Course';

// Registration Menu
import Registration_Menu from './menus/Registration_Menu';
import Add_Registration from './Registration/Add_Registration';
import Modify_Registration from './Registration/Modify_Registration';
import Search_Registration from './Registration/Search_Registration';
import Delete_Registration from './Registration/Delete_Registration';


const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main_Page' component={Main_Page}/>
        <Stack.Screen name='Student_Menu' component={Student_Menu}/>
        <Stack.Screen name='Add_Student' component={Add_Student}/>
        <Stack.Screen name='Modify_Student' component={Modify_Student}/>
        <Stack.Screen name='Search_Student' component={Search_Student}/>
        <Stack.Screen name='Delete_Student' component={Delete_Student}/>
        <Stack.Screen name='Course_Menu' component={Course_Menu}/>
        <Stack.Screen name='Add_Course' component={Add_Course}/>
        <Stack.Screen name='Modify_Course' component={Modify_Course}/>
        <Stack.Screen name='Search_Course' component={Search_Course}/>
        <Stack.Screen name='Delete_Course' component={Delete_Course}/>
        <Stack.Screen name='Registration_Menu' component={Registration_Menu}/>
        <Stack.Screen name='Add_Registration' component={Add_Registration}/>
        <Stack.Screen name='Modify_Registration' component={Modify_Registration}/>
        <Stack.Screen name='Search_Registration' component={Search_Registration}/>
        <Stack.Screen name='Delete_Registration' component={Delete_Registration}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;