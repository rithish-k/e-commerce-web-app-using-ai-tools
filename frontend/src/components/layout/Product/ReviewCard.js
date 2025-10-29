import React from 'react'
import { Rating } from 'react-simple-star-rating';
import profilejpg from "../../../assets/profile.jpg";
const ReviewCard = ({review}) => {
    const options = {
        readonly: true,
        size: window.innerWidth < 600 ? 20: 25,
        initialValue: review.rating,
        allowFraction: true,
        fillColor: "tomato",
        emptyColor: "rgba(20,20,20,0.1)"
    };  
    return( 
    <div className='reviewCard'>
        <img src={profilejpg} alt = "user"/>
        <p>{review.name}</p>
        <Rating {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard