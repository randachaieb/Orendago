import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getCards } from '../../../Redux/actions/cardActions';
import { getUsers} from '../../../Redux/actions/userActions';
import { deleteUser } from '../../../Redux/actions/userActions';
import {CardDeck, Card, Button} from 'react-bootstrap'
import Profile from '../Dashboard/Profile'


function Users() {

    const users = useSelector(state => state.userReducer.users)
    const user = useSelector(state => state.authReducer.user)

    const UserString = useSelector(state => state.userReducer.UserString)

    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(getCards())
  }, [])

  useEffect(() => {
    dispatch(getUsers())
  }, [])


return (
  <Router>
    <Route path="/Users" render={() => 
  <>
  <div className="col-10">

    <div className="user-group" style={{marginLeft:'20%'}}>
      <>
      {
      users && users
      .filter(el => el.fullname.toLowerCase().includes(UserString.toLowerCase().trim()))
      .filter(el => el.role[0] !== "Admin")
      .map(el =>
        <Card style={{display:'inline-block', margin:'20px', width:'270px', textAlign:'center'}} key={el._id}>
        <Card.Body>
        <Link to={`/${el._id}`}><Card.Title>{el.fullname}</Card.Title></Link>
          <Card.Text>Email: {el.email}</Card.Text>
          <Card.Text>Role: {el.role}</Card.Text>
          {user && user.role[0] === "Admin" &&
          <Button variant="danger" onClick={() => dispatch(deleteUser(el._id))}>Delete User</Button>
          }
          <Link to={`/${el._id}`}><Button>See Profile</Button></Link>
        </Card.Body>
        </Card>
        
      )}
      </>
    </div> 
</div>
  </>
    }/>

<Route path="/:_id"  component={Profile}/>

  </Router>
    )
}

export default Users
