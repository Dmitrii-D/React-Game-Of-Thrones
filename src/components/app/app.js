import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BookPage, HousePage, BooksItem} from '../pages';
import img from './got.jpg';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import styled from 'styled-components';

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

const HeaderName = styled.h1`
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 20px;
    font-size: 36px;
    font-weight: bold;
`

const ImgMain = styled.img`
    display: block;
    margin: 0 auto;
    width: 400px;
`

export default class App extends Component {

    gotService = new gotService();

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }

        this.toggleBlock = this.toggleBlock.bind(this);
    }

    toggleBlock() {
		this.setState({
            show: !this.state.show
        });
    }
    

    render() {

        const {show} = this.state;
        
        const result = show ? <RandomChar/> : null;

        return (
            <Router>
                <div className = 'app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <Button onClick={this.toggleBlock}>Show Random Char</Button>
                                {result}
                            </Col>
                        </Row>
                        <Route path='/' exact component={() => {
                            return (
                                <>
                                    <HeaderName>Welcome to </HeaderName>
                                    <ImgMain src={img} alt = 'error'></ImgMain>
                                </>
                            )
                        }} />
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/houses' component={HousePage} />
                        <Route path='/books' exact component={BookPage} />
                        <Route path='/books/:id' render = {
                            ({match}) => {
                                const {id} = match.params;
                            return <BooksItem bookId = {id} />}
                        } />
                    </Container>
                </div>
            </Router>
        )
    }
}
