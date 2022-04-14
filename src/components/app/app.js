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
            ],
            term: '',   /// строка поиска в которую будем писать то что хотим найти , т.к. она будет меняться значит у неё должно быть состояние.
            filter: 'all'  //По умолчанию фильер вкл в позицию Показать всё
        }
        this.deletePost= this.deletePost.bind(this);
        this.addPost= this.addPost.bind(this);
        this.onToggleImpotent= this.onToggleImpotent.bind(this);
        this.onToggleLike= this.onToggleLike.bind(this);
        this.onUpdateSearchPost= this.onUpdateSearchPost.bind(this);
        this.onFilterSelect= this.onFilterSelect.bind(this);
        
        this.maxId = 4;
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
    

    changeProperty(id,property){
        this.setState(({dataBase}) => {
            const indexPost= dataBase.findIndex((elem) => elem.id === id);
           
            const beforeIndexPost = dataBase.slice(0, indexPost);
            
            const afterIndexPost = dataBase.slice(indexPost + 1);
           

            const oldPost = dataBase[indexPost];
            const newPost = {...oldPost, property: !oldPost.property}
            const newArr = [...beforeIndexPost, newPost, ...afterIndexPost]
           
            return{
                dataBase: newArr
            }


        })
    }


    onToggleImpotent(id){
        this.setState(({dataBase}) => {
            const indexPost= dataBase.findIndex((elem) => elem.id === id);
           
            const beforeIndexPost = dataBase.slice(0, indexPost);
            
            const afterIndexPost = dataBase.slice(indexPost + 1);
           

            const oldPost = dataBase[indexPost];
            const newPost = {...oldPost, important: !oldPost.important}
            const newArr = [...beforeIndexPost, newPost, ...afterIndexPost]
           
            return{
                dataBase: newArr
            }


        })
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
    // Мы предполагаем что имеет в filter  2 значения(all или like) Мы проверяем если в state.filter значение 'like '  значит мы должны отфильтровать весь массив с обьектами и создать новый ( filter создает новый массив) в котором  item.like = true.
    // Иначе state.filter =all  и мы должны вернуть весь массив без изменений
    filterPost (items, filter) {
        if(filter === 'like') {
            return items.filter((item) => item.like)
        } else{
            return items
        }
    }
    
    searchPost (items, term) {
        // Проверяем кол-во символов в term , если пусто(пользователь нечего не ввел или стер) тогда мы возвращаем посты которые у нас прихоят в dataBase (в оригиналe)
        if(term.lenght === 0) { 
            return items
        }
        //Возвращаем .  Фильтруем( с помощью filter()) все обьекты на предмет совпадения ( с помощью indexOf()) в них  то что ввёл пользователь (term) . Если нету совпадений то indexOf выдает -1  а мы ВОЗВРАЩАЕМ ТОЛЬКО совпадения след всё что больше -1.
        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        })

    }
        //Этот метод обновляет наш state.term из search-panel
    onUpdateSearchPost(term) {
        this.setState({
            term: term
        })
    }

    onFilterSelect(filter) {
        this.setState({
            filter: filter
        }) 
    }
    render () {
        const {dataBase, term, filter}=this.state;
        const liked = dataBase.filter((item) => item.like).length;
        const allPost = dataBase.length;

        /*  1)   Мы это делаем для того что бы при вводе в посковую строку показать на экране только те посты в которых есть совпадения (searchPost (items, term))
            2)    visiblePosts содержит  посты которые совпадают с тем что ввёл польховаель в строку поиска (term)
            Изначально до фильтрации

            const visiblePosts = this.searchPost(dataBase, term);

         */
        /*
            Добавляем  фильтрацию

            3)  Далеее мы фильтруем   с помощью filterPost (items, filter)   уже  показать на экране посты в которых есть совпадения (searchPost (items, term))   см. выше
         
        */
        const visiblePosts = this.filterPost(this.searchPost(dataBase, term), filter);

        

        return (
            <AppBlock >
                <AppHeader
                liked={liked}
                allPost={allPost}/>
                <div className='search-panel d-flex'>
                    <SearchPanel
                    onUpdateSearchPost={this.onUpdateSearchPost}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                    visiblePosts={visiblePosts} 
                    onDelete= {this.deletePost}
                    onToggleImpotent= {this.onToggleImpotent}
                    onToggleLike= {this.onToggleLike}/>
                <PostAddForm 
                    onAdd={this.addPost}/>
            </AppBlock>
        
        )
    }
}