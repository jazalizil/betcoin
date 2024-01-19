import { Screens } from './RootNavigator.constants';
import { HomeScreen } from '../components/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

const RLStackNavigator = createStackNavigator();

export const RootNavigator = () => (
  <RLStackNavigator.Navigator>
    <RLStackNavigator.Screen
      name={Screens.RL}
      component={HomeScreen}
      options={{ header: () => null }}
    />
  </RLStackNavigator.Navigator>
);
