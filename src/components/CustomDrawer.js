/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import { Header, Card, Button, Icon, Avatar } from 'react-native-elements';
import FBSDK, { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import * as colors from '../styles/colors';

const mapStateToProps = state => ({
  token: state.token,
  userInfo: state.userInfo,
});

class CustomDrawer extends Component {
  render() {
    console.log(this.props);
    return (
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View
            style={{
              paddingVertical: 30,
              backgroundColor: colors.primaryRed,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Avatar
              medium
              rounded
              onPress={() => console.log('Works!')}
              activeOpacity={0.7}
              source={{
                uri:
                  this.props.userInfo.picture === undefined
                    ? ''
                    : this.props.userInfo.picture.data.url,
              }}
              containerStyle={{ margin: 10 }}
            />
            <Text style={{ color: colors.primaryYellow, fontSize: 30 }}>
              {this.props.userInfo === undefined ? '' : this.props.userInfo.name}
            </Text>
          </View>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(CustomDrawer);
