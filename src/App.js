import * as React from 'react';
import {
	NavigationContainer
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import IconCocktail from 'react-native-vector-icons/MaterialCommunityIcons'
import IconSearch from 'react-native-vector-icons/Ionicons'

const TopTab = createMaterialTopTabNavigator();
import Styles from './gallery/palette'
import SplashScreen from './screens/SplashScreen'
import Search from './screens/Search'
import Home from './screens/Home'
import Favourite from './screens/Favourite'
import Drink from './screens/Drink'

const Stack = createStackNavigator();

function tabs() {
	return (
		<TopTab.Navigator
			swipeEnabled={true}
			tabBarPosition="bottom"
			tabBarOptions={{
				showLabel: false,
				showIcon: true,
				style: {
					height: 45,
					backgroundColor: Styles.palette.background4
				},
				indicatorStyle: {
					backgroundColor: Styles.palette.background4
				}
			}}>
			<TopTab.Screen
				name="Home"
				component={Home}
				tab
				options={{
					tabBarColor: Styles.palette.background1,
					tabBarIcon: ({ focused }) => (
						<IconCocktail name="glass-cocktail" color={focused ? Styles.palette.background1 : Styles.palette.lightgrey} size={20} />
					),
				}} />
			<TopTab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarColor: Styles.palette.background1,
					tabBarIcon: ({ focused }) => (
						<IconSearch name="search-outline" color={focused ? Styles.palette.background1 : Styles.palette.lightgrey} size={22} />
					),
				}} />
			<TopTab.Screen
				name="Favourite"
				component={Favourite}
				options={{
					tabBarColor: Styles.palette.background1,
					tabBarIcon: ({ focused }) => (
						<Icon name="heart-o" color={focused ? Styles.palette.background1 : Styles.palette.lightgrey} size={20} />
					),
				}} />
		</TopTab.Navigator>
	);
}

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="tabs" >
				<Stack.Screen name="tabs" component={tabs} options={{ headerShown: false }} />
				{/* <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} /> */}
				<Stack.Screen name="Drink" component={Drink} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App