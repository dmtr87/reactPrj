import React from 'react'; 
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import "./app.css";
import styled from 'styled-components';


const AppBlock= styled.div`
    margin: 0 auto;
    max-width: 800px;
`




export default class  App extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            dataBase: [
                {label:"Дособирать гидрофор", important: true, id:'asdasd'},
                {label:"Подтянуть помпу", important: false, id:'awdawd'},
                {label:"Поколоть дрова", important: false, id:'acxa'}
            ]
        }
        this.deletePost= this.deletePost.bind(this);
    }
    deletePost (id){
        this.setState(({dataBase}) => {
            const indexPost= dataBase.findIndex((post) => post.id === id);

            const beforeIndex= dataBase.slice(0,indexPost);
            const afterIndex= dataBase.slice(indexPost + 1)
            
            const newDB= [...beforeIndex,...afterIndex];

            return {
                dataBase: newDB
            }
        })
    }
    
    render () {
        return (
            <AppBlock >
                <AppHeader/>
                <div className='search-panel d-flex'>
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList data={this.state.dataBase} onDelete= {this.deletePost}/>
                <PostAddForm/>
            </AppBlock>
        
        )
    }
}