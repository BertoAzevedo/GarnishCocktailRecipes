import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import IconSearch from 'react-native-vector-icons/Ionicons'

import Database from '../db/Db'
import Styles from '../gallery/palette'
import DrinkCard from '../components/DrinkCard'
import LoadingIndicator from '../components/LoadingIndicator'

const db = new Database();

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            drinks: [],
            isDataLoaded: true,
            ingredients: [],
            searchedIngredients: [],
            search: '',
            selectedIngredients: [],
            drinksPage: false,
            ingredientsPage: true,
            searchCocktails: '',
            drinksFound: true
        };
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //se não tiver em cache os ingredientes disponiveis, faz load deles
            if (this.state.ingredients != []) {
                this.getAllIngredients()
            }
        });
    }

    getAllIngredients = () => {
        db.getAllIngredients()
            .then((data) => {
                this.setState({ ingredients: data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    searchByIngredient = (ingredients) => {
        //primeiro limpa o state todo e carrega novas imagens para nao dar erro ao colocar os cartoes com as drinks
        this.setState({ drinks: [], isDataLoaded: false }, () => {
            db.searchDrinksByIngredient(ingredients)
                .then((data) => {
                    if (data.length > 0) {
                        this.setState({ drinks: data, isDataLoaded: true, drinksFound: true })
                    } else {
                        this.setState({ drinks: data, isDataLoaded: true, drinksFound: false })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }

    updateSearch = (search) => {
        this.setState({ search: search })
        if (search.length >= 2) {
            const { ingredients } = this.state
            let ingredientsFound = []
            ingredients.forEach(e => {
                let ingredientValue = e.toLowerCase()
                let searchValue = search.toLowerCase()
                if (ingredientValue.search(searchValue) != -1) {
                    ingredientsFound.push(e)
                }
            })
            this.setState({ searchedIngredients: ingredientsFound });
        }
        else if (search.length == 0) {
            this.setState({ searchedIngredients: [] })
        }
    }

    updateSearchCocktails = (searchCocktails) => {
        this.setState({ searchCocktails });
        if (searchCocktails.length >= 2) {
            //primeiro limpa o state todo e carrega novas imagens para nao dar erro ao colocar os cartoes com as drinks
            this.setState({ drinks: [], isDataLoaded: false }, () => {
                db.searchDrinksByName(searchCocktails)
                    .then((data) => {
                        if (data.length > 0) {
                            this.setState({ drinks: data, isDataLoaded: true, drinksFound: true })
                        } else {
                            this.setState({ drinks: data, isDataLoaded: true, drinksFound: false })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        }
        else if (searchCocktails.length == 0) {
            this.setState({ drinks: [] })
        }
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

    addIngredientToSearch = (newIngredient) => {
        const { selectedIngredients } = this.state
        let newSelectedIngredients = selectedIngredients
        newSelectedIngredients.push(newIngredient)
        //para alem de adicionar um ingredient apaga a pesquisa e os ingredientes pesquisados
        this.setState({ selectedIngredients: newSelectedIngredients, search: '', searchedIngredients: [] }, () => {
            if (selectedIngredients.length >= 2) {
                this.searchByIngredient(this.state.selectedIngredients)
            }
            else if (selectedIngredients.length <= 1) {
                this.setState({ drinks: [] })
            }
        })
    }

    deleteSearchedIngredient = (ingredient) => {
        const { selectedIngredients } = this.state
        let newSelectedIngredients = selectedIngredients

        const index = newSelectedIngredients.indexOf(ingredient);
        if (index > -1) {
            newSelectedIngredients.splice(index, 1);
        }

        this.setState({ selectedIngredients: newSelectedIngredients }, () => {
            if (selectedIngredients.length >= 2) {
                this.searchByIngredient(this.state.selectedIngredients)
            }
            else if (selectedIngredients.length <= 1) {
                this.setState({ drinks: [] })
            }
        })
    }

    renderIngredientList() {
        const { selectedIngredients } = this.state
        if (selectedIngredients !== []) {
            return selectedIngredients.map((e, index) => {
                return (
                    <TouchableOpacity key={index} style={styles.horizontalScrollButton} onPress={() => this.deleteSearchedIngredient(e)}>
                        <Text style={[styles.ingredientSearchText, { letterSpacing: 0, marginLeft: 10, marginRight: 5, marginTop: 10, marginBottom: 10 }]}>{e}</Text>
                        <Icon style={{ marginRight: 10 }} color={'rgb(221, 221, 221)'} name='close' size={15}></Icon>
                    </TouchableOpacity>
                )
            })
        }
    }

    renderIngredientSearchList = () => {
        const { searchedIngredients } = this.state

        let listOfIngredients = []
        searchedIngredients.forEach((e, i) => {
            listOfIngredients.push(
                <TouchableOpacity key={i} style={styles.ingredientSearchcard} onPress={() => this.addIngredientToSearch(e)}>
                    <Text style={styles.ingredientSearchText}>{e}</Text>
                    <Icon color={'rgb(221, 221, 221)'} name='plus' size={15}></Icon>
                </TouchableOpacity>
            )
        })

        return listOfIngredients
    }

    changePage = (page) => {
        const { drinksPage, ingredientsPage } = this.state
        if (page == 'drinksPage' && drinksPage == false) {
            this.setState({ drinksPage: true, ingredientsPage: false, drinks: [], search: '', searchCocktails: '', selectedIngredients: [], searchedIngredients: [], isDataLoaded: true, drinksFound: true })
        }
        else if (page == 'ingredientsPage' && ingredientsPage == false) {
            this.setState({ drinksPage: false, ingredientsPage: true, drinks: [], search: '', searchCocktails: '', selectedIngredients: [], searchedIngredients: [], isDataLoaded: true, drinksFound: true })
        }
    }

    render() {
        const { isDataLoaded, search, selectedIngredients, searchedIngredients, drinks, drinksPage, ingredientsPage, searchCocktails, drinksFound } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 80, borderBottomRightRadius: 200 }}>
                    <IconSearch color={Styles.palette.background1} name='search-outline' size={26} style={{ marginRight: 10, marginLeft: 20 }}></IconSearch>
                    <Text style={[styles.text, { fontSize: 26, color: Styles.palette.background1 }]}>Find Cocktails</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, marginLeft: 5, marginRight: 5 }}>
                    <TouchableOpacity style={[styles.buttonLeft, [drinksPage ? styles.activeButton : styles.notActiveButton]]} onPress={() => this.changePage('drinksPage')}>
                        <Text style={drinksPage ? styles.activeButtonText : styles.notActiveButtonText}>Cocktails</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonRight, [ingredientsPage ? styles.activeButton : styles.notActiveButton]]} onPress={() => this.changePage('ingredientsPage')}>
                        <Text style={ingredientsPage ? styles.activeButtonText : styles.notActiveButtonText}>Ingredients</Text>
                    </TouchableOpacity>
                </View>
                {ingredientsPage ? <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.page}>
                    <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                        <Text style={[styles.ingredientSearchText, { fontSize: 18, marginBottom: 20 }]}>Search cocktails by ingredients:</Text>
                        <SearchBar
                            placeholder="Ex.: Gin"
                            onChangeText={this.updateSearch}
                            value={search}
                            containerStyle={styles.searchBarContainer}
                            inputContainerStyle={styles.searchBarInputContainer}
                            inputStyle={styles.searchBarText}
                        />
                        {searchedIngredients.length != 0 ?
                            <ScrollView>
                                {this.renderIngredientSearchList()}
                                <View style={styles.lineStyle} />
                            </ScrollView> : null}
                        {selectedIngredients.length != 0 ?
                            <ScrollView style={{ marginLeft: 5 }} horizontal={true}>
                                {this.renderIngredientList()}
                            </ScrollView> : null}
                        {selectedIngredients.length < 2 ? <Text style={[styles.ingredientSearchText, { marginLeft: 10, letterSpacing: 0.5, fontSize: 12, alignSelf: 'center', marginTop: 20 }]}>Add 2 ingredients to search for a cocktail</Text> : null}
                    </View>
                    {!isDataLoaded ? <LoadingIndicator /> : null}
                    {isDataLoaded ?
                        <Grid>
                            {this.renderDrinks()}
                        </Grid>
                        : null}
                    {!drinksFound && isDataLoaded ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 50 }}>
                            <Text style={[styles.text, { fontSize: 14, marginRight: 10, letterSpacing: 0.5 }]}>Sorry, didn't find any</Text>
                            <Icon color={Styles.palette.background1} name='frown-o' size={18}></Icon>
                        </View> : null}
                </ScrollView> : null}
                {drinksPage ? <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.page}>
                    <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                        <Text style={[styles.ingredientSearchText, { fontSize: 18, marginBottom: 20 }]}>Search cocktails:</Text>
                        <SearchBar
                            placeholder="Ex.: Mojito"
                            onChangeText={this.updateSearchCocktails}
                            value={searchCocktails}
                            containerStyle={styles.searchBarContainer}
                            inputContainerStyle={styles.searchBarInputContainer}
                            inputStyle={styles.searchBarText}
                        />
                    </View>
                    {!isDataLoaded ? <LoadingIndicator /> : null}
                    {isDataLoaded ?
                        <Grid>
                            {this.renderDrinks()}
                        </Grid>
                        : null}
                    {!drinksFound && isDataLoaded ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 50 }}>
                            <Text style={[styles.text, { fontSize: 14, marginRight: 10, letterSpacing: 0.5 }]}>Sorry, didn't find any</Text>
                            <Icon color={Styles.palette.background1} name='frown-o' size={18}></Icon>
                        </View> : null}
                </ScrollView> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white'
    },
    scrollViewContent: {
        justifyContent: 'center'
    },
    cardView: {
        flex: 1,
        padding: 5
    },
    row: {
        padding: 5
    },
    searchBarContainer: {
        backgroundColor: 'white',
        borderBottomColor: 'rgb(236, 236, 236)',
        borderTopColor: 'rgb(236, 236, 236)',
        marginBottom: 5
    },
    searchBarInputContainer: {
        backgroundColor: 'white',
        height: 35
    },
    searchBarText: {
        fontFamily: 'Roboto-Light',
        letterSpacing: 1,
        fontSize: 16
    },
    ingredientSearchcard: {
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        height: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    ingredientSearchText: {
        fontFamily: 'Roboto-Light',
        letterSpacing: 1,
        fontSize: 16
    },
    horizontalScrollButton: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 50,
        margin: 3,
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10
    },
    buttonRight: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '50%'
    },
    buttonLeft: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '50%'
    },
    activeButton: {
        backgroundColor: 'white',
        borderColor: 'rgb(201, 201, 201)',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1
    },
    notActiveButton: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'rgb(201, 201, 201)'
    },
    activeButtonText: {
        color: 'black',
        fontFamily: 'Roboto-Light',
        letterSpacing: 1,
        fontSize: 16
    },
    notActiveButtonText: {
        color: 'black',
        fontFamily: 'Roboto-Light',
        letterSpacing: 1,
        fontSize: 16
    },
    text: {
        fontSize: 14,
        letterSpacing: 1,
        fontFamily: 'Roboto-Light',
    },
});