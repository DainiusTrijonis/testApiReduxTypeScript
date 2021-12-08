import React, {Component, useState} from 'react';
import {Alert, Button, Image, StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView} from 'react-native';
import { bindActionCreators,Dispatch } from 'redux'
import {connect} from 'react-redux'
import {StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from '../../App'
import {allReducersState } from '../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../actions'

type KittenListNavigationProp = StackNavigationProp<RootStackParamList,'KittenList'>;

interface Props {
  navigation: KittenListNavigationProp;
  state:allReducersState;
  dispatchActions:typeof actions
};
class KittenList extends Component<Props> {  
    constructor(props:Props) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }
    state = {
      value:''
    }

    onChange(e:string){
      const re = /^[0-9\b]+$/;
      if (e === '' || re.test(e)) {
         this.setState({value: e})
      }
    }

    renderKittens = (kittensState: Props["state"]["kittens"]["kittensArray"]) => {
      return(
        <ScrollView>
          {kittensState.map((kitten,index) => {
            return(
              <View key={index}>
                <Image
                    style={{width:200,height:300}}
                    source= {{uri:  kitten.Image}}
                />
              </View>
            )
          })}
        </ScrollView>
      )
    }

    renderLoading = () => {
      return(
        <View>
          <Text>
            loading
          </Text>
        </View>
      )
    }

    render() { 
      const kittensObject = this.props.state.kittens
      return (
        <View>
            <View style={styles.filterContainer}>
                <View style={styles.separator}>
                  <View style={styles.filterButtons}>
                      <Button
                          title="30"
                          onPress={ () => {this.props.dispatchActions.fetchKittens(30)}}
                      />
                  </View>
                </View>
                <View style={styles.separator}>
                  <View style={styles.filterButtons}>
                      <Button
                          title="50"
                          onPress={ () => {this.props.dispatchActions.fetchKittens(50)}}
                      />
                  </View>
                </View>
                <View style={styles.separator}>
                  <View style={styles.filterButtons}>
                      <Button
                          title="100"
                          onPress={ () => {this.props.dispatchActions.fetchKittens(100)}}
                      />
                  </View>
                </View>         
            </View>
            <TextInput  
                  placeholder="number"  
                  underlineColorAndroid='transparent'  
                  style={styles.TextInputStyle}  
                  keyboardType={'numeric'}
                  onChangeText={this.onChange}
            /> 
            <Button
              title="ok"
              onPress= { () => {this.props.dispatchActions.fetchKittens(Number(this.state.value))}}
            />
            {
              !kittensObject.loading ?
                  this.renderKittens(kittensObject.kittensArray)
                : this.renderLoading()
            }
            <View>
            </View>
        </View>
      );
    }

};

const mapStateToProps = (state:allReducersState) => {
  return {
    state: state
  }
}
export const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    dispatchActions:bindActionCreators(actions,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(KittenList)


const styles = StyleSheet.create({
    filterContainer: {
        padding:20,
        flexDirection:'row',
        alignSelf:'center'
    },
    filterButtons: {
        padding:5,
        borderRadius:10,
        borderWidth:1,
    },
    separator: {
        paddingRight:20,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    TextInputStyle: {  
      textAlign: 'center',  
      height: 40,  
      borderRadius: 10,  
      borderWidth: 2,  
      borderColor: '#009688',  
      marginBottom: 10  
    },
});
