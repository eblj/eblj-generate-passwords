import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/splash";
import LoginScreen from "./src/screens/login";
import HomeScreen from "./src/screens/home";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";

const Stack = createStackNavigator();
enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
