import React from "react";
import { Button } from 'reactstrap';

const PostStatusFilter = () => {
    return (
        <div className="btn-group">
            <Button color="info" outline>Всё</Button>
            {/* <button type='button' className='btn btn-info'>Всё</button> */}
            <button type='button' className='btn btn-outline-secondary'>Понравилось</button>
        </div>
    )
}

export default PostStatusFilter;