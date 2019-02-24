import React, {Component} from 'react';

import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const SpanTerm = styled.span`
    font-weight: bold;
`

const Field = ({item, field, label}) => {
    return(
        <li className="list-group-item d-flex justify-content-between">
            <SpanTerm>{label}</SpanTerm>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

const ItemDetailsStyle = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const Spanitem = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    updateItem() {

        const {itemId} = this.props;

        if(!itemId) {
            return;
        }

        this.setState({loading : true})

        this.props.getItem(itemId)
            .then((item) => {
                this.setState({item, loading: false, error: false})
            })
        
        // this.foo.bar = 0;

    }

    render() {

        if(!this.state.item) {
            return <Spanitem>Please select item in the list</Spanitem>
        }

        const Content = ({item}) => {

            const {name, id} = item;

            return (
                <>
                    <h4>{name} {id}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item})
                            })
                        }
                    </ul>
                </>
            )
        }

        if(this.state.error) {
            return <ErrorMessage />
        }

        const {loading} = this.state;
        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <Content item = {this.state.item}/> : null;

        return (
            
            <ItemDetailsStyle className="rounded">
                {spinner}
                {content}
            </ItemDetailsStyle>
        );
    }
}