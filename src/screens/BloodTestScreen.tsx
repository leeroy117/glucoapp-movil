import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, FAB, IconButton, Menu, useTheme } from 'react-native-paper';
import axios from 'axios';
import { ScrollView } from 'react-native';

import { BloodTestItem } from '../components/BloodTestItem';
import { IBloodTest } from '../interfaces/BloodTest.interface';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBloodTestsSuccess } from '../utils/counter/bloodTestSlice';
import { RootState } from '../utils/store';

import { StatusBar } from 'react-native';

interface IProps {
    navigation: NavigationProp<any>
};

const BloodTestScreen = ({ navigation } : IProps) => {
  
  // const [bloodTests, setBloodTests ] = useState<IBloodTest[]>([]);
  const theme = useTheme();

  const bloodTests = useSelector((state: RootState) => state.bloodTest.bloodTests);
  const distpatch = useDispatch();

  useEffect(()=>{
    axios.get('http://192.168.0.131:8080/api/v1/blood-tests/patient/1')
      .then(x => { 
        if(x.status === 200) {
          // setBloodTests(x.data);
          distpatch(fetchBloodTestsSuccess(x.data));
        }
      })
      .catch(err => console.log('e', err))
  }, [])

  return (
    <View style={
      { 
        flex: 1, 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start', 
        width: '100%',
        paddingLeft: 10,
        paddingTop: 0,
        paddingRight: 10,
        paddingBottom: 0,
        backgroundColor: '#E0E0E0'
        // backgroundColor: '#E9E9E8'
      }}>
        <StatusBar barStyle="dark-content" />
      <ScrollView 
        // contentContainerStyle={{width: 350}}
        style={{flex: 1, flexDirection: 'column', gap: 15, width: '100%'}}
      >
        {
          bloodTests.map((x, i, array) => (
            <BloodTestItem 
              key={x.id} 
              bloodTest={x} 
            />
          ))
        }
      </ScrollView>
      
      <FAB
        mode='elevated'
        size='medium'
        icon="plus"
        style={{
          ...styles.fab,
          backgroundColor: theme.colors.primary
        }}
        onPress={() => navigation.navigate('AddBloodTestScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginBottom: 30,
    right: 30,
    bottom: 0,
    // backgroundColor: '#3989CB',
  },
})

export { BloodTestScreen };