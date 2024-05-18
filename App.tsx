import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { HomeScreen } from './src/screens/BloodTestScreen';
// import { PaperProvider } from 'react-native-paper';
import { BottomNavigation, MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enGB, registerTranslation } from 'react-native-paper-dates'

import { MainContainer } from './src/screens/MainContainer';
import { Provider } from 'react-redux';
import { store } from './src/utils/store';

registerTranslation('en-GB', enGB)

// const Stack = createNativeStackNavigator();

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#1B79D2',
//     secondary: '#D2741B',
//   },
// };

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#874CCC',
    secondary: '#D6D6D6',
    myOwnColor: '#BADA55',
    background: '#E0E0E0',
    // text: '#000000',
    tertiary: '#000000'
  },
};

export default function App() {

  return (
    // <PaperProvider theme={theme}>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="Home">
    //       <Stack.Screen 
    //         name="Home" 
    //         component={HomeScreen} 
    //         options={{ title: 'Overview' }}
    //       />
    //       <Stack.Screen name="Details" component={DetailsScreen} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </PaperProvider>
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <MainContainer />
      </PaperProvider>
    </Provider>
    // {/* </GestureHandlerRootView> */}
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
