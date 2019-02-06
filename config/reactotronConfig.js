import Reactotron from "reactotron-react-native";
import { HOST } from "react-native-dotenv";

Reactotron.configure({ host: HOST }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
