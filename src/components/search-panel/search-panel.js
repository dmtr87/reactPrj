import React from "react";
import "./search-panel.css";

export default class SearchPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            term: ''
        }
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch(event) {
        const term = event.target.value;
        this.setState({
            term: term
        })
        //Мы должны передать в App состояния term для того что бы изменить состояния в App а именно this.state.term
        this.props.onUpdateSearchPost(term)
    }
    render() {
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onUpdateSearch}
            />
            )
    }
}