import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screens } from './RootNavigator.constants';
import { HomeScreen } from '../components/HomeScreen';

const RootTabNavigator = createBottomTabNavigator();

export const RootNavigator = () => (
  <RootTabNavigator.Navigator>
    <RootTabNavigator.Screen name={Screens.Home} component={HomeScreen} />
  </RootTabNavigator.Navigator>
);
