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
                {label:"Дособирать гидрофор", important: true,like: false, id: 1},
                {label:"Подтянуть помпу", important: false,like: false, id: 2},
                {label:"Поколоть дрова", important: false,like: false, id: 3}
            ]
        }
        this.deletePost= this.deletePost.bind(this);
        this.addPost= this.addPost.bind(this);
        this.onToggleImpotent= this.onToggleImpotent.bind(this);
        this.onToggleLike= this.onToggleLike.bind(this);
        this.maxId = 4;
    }
    deletePost (id){
        this.setState(({dataBase}) => {
            const indexPost= dataBase.findIndex((post) => post.id === id);
            const beforeIndex= dataBase.slice(0,indexPost);
            console.log(beforeIndex);
            const afterIndex= dataBase.slice(indexPost + 1)
            console.log(afterIndex);
            const newDB= [...beforeIndex,...afterIndex];
            console.log(newDB);
            return {
                dataBase: newDB
            }
        })
    }

    addPost(body){
        const newPost = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({dataBase}) => {
            const newArrPost = [...dataBase, newPost];
            return { 
                dataBase: newArrPost
            }
        })
    }

    onToggleImpotent(id){
        console.log(`Impotent ${id}`)
    }


    onToggleLike(id) {
        this.setState(({dataBase}) => {
            const indexPost= dataBase.findIndex((elem) => elem.id === id);
            
            const beforeIndexPost = dataBase.slice(0, indexPost);
            const afterIndexPost = dataBase.slice(indexPost + 1);

            const oldPost = dataBase[indexPost];
            const newPost = {...oldPost, like: !oldPost.like}
            const newArr = [...beforeIndexPost, newPost, ...afterIndexPost]
           
            return{
                dataBase: newArr
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
                <PostList 
                    data={this.state.dataBase} 
                    onDelete= {this.deletePost}
                    onToggleImpotent= {this.onToggleImpotent}
                    onToggleLike= {this.onToggleLike}/>
                <PostAddForm 
                    onAdd={this.addPost}/>
            </AppBlock>
        
        )
    }
}