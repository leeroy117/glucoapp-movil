import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./BloodTestStack";
import { SignInScreen } from "../screens/auth/SignInScreen";
import { SignUpScreen } from "../screens/auth/SignUpScreen";

export type AuthStackParamList = {
    SignInScreen: undefined,
    SignUpScreen: undefined,
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    title: 'Sign in',
                    headerShown: false
                }}

            />
            <Stack.Screen 
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    title: 'Sign up'
                }}

            />
        </Stack.Navigator>
    )
}

export  { AuthStack };