import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getRemaining } from './assets/helper/helper';
import styles from './assets/styles/styles';
import { initialState, timerReducer } from './timerReducer/timerReducer';

export default function App() {

  const [state,dispatch] = useReducer(timerReducer,initialState);
  const {remainingSecs,isActive} = state;

  // extract minitue and seconds
  const {mins,secs} = getRemaining(remainingSecs);

  const toggle = () => {
    dispatch({type:"IS_ACTIVE",payload:!isActive});
  }

  // reset button
  const reset = () => {
    dispatch({type:"SEC_ZERO"});
    dispatch({type:"IS_ACTIVE",payload:false});
  }

  useEffect(() => {

    let interval = null;
    if(isActive){
      interval = setInterval(() => {
        dispatch({type:"SEC_INCREMENT"});
      },1000)
    }else if(!isActive && remainingSecs !== 0){
      clearInterval(interval);
    }
    return () => clearInterval(interval);

  },[isActive,remainingSecs])

  return (
    <View style={styles.container}>
      <StatusBar style="light-content" />
      <Text style={styles.timerText}>
        {`${mins}:${secs}`}
      </Text>

      {/* start button */}
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>
          {isActive? "Pause":"Start"}
        </Text>
      </TouchableOpacity>

      {/* reset button */}
      <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
          <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}


