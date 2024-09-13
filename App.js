import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// screens
import Register from "./screens/Register.js";
import Login from "./screens/Login.js";
import PinLogin from "./screens/PinLogin.js";
import Main from "./screens/Main.js";
import Orders from "./screens/Orders.js";
import Sales from "./screens/Sales.js";
import RegisterAdmin from "./screens/RegisterAdmin.js";
import Product from "./screens/Product.js";
import Setting from "./screens/Setting.js";

// context
import StyleContextProvider from "./context/StyleContextProvider";
import DataContextProvider from "./context/DataContext.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StyleContextProvider>
      <DataContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Pin" component={PinLogin} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RegisterAdmin" component={RegisterAdmin} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="Sales" component={Sales} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Setting" component={Setting} />
          </Stack.Navigator>
        </NavigationContainer>
      </DataContextProvider>
    </StyleContextProvider>
  );
}
