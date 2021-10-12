import { observable } from 'mobx'

class Store {
    @observable refreshHomePage = false
    @observable refreshSearchPage = false
    @observable refreshFavouritePage = false

    //ativar o refresh para todas as páginas
    setToRefreshPage(bool) {
        this.refreshHomePage = bool
        this.refreshSearchPage = bool
        this.refreshFavouritePage = bool
        console.log('To Refresh Page Status: ', bool)
    }

    //estas funções servem para desligar o estado de update de cada página depois de elas fazerem o seu refresh
    updateHomeRefreshStatus(){
        this.refreshHomePage = false
        console.log('Home Page Status: ', this.refreshHomePage)
    }

    updateSearchRefreshStatus(){
        this.refreshSearchPage = false
        console.log('Search Page Status: ', this.refreshSearchPage)
    }

    updateFavouriteRefreshStatus(){
        this.refreshFavouritePage = false
        console.log('Favourite Page Status: ', this.refreshFavouritePage)
    }
}

export default new Store()


