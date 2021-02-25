import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getCards,subscribe, unsubscribe } from '../../../Redux/actions/cardActions';
import {getUsers} from '../../../Redux/actions/userActions';
import Profile from '../Dashboard/Profile'
import Filter from './Filter'
import {CardDeck, Card, Button} from 'react-bootstrap'
import Users from './Users'
import SubscribedIn from './SubscribedIn';


const HomeStudent = ({result}) => {
  
  const user = useSelector(state => state.authReducer.user)
  const users = useSelector(state => state.userReducer.users)
  const TitleString = useSelector(state => state.cardReducer.TitleString)
  const RegionString = useSelector(state => state.cardReducer.RegionString)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCards())
  }, [])

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  
  
  return (
  <Router>
  <div className="container">
    <Route exact path="/" render={() => (
    <>
      <Filter/> 
      <div className="card-group">
        {
        result && result
        .filter(card => card.title.toLowerCase().includes(TitleString.toLowerCase().trim()))
        .filter(card => card.region.toLowerCase().includes(RegionString.toLowerCase().trim()))
        .map(card => 
          {const pro = users && users.find(user => user.email === card.email)
          return (
            <CardDeck style={{margin: '20px'}}>
            <Card style={{ width: '18rem' , display:'flex', flexWrap:'wrap', textAlign:'center'}}>
              {pro ? 
              <Link to={`/${pro._id}`}>
                <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>
              </Link> : <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>}  
              <Card.Body style={{display:'flex', flexDirection:'column',alignContent:'space-around'}}>
              {pro ? 
              <Link to={`/${pro._id}`}>
                <Card.Title> {card.title} </Card.Title>
              </Link> : <Card.Title> {card.title} </Card.Title>
              }
                <Card.Text>Region: {card.region}</Card.Text>
                <Card.Text>Category: {card.category}</Card.Text>
                { card.subscribers.find(el => el._id === user._id)
                ? 
                <Button onClick={() => dispatch(unsubscribe(card._id, user._id))} style={{backgroundColor:'red'}}>Unsubscribe</Button>
                : 
                <Button onClick={() => dispatch(subscribe(card._id, user._id))}>Subscribe</Button>
                }
                
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Created at: {card.dateOfCreation.substr(0,10)}</small>
              </Card.Footer>
            </Card>
          </CardDeck>
        )})}
      </div>
    </>
    )}
    />

    <Route path="/Users" component={Users}/>

    <Route path="/:_id"  component={Profile}/>

    

  </div>
  </Router>
  )
};

export default HomeStudent; 