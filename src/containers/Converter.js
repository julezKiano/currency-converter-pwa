import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { currencySelected, onAmountChange, xChange } from './actions';
import { Select, Input } from '../components';

class Converter_ extends Component {
    render() {
        const { loading, currencies, from, to, amount, onAmountChange } = this.props;
        return (
            <div>
            <ConverterContainer>
                <SelectContainer>
                    <Select 
                        label="From" 
                        options={currencies} 
                        value={from}
                        disabled={loading}
                        onChange={ value => this._handleOnSelectChange(value, 'from')}
                    />
                    <Separator />
                    <Select 
                        label="To" 
                        options={currencies} 
                        value={to}
                        disabled={loading}
                        onChange={ value => this._handleOnSelectChange(value, 'to')}
                    />
                </SelectContainer>
                <InputContainer>
                    <Input value={amount} onChange={onAmountChange} />   
                </InputContainer>
                <ResultContainer>
                    {this._renderResult()}
                </ResultContainer>
            </ConverterContainer>
            {this._renderLoader()}
            </div>
        );
    }

    _renderResult = () => {
        const { loading, exchangeAvailable, to, total } = this.props;
        if(!exchangeAvailable) {
            return (
                <Button variant="contained" color="primary" disabled={loading} onClick={this._handleConversion}>
                    Convert
                </Button>
            );
        }
        let surfix = to && to.id ? to.id : '';
        return (
            <div>
                <NumberText>
                    {total}
                </NumberText>
                <CurrencyText>
                    {surfix}
                </CurrencyText>
            </div>
        );
    }

    _renderLoader = () => {
        const { loading } = this.props;
        if (!loading) return null;
        return (
            <LinearProgress />
        );
    }

    _handleOnSelectChange = (value, type) => {
        let selected = value;
        const { currencies, currencySelected } = this.props;
        selected = currencies.filter( currency => currency.id === selected )[0];
        currencySelected(selected, type);
    }

    _handleConversion = () => {
        const { to, from, amount, xChange } = this.props;
        xChange({ to, from, amount });
    }

}

const NumberText = styled.span`
    font-size: 32px;
    display: inline-block;
`;

const CurrencyText = styled.span`
    font-size: 15px;
    display: inline-block;
    margin-left: 5px;
    opacity: 0.5;
`;

const ResultContainer = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
`;

const ConverterContainer = styled.div`
    padding: 15px;
    background-color: white;
    padding-top: 30px;
    border-bottom: 1px solid #E0E0E0;
`;

const InputContainer = styled.div`
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
`; 

const Separator = styled.div`
    width: 10px;
`;

const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

function mapStateToProps({ currency }) {
    return { ...currency };
}

const actions = { currencySelected, onAmountChange, xChange };
const Converter = connect(mapStateToProps, actions)(Converter_);
export { Converter };