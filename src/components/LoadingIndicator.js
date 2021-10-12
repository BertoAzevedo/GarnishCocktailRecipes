import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import Styles from '../gallery/palette'

const LoadingIndicator = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={Styles.palette.background1} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignSelf: 'center'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default LoadingIndicator;