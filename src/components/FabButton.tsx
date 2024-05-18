import * as React from 'react';
import { StackNavigationState, useNavigation } from '@react-navigation/core';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  AddBloodTestScreen: { id: number } | undefined;
};

const FabButton = () => {
    const navigation  = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return(
          <FAB
            mode='elevated'
            size='medium'
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate('AddBloodTestScreen')}
          />
    );
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      marginBottom: 110,
      right: 30,
      bottom: 0,
      backgroundColor: '#3989CB'
    },
  })

export { FabButton }  