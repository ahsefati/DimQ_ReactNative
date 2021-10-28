/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

import MQTT from 'sp-react-native-mqtt';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};


MQTT.createClient({
  uri: 'mqtt://74.208.35.55:1883',
  clientId: 'your_client_id'
}).then(function(client) {
    
    client.on('closed', function() {
      console.log('mqtt.event.closed');
    });
  
    client.on('error', function(msg) {
      console.log('mqtt.event.error', msg);
    });
  
    client.on('message', function(msg) {
      console.log('mqtt.event.message', msg);
    });
  
    client.on('connect', function() {
      console.log('connected');
      // client.subscribe('ahsefati_1/#', 0);
      client.subscribe('brokers/#', 0);
      // client.publish('/data', "test", 0, false);
    });


    client.connect();
  }).catch(function(err){
    console.log(err);
  });



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [idofme , setidofme] = useState("DimQ")
  const [mymessages , setmymessages] = useState("Your Messages will be here..")

  
  
    


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="DimQ Messenger" children="Distributed Intelligent Message Queue"/>

          <Section title="Your ID">
            <SafeAreaView>
              <TextInput style={styles.idInput} numberOfLines={1} value={idofme} onChangeText={newValue => setidofme(newValue)}  placeholder="put your ID here, ex: ahsefati"/>
              <Text>DimQ will recognize you by: <Text style={styles.highlight}>{idofme}</Text></Text>
              <Button title="Set my ID"></Button>
            </SafeAreaView>
          </Section>

          <Section title="Messages">
            <Text>{mymessages}</Text>
          </Section>

          <Section title="Contacts">
            <SafeAreaView>
              <TextInput style={styles.idInput}  placeholder="put his/her ID here"/>
              <TextInput multiline={true} numberOfLines={5} style={styles.msgInput}  placeholder="put your message here"/>
              <Button  title="Send!"></Button>
            </SafeAreaView>
          </Section>
          
        </View>
      </ScrollView>
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

  idInput:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  msgInput:{
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }

});

export default App;
