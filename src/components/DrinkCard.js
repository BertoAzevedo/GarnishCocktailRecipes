import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

import ImageCollection from '../gallery/ImageCollection'
import HeartButton from '../components/HeartButton'
import Styles from '../gallery/palette'

const screenWidth = Math.round(Dimensions.get('window').width)
const drinkCardWidth = screenWidth / 2 - 10

class DrinkCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            drink: this.props.drink,
            imageFileName: this.props.imageFileName
        }
    }

    render() {
        let imageCardDimensions = drinkCardWidth
        if (drinkCardWidth > 250) {
            imageCardDimensions = 250
        }
        return (
            <Card style={{ backgroundColor: Styles.palette.background4, elevation: 0 }} onPress={() => this.props.navigation.navigate('Drink', { screen: 'Home', drinkName: this.state.drink.strDrink, drinkId: this.state.drink.id })}>
                <Card.Cover source={ImageCollection.Drinks_images_preview['preview_' + this.state.imageFileName]} style={{ aspectRatio: 1, width: imageCardDimensions, height: 'auto', alignSelf: 'center' }} />
                <Card.Content style={styles.cardContent}>
                    <Title style={styles.cardTitle}>{this.state.drink.strDrink}</Title>
                    <View style={styles.HeartButton}>
                        <HeartButton liked={this.state.drink.favourite == 1 ? true : false} idDrink={this.state.drink.idDrink}></HeartButton>
                    </View>
                </Card.Content>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    HeartButton: {
        // position: 'absolute',
        // right: 0,
        // top: 0,
        marginLeft: 5
    },
    cardContent: {
        backgroundColor: Styles.palette.background4,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardTitle: {
        color: Styles.palette.background1,
        textAlign: 'center',
        fontFamily: 'Roboto-Light',
        letterSpacing: 1,
        fontSize: 16
    }
});

export default DrinkCard;