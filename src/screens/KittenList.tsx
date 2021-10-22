import React, {Component} from 'react';
import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import { bindActionCreators,Dispatch } from 'redux'
import {connect} from 'react-redux'
import {StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from '../../App'
import {allReducersState } from '../reducers';
import axios from 'axios'
import { Buffer } from "buffer"
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
        this.state = {
            img:'',
        }
    }
    async componentDidMount() {
      this.props.dispatchActions.fetchKittens(30)
    }
    render() { 
      return (
        <View>
            <View style={styles.filterContainer}>
                <View style={styles.separator}>
                  <View style={styles.filterButtons}>
                      <Button
                          title="30"
                          onPress={ () => {Alert.alert("30")}}
                      />
                  </View>
                </View>
                <View style={styles.separator}>
                  <View style={styles.filterButtons}>
                      <Button
                          title="50"
                          onPress={ () => {Alert.alert("50")}}
                      />
                  </View>
                </View>
                <View style={styles.separator}>
                  <View style={styles.filterButtons}>
                      <Button
                          title="100"
                          onPress={ () => {Alert.alert("100")}}
                      />
                  </View>
                </View>
            </View>
            <View>
                {/* <Image
                    style={{width:200,height:300}}
                    source={{uri:this.state.img}}
                /> */}
            </View>
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
    }
});
