import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
// import commonStyles from '../gallery/styles'
import ImageCollection from '../gallery/ImageCollection'

export default class App extends Component {
	// componentDidMount() {
	// 	setTimeout(() => {
	// 		this.props.navigation.navigate('App')
	// 	}, 3300);
	// }
	render() {
		return (
			<View style={styles.container}>
				<Animatable.View onAnimationEnd={() => this.props.navigation.navigate('Home')} duration={2800} animation={'zoomIn'}>
					<Image source={ImageCollection.media.splashscreen}></Image>
				</Animatable.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	header: {
		fontSize: 50,
		letterSpacing: 3,
		// color: commonStyles.palette.blue,
		fontFamily: 'Lato',
		position: 'absolute'
	}
});