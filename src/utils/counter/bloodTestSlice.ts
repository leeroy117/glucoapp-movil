import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBloodTest } from '../../interfaces/BloodTest.interface';

export interface CounterState {
    value: number
  }
  
const bloodTests: IBloodTest[] = [];

interface IUpdateBloodTest {
    updatedBloodTest: IBloodTest;
    id: number;
}

const bloodTestSlice = createSlice({
  name: 'bloodTest',
  initialState: {
    bloodTests,
    loading: false,
    error: null
  },
  reducers: {
        fetchBloodTestsStart: (state) => {
            state.loading = false;
            state.error = null;
        },
        fetchBloodTestsSuccess: (state, action: PayloadAction<IBloodTest[]>) => {
            state.bloodTests = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchBloodTestsFailure: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateBloodTest: (state, action: PayloadAction<IUpdateBloodTest>) => {
            const { id, updatedBloodTest} = action.payload;

            state.bloodTests = state.bloodTests.map((bloodTest) => {
                if(bloodTest.id === id){
                    return {
                        ...bloodTest,
                        ...updatedBloodTest
                    }
                }else{
                    return bloodTest;
                }
            });
        },
        addBloodTest: (state, action: PayloadAction<IBloodTest>) => {
            state.bloodTests.push(action.payload);
        },
        deleteBloodTest: (state, action: PayloadAction<number>) => {
            state.bloodTests = state.bloodTests.filter((bloodTest) => bloodTest.id!== action.payload);
        }
        // increment: (state) => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
});

export const { 
        fetchBloodTestsStart, 
        fetchBloodTestsSuccess, 
        updateBloodTest,
        addBloodTest,
        deleteBloodTest
    } = bloodTestSlice.actions

export default bloodTestSlice.reducer
