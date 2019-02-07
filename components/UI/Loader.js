import React from "react";
import { Text } from "react-native";
import { Grid, Spinner, Container } from "native-base";

const Loader = () => {
  return (
    <Container>
      <Grid>
        <Spinner color="blue" />
        <Text>Loading...</Text>
      </Grid>
    </Container>
  );
};

export default Loader;
