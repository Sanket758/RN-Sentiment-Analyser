import React, {Component} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import axios from 'axios';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      input: null,
      loading: true,
      output: null,
      probability: null,
    };
  }

  getSentiments = () => {
    const {input, sentiment} = this.state;
    axios.request({
      method: 'POST',
      url: 'https://sentiment-analysis4.p.rapidapi.com/reviews',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': '7ed6c1e6a1mshdf5e490d52b5162p1b3abejsnf7cff255efd7',
        'x-rapidapi-host': 'sentiment-analysis4.p.rapidapi.com'
      },
      data: {
        text: input,
      }
    }).then((res) => {
      console.log(res.data);
      this.setState({
        output: res.data.label,
        probability: res.data.scope,
        loading: false,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}> Sentiment Analyzer </Text>
          <Text style={styles.subtitle}> Detect Sentiment from the text </Text>
        </View>

        <View style={styles.inputContainer}>
          <Input placeholder='Enter text to perform sentiment analyser'
          onChangeText={(value) => this.setState({input: value})}></Input>
          <View style={styles.buttonContianer}>
            <Button title="try" buttonStyle={styles.button} titleStyle={{fontSize: 20}} onPress={this.getSentiments.bind(this)}></Button>
          </View>
          {
            this.state.loading ? 
              <Text> </Text>: 
              <View style={styles.output}>
                <Text style={{fontSize: 20, color: 'white'}}> { this.state.output + ' - ' + (this.state.probability * 100).toPrecision(3) + '%' }</Text> 
              </View>
          }
          <View style={styles.imageContainer}>
            <Image source={require('./assets/drama.png')} style={styles.dramaImage} />
          </View>
        </View>

      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#69869c"
  },
  titleContainer: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  button:{
    width: 200,
    height: 57,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  buttonContianer:{
    alignItems: 'center',
  },
  inputContainer:{
    marginHorizontal: 10,
    marginTop: 90,
  },
  imageContainer:{
    paddingTop: 50, 
    alignItems: 'center',
  },
  dramaImage: {
    width: 170,
    height: 170,
  },
  output: {
    marginTop: 20,
    alignItems: 'center',
  },
})