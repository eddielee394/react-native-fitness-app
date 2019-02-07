import React from "react";
import { Text } from "react-native";
import { Grid, Spinner } from "native-base";

const Loader = () => {
  return (
    <Grid>
      <Spinner color="blue" />
      <Text>Loading...</Text>
    </Grid>
  );
};

export default Loader;
