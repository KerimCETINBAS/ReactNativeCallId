/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Node, useEffect, useState} from 'react';
import { } from "react-native"
import CallDetectorManager from 'react-native-call-detection' 
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



async function fetchCheck(ip) {
  
  return await new Promise(async (resolve)=>{
  
      setTimeout(()=>resolve(false), 400)

      const c = await  fetch("http://"+ip+":3091/check").then(r => r.status == 200).catch(e => {})
     
      resolve(c)
  })
}

const App = () => {
  
  const [ip, setIp] = useState(null)
  const [sip, setSip] = useState(null)

  useEffect(() => {
   
  ;(async ()=> {

  
    //let c = await fetchCheck("10.0.2.2")

   // if(c) return setIp("10.0.2.2");
    
      const c = await fetchCheck(`10.0.2.2`).then(d => d)
      if(c) {
        setIp(`10.0.2.2`)
        return
      }
      for(let y of  Array.from(Array(256), (_, y) => y)){
        for await(let i of  Array.from(Array(256), (_, i) => i)) {
        

          const c = await fetchCheck(`192.168.0.${i}`).then(d => d)
          
          setSip(`192.168.${y}.${i}`)
          

          if(c) {
            setIp(`192.168.${y}.${i}`) 
            return
          }
     
      
      
  
       
      }
      }
  })()
  

   let d = new CallDetectorManager((event, phoneNumber)=> {
        // For iOS event will be either "Connected",
        // "Disconnected","Dialing" and "Incoming"
      
        // For Android event will be either "Offhook",
        // "Disconnected", "Incoming" or "Missed"
        // phoneNumber should store caller/called number
        
      
        if (event === 'Connected') {
          if(ip !== null) {
           
          }
        // Do something call got connected
        // This clause will only be executed for iOS
        }
        else if (event === 'Incoming') { 
          if(ip !== null) {
              
              fetch(`http://${ip}:3091/number/${phoneNumber}`).catch(e => e)
          } 
        
          
        }
      
      },  true  )


      return  d.dispose

  },[ip])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {ip == null &&  <Text>Ana makina ipsi araniyor... {sip}</Text> || <Text>ana makina ipsi :{ip}</Text>}
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
