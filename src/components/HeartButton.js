import React, {
    Component
} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign'

import Database from '../db/Db'
import Styles from '../gallery/palette'
import Store from '../store/Store'

const db = new Database();

const colors = {
    transparent: 'transparent',
    white: '#fff',
    heartColor: '#e92f3c',
    textPrimary: '#515151',
    black: '#000',
}

const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

class HeartButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            liked: this.props.liked
        }

        this.lastPress = 0
    }

    handleLargeAnimatedIconRef = (ref) => {
        this.largeAnimatedIcon = ref
    }

    handleSmallAnimatedIconRef = (ref) => {
        this.smallAnimatedIcon = ref
    }

    animateIcon = () => {
        const { liked } = this.state
        this.largeAnimatedIcon.stopAnimation()

        if (liked) {
            this.largeAnimatedIcon.bounceIn()
                .then(() => this.largeAnimatedIcon.bounceOut())
            this.smallAnimatedIcon.pulse(200)
        } else {
            this.largeAnimatedIcon.bounceIn()
                .then(() => {
                    this.largeAnimatedIcon.bounceOut()
                    this.smallAnimatedIcon.bounceIn()
                })
                .then(() => {
                    if (!liked) {
                        this.setState(prevState => ({ liked: !prevState.liked }))
                    }
                })
        }
    }

    handleOnPress = () => {
        const time = new Date().getTime()
        const delta = time - this.lastPress
        const doublePressDelay = 400

        if (delta < doublePressDelay) {
            this.animateIcon()
        }
        this.lastPress = time
    }

    handleOnPressLike = () => {
        this.smallAnimatedIcon.bounceIn()
        this.setState(prevState => ({ liked: !prevState.liked }), () => {
            db.updateFavourite(this.props.idDrink, this.state.liked)
                .then((data) => {
                    console.log("Updated favourite drink: " + this.props.idDrink)
                    Store.setToRefreshPage(true)
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }

    render() {
        const { liked } = this.state
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.handleOnPressLike}
            >
                <AnimatedIcon
                    ref={this.handleSmallAnimatedIconRef}
                    name={liked ? 'heart' : 'hearto'}
                    color={liked ? colors.heartColor : colors.textPrimary}
                    size={18}
                    style={styles.icon}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        padding: 5,
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HeartButton;