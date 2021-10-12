import React, {
    Component
} from 'react';
var SQLite = require('react-native-sqlite-storage')

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'drinks.db'

export default class Database extends Component {
    initDB() {
        let db;

        return new Promise(resolve => {
            console.log('Plugin integrity check ...');

            SQLite.echoTest()
                .then(() => {
                    console.log('Integrity check passed ...');
                    console.log('Opening database ...');

                    SQLite.openDatabase({
                        name: database_name,
                        location: 'default',
                        createFromLocation: '~www/' + database_name,
                    },
                        // database_name
                    )
                        .then(DB => {
                            db = DB;
                            console.log('Database OPEN');
                            db.executeSql('SELECT * FROM drink LIMIT 1;')
                                .then((results) => {
                                    console.log('Database is ready ... executing query ...');
                                })
                                .catch(error => {
                                    console.log('Received error: ', error);
                                });

                            resolve(db);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error)
                });
        });
    }

    async closeDatabase(db) {
        if (db) {
            console.log('Closing DB');
            await db.close()
                .then(status => {
                    console.log('Database CLOSED');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.log('Database was not OPENED');
        }
    }

    loadDrinks() {
        return new Promise(resolve => {
            const drinks = [];
            let q = "SELECT * FROM drink;"
            this.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql(q, []).then(
                            ([tx, results]) => {
                                console.log('Query completed');

                                var len = results.rows.length;

                                for (let i = 0; i < len; i++) {
                                    let row = results.rows.item(i);
                                    const {
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkAlternate,
                                        strTags,
                                        strVideo,
                                        strCategory,
                                        strIBA,
                                        strAlcoholic,
                                        strGlass,
                                        strInstructions,
                                        strDrinkThumb,
                                        strIngredient1,
                                        strIngredient2,
                                        strIngredient3,
                                        strIngredient4,
                                        strIngredient5,
                                        strIngredient6,
                                        strIngredient7,
                                        strIngredient8,
                                        strIngredient9,
                                        strIngredient10,
                                        strIngredient11,
                                        strIngredient12,
                                        strIngredient13,
                                        strIngredient14,
                                        strIngredient15,
                                        strMeasure1,
                                        strMeasure2,
                                        strMeasure3,
                                        strMeasure4,
                                        strMeasure5,
                                        strMeasure6,
                                        strMeasure7,
                                        strMeasure8,
                                        strMeasure9,
                                        strMeasure10,
                                        strMeasure11,
                                        strMeasure12,
                                        strMeasure13,
                                        strMeasure14,
                                        strMeasure15,
                                        strCreativeCommonsConfirmed,
                                        dateModified,
                                        favourite
                                    } = row;

                                    drinks.push({
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkAlternate,
                                        strTags,
                                        strVideo,
                                        strCategory,
                                        strIBA,
                                        strAlcoholic,
                                        strGlass,
                                        strInstructions,
                                        strDrinkThumb,
                                        strIngredient1,
                                        strIngredient2,
                                        strIngredient3,
                                        strIngredient4,
                                        strIngredient5,
                                        strIngredient6,
                                        strIngredient7,
                                        strIngredient8,
                                        strIngredient9,
                                        strIngredient10,
                                        strIngredient11,
                                        strIngredient12,
                                        strIngredient13,
                                        strIngredient14,
                                        strIngredient15,
                                        strMeasure1,
                                        strMeasure2,
                                        strMeasure3,
                                        strMeasure4,
                                        strMeasure5,
                                        strMeasure6,
                                        strMeasure7,
                                        strMeasure8,
                                        strMeasure9,
                                        strMeasure10,
                                        strMeasure11,
                                        strMeasure12,
                                        strMeasure13,
                                        strMeasure14,
                                        strMeasure15,
                                        strCreativeCommonsConfirmed,
                                        dateModified,
                                        favourite
                                    });
                                }
                                resolve(drinks);
                            },
                        );
                    })
                        .then(result => {
                            this.closeDatabase(db);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    searchDrinksByName(text) {
        return new Promise(resolve => {
            const drinks = [];
            let q = "SELECT id, idDrink, strDrink, strDrinkThumb, favourite FROM drink where strDrink LIKE '" + text + "%' order by strDrink;"
            this.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql(q, []).then(
                            ([tx, results]) => {
                                console.log('Query completed');

                                var len = results.rows.length;

                                for (let i = 0; i < len; i++) {
                                    let row = results.rows.item(i);
                                    const {
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkThumb,
                                        favourite
                                    } = row;

                                    drinks.push({
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkThumb,
                                        favourite
                                    });
                                }
                                resolve(drinks);
                            },
                        );
                    })
                        .then(result => {
                            this.closeDatabase(db);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    getDrinkInformation(id) {
        return new Promise(resolve => {
            const drinks = [];
            let q = "SELECT * FROM drink where id = " + id + " LIMIT 1;"
            this.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql(q, []).then(
                            ([tx, results]) => {
                                console.log('Query completed');

                                var len = results.rows.length;

                                for (let i = 0; i < len; i++) {
                                    let row = results.rows.item(i);
                                    const {
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkAlternate,
                                        strTags,
                                        strVideo,
                                        strCategory,
                                        strIBA,
                                        strAlcoholic,
                                        strGlass,
                                        strInstructions,
                                        strDrinkThumb,
                                        strIngredient1,
                                        strIngredient2,
                                        strIngredient3,
                                        strIngredient4,
                                        strIngredient5,
                                        strIngredient6,
                                        strIngredient7,
                                        strIngredient8,
                                        strIngredient9,
                                        strIngredient10,
                                        strIngredient11,
                                        strIngredient12,
                                        strIngredient13,
                                        strIngredient14,
                                        strIngredient15,
                                        strMeasure1,
                                        strMeasure2,
                                        strMeasure3,
                                        strMeasure4,
                                        strMeasure5,
                                        strMeasure6,
                                        strMeasure7,
                                        strMeasure8,
                                        strMeasure9,
                                        strMeasure10,
                                        strMeasure11,
                                        strMeasure12,
                                        strMeasure13,
                                        strMeasure14,
                                        strMeasure15,
                                        strCreativeCommonsConfirmed,
                                        dateModified,
                                        favourite
                                    } = row;

                                    drinks.push({
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkAlternate,
                                        strTags,
                                        strVideo,
                                        strCategory,
                                        strIBA,
                                        strAlcoholic,
                                        strGlass,
                                        strInstructions,
                                        strDrinkThumb,
                                        strIngredient1,
                                        strIngredient2,
                                        strIngredient3,
                                        strIngredient4,
                                        strIngredient5,
                                        strIngredient6,
                                        strIngredient7,
                                        strIngredient8,
                                        strIngredient9,
                                        strIngredient10,
                                        strIngredient11,
                                        strIngredient12,
                                        strIngredient13,
                                        strIngredient14,
                                        strIngredient15,
                                        strMeasure1,
                                        strMeasure2,
                                        strMeasure3,
                                        strMeasure4,
                                        strMeasure5,
                                        strMeasure6,
                                        strMeasure7,
                                        strMeasure8,
                                        strMeasure9,
                                        strMeasure10,
                                        strMeasure11,
                                        strMeasure12,
                                        strMeasure13,
                                        strMeasure14,
                                        strMeasure15,
                                        strCreativeCommonsConfirmed,
                                        dateModified,
                                        favourite
                                    });
                                }
                                resolve(drinks);
                            },
                        );
                    })
                        .then(result => {
                            this.closeDatabase(db);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    getTopDrinks() {
        return new Promise(resolve => {
            const drinks = [];
            let q = "SELECT id, idDrink, strDrink, strDrinkThumb, favourite FROM drink WHERE rank != 0 order by rank;"
            this.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql(q, []).then(
                            ([tx, results]) => {
                                console.log('Query completed');

                                var len = results.rows.length;

                                for (let i = 0; i < len; i++) {
                                    let row = results.rows.item(i);
                                    const {
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkThumb,
                                        favourite
                                    } = row;

                                    drinks.push({
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkThumb,
                                        favourite
                                    });
                                }
                                resolve(drinks);
                            },
                        );
                    })
                        .then(result => {
                            this.closeDatabase(db);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    searchDrinksByIngredient(ingredients) {
        let q = "SELECT * FROM (SELECT id, idDrink, strDrink, strDrinkThumb, favourite, COALESCE(strIngredient1, ' ') as strIngredient1, COALESCE(strIngredient2, ' ') as strIngredient2, COALESCE(strIngredient3, ' ') as strIngredient3, COALESCE(strIngredient4, ' ') as strIngredient4, COALESCE(strIngredient5, ' ') as strIngredient5, COALESCE(strIngredient6, ' ') as strIngredient6, COALESCE(strIngredient7, ' ') as strIngredient7, COALESCE(strIngredient8, ' ') as strIngredient8, COALESCE(strIngredient9, ' ')as strIngredient9 , COALESCE(strIngredient10, ' ')as strIngredient10 , COALESCE(strIngredient11, ' ') as strIngredient11 , COALESCE(strIngredient12, ' ')as strIngredient12 , COALESCE(strIngredient13, ' ') as strIngredient13, COALESCE(strIngredient14, ' ') as strIngredient14, COALESCE(strIngredient15, ' ') as strIngredient15 FROM drink) WHERE "
        ingredients.forEach((e, i) => {
            if (i !== 0) {
                q = q + "AND "
            }
            q = q + "(strIngredient1 || ' ' || strIngredient2 || ' ' || strIngredient3 || ' ' || strIngredient4 || ' ' || strIngredient5 || ' ' || strIngredient6 || ' ' || strIngredient7 || ' ' || strIngredient8 || ' ' || strIngredient9 || ' ' || strIngredient10 || ' ' || strIngredient11 || ' ' || strIngredient12 || ' ' || strIngredient13 || ' ' || strIngredient14 || ' ' || strIngredient15) LIKE '%" + e + "%'"
        });
        q = q + ";"
        return new Promise(resolve => {
            const drinks = [];
            this.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql(q, []).then(
                            ([tx, results]) => {
                                console.log('Query completed');

                                var len = results.rows.length;

                                for (let i = 0; i < len; i++) {
                                    let row = results.rows.item(i);
                                    const {
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkThumb,
                                        favourite
                                    } = row;

                                    drinks.push({
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkThumb,
                                        favourite
                                    });
                                }
                                resolve(drinks);
                            },
                        );
                    })
                        .then(result => {
                            this.closeDatabase(db);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    updateFavourite(idDrink, bool) {
        let value = bool ? 1 : 0
        return new Promise(resolve => {
            this.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql(`UPDATE drink SET favourite = ${value} where idDrink = ${idDrink}`
                        )
                            .then(([tx, results]) => {
                                resolve(results);
                            });
                    })
                        .then(result => {
                            this.closeDatabase(db);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    getFavouriteDrinks() {
        return new Promise(resolve => {
            const drinks = [];
            let q = "SELECT id, idDrink, strDrink, strDrinkThumb, favourite FROM drink where favourite = 1;"
            this.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql(q, []).then(
                            ([tx, results]) => {
                                console.log('Query completed');

                                var len = results.rows.length;

                                for (let i = 0; i < len; i++) {
                                    let row = results.rows.item(i);
                                    const {
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkThumb,
                                        favourite
                                    } = row;

                                    drinks.push({
                                        id,
                                        idDrink,
                                        strDrink,
                                        strDrinkThumb,
                                        favourite
                                    });
                                }
                                resolve(drinks);
                            },
                        );
                    })
                        .then(result => {
                            this.closeDatabase(db);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    getAllIngredients() {
        return new Promise(resolve => {
            const ingredients = [];
            let q = "SELECT DISTINCT strIngredient1 AS ingredient FROM drink  WHERE strIngredient1 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient2 FROM drink WHERE strIngredient2 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient3 FROM drink WHERE strIngredient3 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient4 FROM drink WHERE strIngredient4 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient5 FROM drink WHERE strIngredient5 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient6 FROM drink WHERE strIngredient6 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient7 FROM drink WHERE strIngredient7 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient8 FROM drink WHERE strIngredient8 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient9 FROM drink WHERE strIngredient9 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient10 FROM drink WHERE strIngredient10 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient11 FROM drink WHERE strIngredient11 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient12 FROM drink WHERE strIngredient12 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient13 FROM drink WHERE strIngredient13 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient14 FROM drink WHERE strIngredient14 IS NOT NULL"
            q = q + " UNION "
            q = q + "SELECT DISTINCT strIngredient15 FROM drink WHERE strIngredient15 IS NOT NULL;"
            this.initDB()
                .then(db => {
                    db.transaction(tx => {
                        tx.executeSql(q, []).then(
                            ([tx, results]) => {
                                console.log('Query completed');

                                var len = results.rows.length;

                                for (let i = 0; i < len; i++) {
                                    let row = results.rows.item(i);

                                    ingredients.push(
                                        row.ingredient,
                                    );
                                }
                                resolve(ingredients);
                            },
                        );
                    })
                        .then(result => {
                            this.closeDatabase(db);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
}