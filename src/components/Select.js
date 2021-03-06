import React, { Component } from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

class Select extends Component {

    render() {
        return (
            <StyledTextField
                label={this.props.label}
                select
                value={this.props.value && this.props.value ? this.props.value.id : ''}
                onChange={ event => this.props.onChange(event.target.value)}
                SelectProps={{native: true}}
                disabled={this.props.disabled}
            >
                {this._renderOptions()}
            </StyledTextField>
        );
    }

    _renderOptions = () => {
        if(!this.props.options || !this.props.options.length) return <option />;
        return this.props.options.map( option => {
            const symbol = option.currencySymbol ? `(${option.currencySymbol})` : '';
            return (
                <option key={option.id} value={option.id}>
                    {`${option.currencyName} ${symbol}`}
                </option>
            );
        });
    }
}

const StyledTextField = styled(TextField)`
    flex: 1
`;

export { Select };