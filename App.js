import React from 'react';
import {Provider} from 'react-redux';
import { createAppContainer } from 'react-navigation'
import {FontAwesome} from '@expo/vector-icons';
import configureStore from './store/configureStore';

import { Routes } from "./config/routes";

const store = configureStore({});

const AppNav = createAppContainer(Routes);

export default class App extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <AppNav />
            </Provider>
        )
    }
}
