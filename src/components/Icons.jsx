import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'



function Icons() {
    const [like, setLike] = useState(false)
    const likePoke = () => [
        setLike((check) => !check)
    ]

    return (
        <button onClick={() => likePoke()}> {like ? <FaHeart style={{color : "red"}} /> : <FaRegHeart />} </button>
    )
}

export default Icons