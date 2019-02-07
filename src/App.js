if (__DEV__) {
  import("./config/reactotronConfig").then(() =>
    console.log("Reactotron Configured")
  );
}
import { registerRootComponent } from "expo";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { AddEntry } from "./components/Entries";
import { History } from "./components/History";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  StyleProvider
} from "native-base";
import { Loader } from "./components/UI";
import { AppLoading } from "expo";
import material from "./config/native-base-theme/variables/material";
import getTheme from "./config/native-base-theme/components";

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
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <StyleProvider style={getTheme(material)}>
            <Container>
              <Header />
              <Content>
                <History />
                {/*<AddEntry />*/}
              </Content>
              <Footer>
                <FooterTab>
                  <Button vertical>
                    <Icon name="md-today" />
                    <Text>History</Text>
                  </Button>
                  <Button vertical>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default registerRootComponent(App);
