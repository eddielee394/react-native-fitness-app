import React from "react";
import { Icon } from "native-base";
import { black, white, blue, lightPurp, orange, pink, red } from "./colors";

class Helpers {
  static getMetricMetaInfo(metric) {
    const info = {
      run: {
        displayName: "Run",
        max: 50,
        unit: "miles",
        step: 1,
        type: "steppers",
        backgroundColor: red,
        getIcon() {
          return (
            <Icon
              type="MaterialIcons"
              name="directions-run"
              color={white}
              size={35}
            />
          );
        }
      },
      bike: {
        displayName: "Bike",
        max: 100,
        unit: "miles",
        step: 1,
        type: "steppers",
        backgroundColor: orange,
        getIcon() {
          return (
            <Icon
              type="MaterialCommunityIcons"
              name="bike"
              color={white}
              size={32}
            />
          );
        }
      },
      swim: {
        displayName: "Swim",
        max: 9900,
        unit: "meters",
        step: 100,
        type: "steppers",
        backgroundColor: blue,
        getIcon() {
          return (
            <Icon
              type="MaterialCommunityIcons"
              name="swim"
              color={white}
              size={35}
            />
          );
        }
      },
      sleep: {
        displayName: "Sleep",
        max: 24,
        unit: "hours",
        step: 1,
        type: "slider",
        backgroundColor: lightPurp,
        getIcon() {
          return <Icon type="FontAwesome" name="bed" color={white} size={30} />;
        }
      },
      eat: {
        displayName: "Eat",
        max: 10,
        unit: "rating",
        step: 1,
        type: "slider",
        backgroundColor: pink,
        getIcon() {
          return (
            <Icon
              type="MaterialCommunityIcons"
              name="food"
              color={white}
              size={35}
            />
          );
        }
      }
    };

    return typeof metric === "undefined" ? info : info[metric];
  }

  static isBetween(num, x, y) {
    return num >= x && num <= y;
  }

  static calculateDirection(heading) {
    let direction = "";

    if (isBetween(heading, 0, 22.5)) {
      direction = "North";
    } else if (isBetween(heading, 22.5, 67.5)) {
      direction = "North East";
    } else if (isBetween(heading, 67.5, 112.5)) {
      direction = "East";
    } else if (isBetween(heading, 112.5, 157.5)) {
      direction = "South East";
    } else if (isBetween(heading, 157.5, 202.5)) {
      direction = "South";
    } else if (isBetween(heading, 202.5, 247.5)) {
      direction = "South West";
    } else if (isBetween(heading, 247.5, 292.5)) {
      direction = "West";
    } else if (isBetween(heading, 292.5, 337.5)) {
      direction = "North West";
    } else if (isBetween(heading, 337.5, 360)) {
      direction = "North";
    } else {
      direction = "Calculating";
    }

    return direction;
  }

  static timeToString(time = Date.now()) {
    const date = new Date(time);
    const todayUTC = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return todayUTC.toISOString().split("T")[0];
  }

  static getDailyReminderValue = () => {
    return {
      today: "Don't forget to log your data today!"
    };
  };
}

export default Helpers;
