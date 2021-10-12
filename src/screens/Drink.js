import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import { Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

import Database from '../db/Db'
import ImageCollection from '../gallery/ImageCollection'
import Styles from '../gallery/palette'
import LoadingIndicator from '../components/LoadingIndicator'

const db = new Database();

export default class Drink extends Component {
  constructor() {
    super();
    this.state = {
      drinkInfo: {},
      isDataLoaded: false,
    };
  }

  componentDidMount = () => {
    let drinkId = this.props.route.params.drinkId
    let drinkName = this.props.route.params.drinkName
    //Update title of the drink
    this.props.navigation.setOptions({ title: drinkName })
    //get all Drink info
    db.getDrinkInformation(drinkId)
      .then((data) => {
        this.setState({ drinkInfo: data[0], isDataLoaded: true })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  loadIngredients = (ingredients, measures) => {
    return ingredients.map((e, index) => {
      let imageFileName = e.replace(new RegExp(" ", "g"), '_')
      imageFileName = imageFileName + '.jpg'
      imageFileName = imageFileName.toLowerCase()
      return (
        <View key={index} style={styles.ingredientContainer}>
          <Image style={styles.ingredientsImage} source={ImageCollection.Ingredients_images[imageFileName]} />
          <Text style={[styles.text, { fontSize: 14, flex: 1, letterSpacing: 0 }]}>{e}:     {measures[index]}</Text>
        </View>
      )
    })
  }

  getIngredients = (drinkInfo) => {
    let ingredients = []
    if (drinkInfo.strIngredient1 !== null) {
      ingredients.push(drinkInfo.strIngredient1)
    }
    if (drinkInfo.strIngredient2 !== null) {
      ingredients.push(drinkInfo.strIngredient2)
    }
    if (drinkInfo.strIngredient3 !== null) {
      ingredients.push(drinkInfo.strIngredient3)
    }
    if (drinkInfo.strIngredient4 !== null) {
      ingredients.push(drinkInfo.strIngredient4)
    }
    if (drinkInfo.strIngredient5 !== null) {
      ingredients.push(drinkInfo.strIngredient5)
    }
    if (drinkInfo.strIngredient6 !== null) {
      ingredients.push(drinkInfo.strIngredient6)
    }
    if (drinkInfo.strIngredient7 !== null) {
      ingredients.push(drinkInfo.strIngredient7)
    }
    if (drinkInfo.strIngredient8 !== null) {
      ingredients.push(drinkInfo.strIngredient8)
    }
    if (drinkInfo.strIngredient9 !== null) {
      ingredients.push(drinkInfo.strIngredient9)
    }
    if (drinkInfo.strIngredient10 !== null) {
      ingredients.push(drinkInfo.strIngredient10)
    }
    if (drinkInfo.strIngredient11 !== null) {
      ingredients.push(drinkInfo.strIngredient11)
    }
    if (drinkInfo.strIngredient12 !== null) {
      ingredients.push(drinkInfo.strIngredient12)
    }
    if (drinkInfo.strIngredient13 !== null) {
      ingredients.push(drinkInfo.strIngredient13)
    }
    if (drinkInfo.strIngredient14 !== null) {
      ingredients.push(drinkInfo.strIngredient14)
    }
    if (drinkInfo.strIngredient15 !== null) {
      ingredients.push(drinkInfo.strIngredient15)
    }
    return ingredients
  }

  getIngredientsMeasures = (drinkInfo) => {
    let measures = []
    if (drinkInfo.strMeasure1 !== null) {
      measures.push(drinkInfo.strMeasure1)
    }
    if (drinkInfo.strMeasure2 !== null) {
      measures.push(drinkInfo.strMeasure2)
    }
    if (drinkInfo.strMeasure3 !== null) {
      measures.push(drinkInfo.strMeasure3)
    }
    if (drinkInfo.strMeasure4 !== null) {
      measures.push(drinkInfo.strMeasure4)
    }
    if (drinkInfo.strMeasure5 !== null) {
      measures.push(drinkInfo.strMeasure5)
    }
    if (drinkInfo.strMeasure6 !== null) {
      measures.push(drinkInfo.strMeasure6)
    }
    if (drinkInfo.strMeasure7 !== null) {
      measures.push(drinkInfo.strMeasure7)
    }
    if (drinkInfo.strMeasure8 !== null) {
      measures.push(drinkInfo.strMeasure8)
    }
    if (drinkInfo.strMeasure9 !== null) {
      measures.push(drinkInfo.strMeasure9)
    }
    if (drinkInfo.strMeasure10 !== null) {
      measures.push(drinkInfo.strMeasure10)
    }
    if (drinkInfo.strMeasure11 !== null) {
      measures.push(drinkInfo.strMeasure11)
    }
    if (drinkInfo.strMeasure12 !== null) {
      measures.push(drinkInfo.strMeasure12)
    }
    if (drinkInfo.strMeasure13 !== null) {
      measures.push(drinkInfo.strMeasure13)
    }
    if (drinkInfo.strMeasure14 !== null) {
      measures.push(drinkInfo.strMeasure14)
    }
    if (drinkInfo.strMeasure15 !== null) {
      measures.push(drinkInfo.strMeasure15)
    }
    return measures
  }

  render() {
    const { drinkInfo, isDataLoaded } = this.state;
    let imageFileName = ''
    let imageAspectRatio = undefined
    let ingredients = []
    let measures = []

    //se tiver a '' não carregou os dados ainda
    if (isDataLoaded) {
      let drinkInfoObj = JSON.parse(JSON.stringify(drinkInfo))
      let strDrinkThumb = drinkInfoObj.strDrinkThumb;
      let thumbnailUrlSplited = strDrinkThumb.split('/')
      imageFileName = thumbnailUrlSplited[thumbnailUrlSplited.length - 1]
      console.log(imageFileName)
      const { width, height } = Image.resolveAssetSource(ImageCollection.Drinks_images_preview['preview_' + imageFileName]);
      imageAspectRatio = width / height
      ingredients = this.getIngredients(drinkInfo)
      measures = this.getIngredientsMeasures(drinkInfo)
    }


    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.page}>
        {!isDataLoaded ? <LoadingIndicator /> : null}
        {isDataLoaded ?
          <View style={{ flex: 1 }}>
            <View style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 20,
                height: 20,
              },
              shadowOpacity: 1,
              shadowRadius: 20,
              elevation: 14,
              backgroundColor: 'white',
              width: 150,
              alignSelf: 'center',
              marginBottom: 10,
              marginTop: 10
            }}>
              <Image style={[styles.drinkImage, { aspectRatio: imageAspectRatio }]} source={ImageCollection.Drinks_images_preview['preview_' + imageFileName]} />
            </View>
            <View style={{ flex: 1 }}>
              <Card style={styles.instructionsCard}>
                <Text style={styles.title}>Ingredients</Text>
                <View style={styles.lineStyle} />
                {this.loadIngredients(ingredients, measures)}
              </Card>
              <Card style={styles.instructionsCard}>
                <Text style={styles.title}>Preparation</Text>
                <View style={styles.lineStyle} />
                <Text style={[styles.text, { letterSpacing: 0 }]}>{drinkInfo.strInstructions}</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                  <Icon color={Styles.palette.background1} name='glass' size={20} style={{ marginRight: 10 }}></Icon>
                  <Text style={[styles.text, { letterSpacing: 0 }]}>{drinkInfo.strGlass}</Text>
                </View>
              </Card>
            </View>
          </View>
          : null}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    margin: 5
  },
  drinkImage: {
    width: 150,
    height: undefined,
    // margin: 5
  },
  title: {
    fontSize: 22,
    letterSpacing: 1,
    fontFamily: 'Roboto-Light',
    marginTop: 5
  },
  text: {
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'Roboto-Light',
  },
  ingredientsImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
    marginRight: 5
  },
  ingredientContainer: {
    flex: 1,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionsCard: {
    elevation: 2,
    borderRadius: 5,
    padding: 8,
    marginBottom: 15,
    margin: 5,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'rgb(236, 236, 236)',
    marginTop: 10,
    marginBottom: 10
  }
});