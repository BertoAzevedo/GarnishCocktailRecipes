import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Database from '../db/Db'
import Styles from '../gallery/palette'
import DrinkCard from '../components/DrinkCard'
import LoadingIndicator from '../components/LoadingIndicator'
import Store from '../store/Store'
import ImageCollection from '../gallery/ImageCollection'

const db = new Database();

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
      isDataLoaded: false
    };
  }

  componentDidMount() {
    this.loadTopDrinks()

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (Store.refreshHomePage == true) {
        this.loadTopDrinks()
        Store.updateHomeRefreshStatus(false)
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  loadTopDrinks = () => {
    //primeiro limpa o state todo e carrega novas imagens para nao dar erro ao colocar os cartoes com as drinks
    this.setState({ drinks: [], isDataLoaded: false }, () => {
      db.getTopDrinks()
        .then((data) => {
          this.setState({ drinks: data, isDataLoaded: true })
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
    const { isDataLoaded } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.page}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 80, borderBottomRightRadius: 200 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Icon color={Styles.palette.background1} name='glass-cocktail' size={26} style={{ marginRight: 10, marginLeft: 20 }}></Icon>
            <Text style={[styles.text, { fontSize: 26, color: Styles.palette.background1 }]}>Cocktails</Text>
          </View>
          {/* <TouchableOpacity onPress={() => Linking.openURL('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PKEQLJURV5QHS&source=url')}>
            <Text style={styles.donateButtonText}>Suport me with:</Text>
            <View style={styles.donateButtonContainer}>
              <Image source={ImageCollection.media.donate} style={styles.donateImage} />
            </View>
          </TouchableOpacity> */}
        </View>
        <Text style={[styles.text, { fontSize: 24, color: Styles.palette.background1, marginLeft: 10 }]}>Top 50</Text>
        {!isDataLoaded ? <LoadingIndicator /> : null}
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
    // flexGrow: 1,
    justifyContent: 'center'
  },
  cardView: {
    flex: 1,
    padding: 5,
  },
  searchBarContainer: {
    backgroundColor: Styles.palette.background1,
    borderBottomColor: Styles.palette.background1
  },
  searchBarInputContainer: {
    backgroundColor: Styles.palette.background1,
    height: 35
  },
  searchBarText: {
    fontFamily: 'Roboto-Light',
    letterSpacing: 1,
    fontSize: 16
  },
  row: {
    padding: 5
  },
  text: {
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'Roboto-Light',
  },
  donateButtonContainer: {
    backgroundColor: '#009DE1',
    borderRadius: 15,
    marginRight: 10
  },
  donateButtonText: {
    fontFamily: 'Roboto-Light',
    fontSize: 12,
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
    marginRight: 13
  },
  donateImage: {
    width: 100,
    height: 30,
    resizeMode: 'contain'
  }
});