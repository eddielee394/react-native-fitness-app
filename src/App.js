if (__DEV__) {
  import("./config/reactotronConfig").then(() =>
    console.log("Reactotron Configured")
  );
}
import { AppLoading, registerRootComponent } from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import {
  Button,
  Container,
  Footer,
  FooterTab,
  Header,
  Icon,
  StyleProvider,
  Text
} from "native-base";
import { Loader } from "./components/UI";
import material from "./config/native-base-theme/variables/material";
import getTheme from "./config/native-base-theme/components";
import { Actions, Router } from "react-native-router-flux";
import AppNavigator from "./navigation/AppNavigator";

class App extends Component {
  state = {
    isReady: false
  };

  async loadAssets() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.error}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <StyleProvider style={getTheme(material)}>
            <Container>
              <Header />
              <Router>{AppNavigator}</Router>
              <Footer>
                <FooterTab>
                  <Button
                    vertical
                    onPress={() => {
                      Actions.calendar();
                    }}
                  >
                    <Icon name="md-today" />
                    <Text>Calendar</Text>
                  </Button>
                  <Button
                    vertical
                    onPress={() => {
                      Actions.addEntry();
                    }}
                  >
                    <Icon name="ios-add-circle" />
                    <Text>Add Entry</Text>
                  </Button>
                  <Button vertical>
                    <Icon name="ios-speedometer" />
                    <Text>Live</Text>
                  </Button>
                </FooterTab>
              </Footer>
            </Container>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default registerRootComponent(App);
