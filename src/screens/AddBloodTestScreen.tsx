import { useNavigation } from '@react-navigation/native';
import  React, { useEffect, useState} from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL_V1 } from '../utils/environment';
import { IBloodTest } from '../interfaces/BloodTest.interface';
import { useDispatch } from 'react-redux';
import { addBloodTest } from '../utils/counter/bloodTestSlice';

// import {
//     TextInput
// } from 'react-native';

const AddBloodTestScreen = () => {

    const theme = useTheme();

    const navigation = useNavigation();
    const [result, setResult] = useState<string>('');
    const [observations, setObservations] = useState<string>('');

    const [visible, setVisible] = useState(false)

    const [inputDate, setInputDate] = useState<Date | undefined>(moment().toDate())
    const [datetime, setDatetime] = useState<string>(moment().format('YYYY-MM-DDTHH:mm:ss'));
    const [time, setTime] = useState<string>(moment().format('HH:mm:ss'));

    const dispatch = useDispatch();

    useEffect(() => {    
        const newData = `${moment(inputDate).format('YYYY-MM-DD')}T${time}`;
        setDatetime(newData);
    }, [inputDate, visible, time]);

    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible]);

    const onConfirm = React.useCallback(
        ({ hours, minutes }: any) => {
            setVisible(false);

            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            setTime(moment(date).format('HH:mm:ss'));
            
        },
        [setVisible]
    );

    const handleOnPress = (event: GestureResponderEvent, buttonId: string) => {
        if(buttonId === 'btnCancel') {
            navigation.goBack();
        }
        if(buttonId === 'btnSave') {
            sendData();
        }
    };

    const sendData = () => {

        const newBloodTest: IBloodTest = {
            result: parseInt(result),
            patientId: 1,
            date: datetime,
            observations: observations
        }
        const endpoint = `${BASE_URL_V1}/blood-tests/save`;
        
        axios.post(
            endpoint, 
            newBloodTest, 
            {headers: {'Content-Type': 'application/json'}})
            .then((result) => {
                const bloodTestInserted: IBloodTest = result.data;
                dispatch(addBloodTest(bloodTestInserted));
                navigation.goBack();

            })
            .catch((e) => console.log(e))
    }

    return (
        <View 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 20, 
                padding: 15, 
                // backgroundColor: '#E0E0E0',
                backgroundColor: theme.colors.background,
                height: '100%',
            }}>

            <TextInput
                label="Result"
                value={result}
                onChangeText={result => setResult(result)}
                textColor={theme.colors.tertiary}
                placeholderTextColor={theme.colors.tertiary}
                activeOutlineColor={theme.colors.tertiary}
                style={{
                    backgroundColor: theme.colors.secondary
                }}
            />

            <View style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 20}}>

                <DatePickerInput
                    locale="en-GB"
                    label="Birthdate"
                    value={inputDate}
                    onChange={(d) => {
                        setInputDate(d);
                    }}
                    inputMode="start"
                    // style={{position: 'relative', marginTop: -200}}
                    style={{
                        backgroundColor: theme.colors.secondary
                    }}
                />

                <Button 
                    onPress={() => setVisible(true)} 
                    uppercase={false} 
                    mode="elevated"
                    style={{marginTop: 20 }}
                    textColor={theme.colors.tertiary}
                    // buttonColor={theme.colors.secondary }
                >
                    Pick time
                </Button>
                
                <TimePickerModal
                    visible={visible}
                    onDismiss={onDismiss}
                    onConfirm={onConfirm}
                    hours={12}
                    minutes={14}
                />

                <TextInput
                    id='inputDatetime'
                    // style={{width: '100%'}}
                    label="Time"
                    value={datetime}
                    // onFocus={() => setVisible(true)}
                    readOnly={true}
                    style={{
                        backgroundColor: theme.colors.secondary,
                        width: '100%'
                    }}
                />
            </View>
            

            <TextInput
                multiline={true}
                numberOfLines={6}
                label="Observations"
                style={{
                    height: 100, 
                    textAlignVertical: 'top',
                    backgroundColor: theme.colors.secondary,
                }}
                value={observations}
                onChangeText={observations => setObservations(observations)}
            />

            <View style={ styles.footer }>
                <Button 
                    id='btnCancel'
                    icon="cancel" 
                    mode="elevated" 
                    onPress={(event) => handleOnPress(event, 'btnCancel')}
                    style={styles.cancelButton}
                    // textColor='white'
                    textColor={theme.colors.tertiary}
                >
                    Cancel
                </Button>
                <Button 
                    id='btnSave'
                    style={styles.saveButton}
                    icon="content-save-check-outline"
                    mode="elevated" 
                    onPress={(event) => handleOnPress(event, 'btnSave')}
                    textColor={theme.colors.tertiary}
                >
                    Save
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        // flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        gap: 15,
        width: '100%'
    },
    cancelButton: {
        width: '50%',
        // backgroundColor: '#DD4625',
        // backgroundColor: ,
        // borderColor: '#DD4625',
        borderWidth: 1
    },
    saveButton: {
        width: '50%',
        // borderColor: 'green',
        borderWidth: 1
        // backgroundColor: 'green',
    }
})

export { AddBloodTestScreen }