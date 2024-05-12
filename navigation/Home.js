import StartScreen from "../screens/start";
import LoginPage from "../screens/login";
import RegisterPage from "../screens/register";
import HomeScreen from "../screens/home";
import DestinationSearch from "../screens/destinationSearch";
import RideValidation from "../screens/rideValidation";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DestinationSearch"
        component={DestinationSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RideValidation"
        component={RideValidation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
