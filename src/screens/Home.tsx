import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import { bindActionCreators,Dispatch } from 'redux'
import {connect} from 'react-redux'
import {StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from '../../App'
import {allReducersState } from '../reducers';
import * as actions from '../actions/index'
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  state:allReducersState;
  dispatchActions: typeof actions
};

class Home extends Component<Props> {
  componentDidMount() {
    this.props.dispatchActions.fetchCount(20);
  }
  render() {
    return (
      <View>
        <Text>
          {this.props.state.count.value}
        </Text>
        <Button onPress={() => this.props.dispatchActions.increment()}
          title="+"
        />
      </View>
    );
  }
};
export const mapStateToProps = (state:allReducersState) => {
  return {
    state: state
  }
}
export const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    dispatchActions:bindActionCreators(actions,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)