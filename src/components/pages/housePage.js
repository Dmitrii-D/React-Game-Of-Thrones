import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousePage extends Component {

    gotService = new gotService();

    state = {
        selectedPage: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedPage: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }


    render() {

        const itemList = (
            <ItemList 
                onItemSelected = {this.onItemSelected}
                getData = {this.gotService.getAllHouses}
                renderItem = {({name}) => name}/>
        )

        const itemDetails = (
            <ItemDetails 
                itemId = {this.state.selectedPage} 
                getItem = {this.gotService.getHouse}>
                <Field field = 'name' label = 'Name'/>
                <Field field = 'region' label = 'Region'/>
                <Field field = 'words' label = 'Words'/>
                <Field field = 'titles' label = 'Titles'/>
                <Field field = 'overload' label = 'Overload'/>
                <Field field = 'ancestralWeapons' label = 'AncestralWeapons'/>
            </ItemDetails>
        )
        
        if(this.state.error) {
            return <ErrorMessage />
        }

        return(
            <RowBlock left = {itemList} right = {itemDetails} />
        )
    }
}