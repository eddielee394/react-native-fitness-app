import { createLogger } from "redux-logger";
import { REDUX_LOGGER } from "react-native-dotenv";

const ansiCodes = {
  black: "\u001b[30m",
  red: "\u001b[31m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  blue: "\u001b[34m",
  magenta: "\u001b[35m",
  cyan: "\u001b[36m",
  white: "\u001b[37m",
  brightBlack: "\u001b[30;1m",
  brightRed: "\u001b[31;1m",
  brightGreen: "\u001b[32;1m",
  brightYellow: "\u001b[33;1m",
  brightBlue: "\u001b[34;1m",
  brightMagenta: "\u001b[35;1m",
  brightCyan: "\u001b[36;1m",
  brightWhite: "\u001b[37;1m",
  reset: "\u001b[0m",
  bold: "\u001b[1m",
  underline: "\u001b[4m",
  reversed: "\u001b[7m"
};

const formatString = (string, color, style = null) =>
  `${style}${color}${string}${ansiCodes.reset}`;

let loggerConfig = {};

if (REDUX_LOGGER === "TERMINAL") {
  loggerConfig = {
    colors: {
      title: false
    },
    titleFormatter: (action, time, took) => {
      return `action @ ${time} ${formatString(
        action.type,
        ansiCodes.brightYellow,
        ansiCodes.bold
      )} (in ${took.toFixed(2)} ms)`;
    }
  };
}

const logger = createLogger(loggerConfig);

export default logger;
