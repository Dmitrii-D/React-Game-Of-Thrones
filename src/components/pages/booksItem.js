import React, {Component} from 'react';
import gotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails/itemDetails';

import styled from 'styled-components';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Button = styled.button`
    background-color: rgb(19, 74, 224);
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 1px solid #fff;
    color: #fff;
    cursor: pointer;
        &:focus {
            outline: none;
        }
`;

export default class BooksItem extends Component {
    
    gotService = new gotService();

    render() {
        return (
            <>
                <Link to='/books/'><Button>Back to books</Button></Link>
                <ItemDetails 
                    itemId = {this.props.bookId}
                    getItem = {this.gotService.getBook}>
                    <Field field = 'name' label = 'Name'/>
                    <Field field = 'numberOfPages' label = 'Number Of Pages'/>
                    <Field field = 'publiser' label = 'Publiser'/>
                    <Field field = 'released' label = 'Released'/>
                </ItemDetails>
            </>
        )
    }

}