import React from "react";

export default class PostStatusFilter extends React.Component {
    constructor(props) {
        super(props)
        this.button= [
            {name:'all', label:'Всё'},
            {name:'like', label:'Понравилось'},
        ]
    }
    render() {
            const buttons= this.button.map(({name, label}) => {
                /**
                Проверяем какой фильтр вкл по умолчанию
                 */
            const active = this.props.filter === name;
            const classActive = active ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button 
                key={name} 
                type='button' 
                className={`btn ${classActive}`}
                onClick={() => this.props.onFilterSelect(name)}
                >{label}</button>  
            )
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }

}