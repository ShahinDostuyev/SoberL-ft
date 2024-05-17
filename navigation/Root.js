import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "./CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyTrips from "../screens/myTrips";
import AboutScreen from "../screens/about";
import ProfileScreen from "../screens/profile";
import HomeNavigator from "./Home";

const Drawer = createDrawerNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          options={{
            headerStyle: { backgroundColor: "transparent" },
          }}
          name="SoberLift"
          component={HomeNavigator}
        />
        <Drawer.Screen
          options={(headerShown = false)}
          name="My trips"
          component={MyTrips}
        />
        <Drawer.Screen
          options={(headerShown = false)}
          name="Account"
          component={ProfileScreen}
        />
        <Drawer.Screen
          options={(headerShown = false)}
          name="About"
          component={AboutScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
