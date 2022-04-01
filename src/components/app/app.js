import React from 'react'; 
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import "./app.css";




const App = () => {

    const dataBase= [
        {label:"Дособирать гидрофор", important: true, id:'asdasd'},
        {label:"Подтянуть помпу", important: false, id:'awdawd'},
        {label:"Поколоть дрова", important: false, id:'acxa'}
    ]

    return (
        <div className='app'>
            <AppHeader/>
            <div className='search-panel d-flex'>
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            <PostList data={dataBase}/>
            <PostAddForm/>
        </div>
    
    )
};

export default App;