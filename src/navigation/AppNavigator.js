import React from "react";
import { Calendar } from "../components/Calendar";
import { AddEntry } from "../components/Entries";
import { Scene, Stack } from "react-native-router-flux";

const routes = [
  {
    key: "calendar",
    component: Calendar,
    title: "Calendar",
    initial: true
  },
  { key: "addEntry", component: AddEntry, title: "Add Entry" }
];

const screens = routes.map(route => {
  return (
    <Scene
      key={route.key}
      component={route.component}
      title={route.title}
      initial={route.initial ? route.initial : false}
    />
  );
});

const AppNavigator = (
  <Stack hideNavBar>
    <Scene key="root" hideNavBar>
      {screens}
    </Scene>
  </Stack>
);

export default AppNavigator;
