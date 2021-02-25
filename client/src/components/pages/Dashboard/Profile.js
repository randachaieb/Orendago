import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {useParams, Link} from 'react-router-dom'
import {getProfile} from '../../../Redux/actions/userActions'
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button} from 'reactstrap';



function Profile() {

    const user = useSelector(state => state.authReducer.user)
    const users = useSelector(state => state.userReducer.users)
    const dispatch = useDispatch()
    const {_id} = useParams()

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    return (
        
<div>
    {users && users.map(el => el._id == _id ?
<div>
<Card>
    <div style={{marginLeft:'40%', display:'block'}}>
    <CardImg top width="100%" src={el.photo} alt="" style={{width:'35%'}}/>
    <CardBody>
      <CardTitle tag="h5">Full Name:{el.fullname}</CardTitle>
      <CardSubtitle tag="h6" className="mb-2 text-muted" >Role: {el.role}</CardSubtitle>
      {el.address && <CardText>Address: {el.address}</CardText>}
      {el.dateOfBirth && <CardText>Date Of Birth: {el.dateOfBirth}</CardText>}
      <CardText>Email: {el.email}</CardText>
      {el.phoneNumber && <CardText>Phone Number: {el.phoneNumber}</CardText>}
      {el.role[0] === "Professional" && el.description && <CardText>Description: {el.description}</CardText>}
    </CardBody>
  </div> 
</Card> 
</div> : null )}
</div>)
}

export default Profile
