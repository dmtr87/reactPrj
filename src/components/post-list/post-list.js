import React from "react";
import PostListItem from "../post-list-item"
import {ListGroup} from 'reactstrap'
import "./post-list.css";


const PostList = ({visiblePosts,onDelete,onToggleImpotent,onToggleLike}) => {

    const newPost= visiblePosts.map((item) => {
        const {id, ...itemProps}= item;
        return(
            <li key={id} className="list-group-item">
                <PostListItem 
                {...itemProps} 
                onDelete={ () => onDelete(id)}
                onToggleImpotent= { () => onToggleImpotent(id) }
                onToggleLike= { () => onToggleLike(id) }/>
            </li>
        )
    });

    return (
        <ListGroup className="app-list">
            {newPost}
        </ListGroup>
    )
}

export default PostList;