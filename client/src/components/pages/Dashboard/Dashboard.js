import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Spinner } from 'reactstrap';
import EditProfile from './EditProfile';
import {deleteUser} from '../../../Redux/actions/userActions'
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button} from 'reactstrap';
import {BrowserRouter as Router , Route} from 'react-router-dom'


const Dashboard = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.user);
  const users = useSelector(state => state.userReducer.users)

  const { isLoading } = useSelector((state) => state.authReducer);


  if (isLoading || !user ) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner
          style={{ width: '3rem', height: '3rem', color: 'secondary' }}
          type="grow"
        />
      </div>
    );
  }

    return (
  <Router>
  <div>
    {users && users
    .filter(el => el.email === user.email)
    .map(el =>    
<Route path="/dashboard/:_id" render={() => 
<Card>
  <Button onClick={() => dispatch(deleteUser(el._id))} style={{width:'120px'}}>delete Profile</Button>
  <div style={{marginLeft:'40%', display:'block'}}>
    <CardImg top width="100%" src={el.photo} alt="" style={{width:'35%'}}/>
    <CardBody>
      <CardTitle tag="h5">Full Name: {el.fullname}</CardTitle>
      <CardSubtitle tag="h6" className="mb-2 text-muted" >Role: {el.role}</CardSubtitle>
      {el.address && <CardText>Address: {el.address}</CardText>}
      {el.dateOfBirth && <CardText>Date Of Birth: {el.dateOfBirth}</CardText>}
      <CardText>Email: {el.email}</CardText>
      {el.phoneNumber && <CardText>Phone Number: {el.phoneNumber}</CardText>}
      {el.role[0] === "Professional" && el.description && <CardText>Description: {el.description}</CardText>}
    </CardBody>
  </div>
  <EditProfile el={el}/> 
</Card>
}/>
    )}
  </div>
  </Router>
  );
};

export default Dashboard;