import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome'

import Database from '../db/Db'
import Styles from '../gallery/palette'
import DrinkCard from '../components/DrinkCard'
import LoadingIndicator from '../components/LoadingIndicator'
import Store from '../store/Store'

const db = new Database();

export default class Popular extends Component {
    constructor() {
        super();
        this.state = {
            drinks: [],
            isDataLoaded: false,
            noFavouriteDrinks: false
        };
    }

    componentDidMount() {
        this.loadDrinks()

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (Store.refreshFavouritePage == true) {
                this.loadDrinks()
                Store.updateFavouriteRefreshStatus(false)
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    loadDrinks = () => {
        //primeiro limpa o state todo e carrega novas imagens para nao dar erro ao colocar os cartoes com as drinks
        this.setState({ drinks: [], isDataLoaded: false }, () => {
            db.getFavouriteDrinks()
                .then((data) => {
                    console.log(data.length)
                    if (data.length == 0) {
                        console.log("entrou1")
                        this.setState({ drinks: data, isDataLoaded: true, noFavouriteDrinks: true })
                    } else {
                        console.log("entrou2")
                        this.setState({ drinks: data, isDataLoaded: true, noFavouriteDrinks: false })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }

    renderDrinks = () => {
        const { drinks } = this.state;
        let listOfDrinks = []
        drinks.forEach((e, i) => {
            let thumbnailUrlSplited = e.strDrinkThumb.split('/')
            let imageFileName = thumbnailUrlSplited[thumbnailUrlSplited.length - 1]
            listOfDrinks.push(
                <View key={i} style={styles.cardView}>
                    <DrinkCard drink={e} imageFileName={imageFileName} navigation={this.props.navigation}></DrinkCard>
                </View>
            )
        })

        let drinks_grid = []

        for (let i = 0; i < drinks.length; i = i + 2) {
            drinks_grid.push(
                <Row style={styles.row} key={i}>
                    <Col>{listOfDrinks[i]}</Col>
                    <Col>{listOfDrinks[i + 1]}</Col>
                </Row>
            )
        }

        return drinks_grid;
    }

    render() {
        const { isDataLoaded, noFavouriteDrinks } = this.state;
        console.log(noFavouriteDrinks)
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.page}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height:80, borderBottomRightRadius: 200 }}>
                    <Icon color={Styles.palette.background1} name='heart-o' size={26} style={{ marginRight: 10, marginLeft: 20 }}></Icon>
                    <Text style={[styles.text, { fontSize: 26, color:Styles.palette.background1 }]}>Favorites</Text>
                </View>
                {!isDataLoaded ? <LoadingIndicator /> : null}
                {noFavouriteDrinks ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'row' }}>
                        <Text style={[styles.text, { fontSize: 14, marginRight: 10, letterSpacing: 0.5 }]}>No favorite cocktails yet</Text>
                        <Icon color={Styles.palette.background1} name='frown-o' size={18}></Icon>
                    </View>
                    : null}
                {isDataLoaded ?
                    <Grid>
                        {this.renderDrinks()}
                    </Grid>
                    : null}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: Styles.palette.background4
    },
    scrollViewContent: {
        justifyContent: 'center',
    },
    cardView: {
        flex: 1,
        padding: 5
    },
    row: {
        padding: 5
    },
    text: {
        fontSize: 14,
        letterSpacing: 1,
        fontFamily: 'Roboto-Light',
    },
});