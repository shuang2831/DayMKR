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
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import { Header, Card, Button, Icon, Avatar } from 'react-native-elements';
import FBSDK, { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import MakeDayModal from './src/screens/MakeDayModal';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import CustomDrawer from './src/components/CustomDrawer';

import { storeUser, updateToken } from './src/actions/rootActions';
import * as colors from './src/styles/colors';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

type Props = {};

const mapStateToProps = state => ({
  token: state.token,
  userInfo: state.userInfo,
});

const HomeScreenStack = StackNavigator(
  {
    hs: {
      screen: HomeScreen,
    },
  },
  {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: colors.primaryRed },
      title: 'Home',
      headerTitle: (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: -10 }}>
          <Image
            style={{ resizeMode: 'contain', alignSelf: 'center', width: '50%' }}
            source={require('./src/images/DayMKR-logo-600.png')}
          />
        </View>
      ),
      headerTintColor: '#f8fdc0',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerOpen')}
          style={{ marginLeft: 15 }}
        >
          <Icon name="menu" type="entypo" color="#f8fdc0" />
        </TouchableOpacity>
      ),
    }),
  },
);

const RootStack = DrawerNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      drawerLabel: 'Home',
    },
    Settings: {
      screen: HomeScreen,
    },
    About: {
      screen: HomeScreen,
    },
    LogOut: {
      screen: HomeScreen,
    },
  },
  {
    contentComponent: CustomDrawer,
  },
);

class App extends Component {
  constructor(props) {
    super(props);
    let isLoggedIn;
    AccessToken.getCurrentAccessToken().then(data => {
      isLoggedIn = !!data;
      console.log(data);
      this.initUser(data.accessToken);
      this.props.dispatch(updateToken(data.accessToken));
    });
    this.state = {
      loggedIn: isLoggedIn,
    };
  }

  componentWillMount() {
    AccessToken.getCurrentAccessToken().then(data => {
      this.setState({
        loaded: true,
        loggedIn: !!data,
      });
    });
  }

  initUser(token) {
    console.log('init');
    const responseInfoCallback = (error, result) => {
      if (error) {
      } else {
        this.props.dispatch(storeUser(result));
      }
    };

    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: token,
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name,picture',
          },
        },
      },
      responseInfoCallback,
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  }

  render() {
    if (!this.state.loaded) {
      return <View />;
    } else {
      return this.props.token === 'unknown' ? <LoginScreen /> : <RootStack />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cb5141',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 100,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  friendContainer: {
    flexDirection: 'row',
    backgroundColor: 'green',
    paddingHorizontal: 15,
    height: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

export default connect(mapStateToProps)(App);
