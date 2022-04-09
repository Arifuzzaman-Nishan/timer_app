import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screen = Dimensions.get('window');

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time/60);
  const secs = time - mins*60;
  return {mins:formatNumber(mins),secs:formatNumber(secs)};
}

export default function App() {

  // state
  const [remainingSecs,setRemainingSecs] = useState(0);
  const [isActive,setIsActive] = useState(false);

  // extract minitue and seconds
  const {mins,secs} = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  }

  // reset button
  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
  }

  useEffect(() => {

    let interval = null;
    if(isActive){
      interval = setInterval(() => {
        setRemainingSecs(prev => prev+1);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    borderWidth: 10,
    borderColor: '#B9AAFF',
    width: screen.width/2,
    height: screen.width/2,
    borderRadius: screen.width/2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: 45,
    color: '#B9AAFF'
  },
  timerText:{
    color: '#fff',
    fontSize: 90,
    marginBottom: 20
  },
  buttonReset: {
    marginTop: 20,
    borderColor: "#FF851B"
  },
  buttonTextReset: {
    color: "#FF851B"
  }
});
