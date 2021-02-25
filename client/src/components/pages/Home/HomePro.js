import React,{useEffect} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getCards, deleteCard } from '../../../Redux/actions/cardActions';
import {getUsers} from '../../../Redux/actions/userActions';
import EdittingCard from './Professional components/EdittingCard';
import AddingCard from './Professional components/AddingCard';
import Profile from '../Dashboard/Profile'
import Filter from './Filter'
import {CardDeck, Card, Button} from 'react-bootstrap'
import Users from './Users'


const HomePro = ({result}) => {


  const users = useSelector(state => state.userReducer.users)
  const user = useSelector(state => state.authReducer.user)
  const cards = useSelector(state => state.cardReducer.cards)

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
      <AddingCard cards={cards}/>
      <div className="card-group">
        {
        result && result
        .filter(el => el.title.toLowerCase().includes(TitleString.toLowerCase().trim()))
        .filter(el => el.region.toLowerCase().includes(RegionString.toLowerCase().trim()))
        .map(card => 
          {const pro = users && users.find(user => user.email === card.email)
            return (
        <div> 
          <CardDeck style={{margin: '20px'}}>
          <Card style={{ width: '18rem' , display:'flex', flexWrap:'wrap', textAlign:'center'}}>
            {pro ? 
            <Link to={`/${pro._id}`}>
              <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>
            </Link> : <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>}
            <Card.Body style={{display:'flex', flexDirection:'column', alignContent:'space-around'}}>
            {pro ? 
            <Link to={`/${pro._id}`}>
              <Card.Title> {card.title} </Card.Title>
            </Link> : <Card.Title> {card.title} </Card.Title>
            }
              <Card.Text>Region: {card.region}</Card.Text>
              <Card.Text>Category: {card.category}</Card.Text>
            </Card.Body>
            {user.email === card.email &&
            <div style={{display:'flex', justifyContent:'center'}}>
              <EdittingCard card={card}/>
              <Button  style={{width:'25px', height:'25px', padding:'1px 3px 3px', marginLeft:'70%'}} onClick={() => dispatch(deleteCard(card._id))}>X</Button> 
            </div>
            }
            <Card.Footer>
              <small className="text-muted">Created at: {card.dateOfCreation.substr(0,10)}</small>
            </Card.Footer>
          </Card>
          </CardDeck>
        </div>
          )})
        }
      </div>
    </>
    )}
    />

    <Route path="/Users" component={Users}/>

    <Route path="/:_id"  component={Profile}/>
    
  </div>
  </Router>
  )
}

export default HomePro; 
