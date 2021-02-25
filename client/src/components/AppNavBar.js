import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import { logout } from '../Redux/actions/authActions';

import {filterUsersByFullname} from '../Redux/actions/userActions'


const AppNavbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);

  const toggle = () => setIsOpen(!isOpen);

  const logoutUser = () => {
    dispatch(logout());
  };

  const UserString = useSelector(state => state.userReducer.UserString)

  const authLinks = (
    
    <Fragment >
      <NavItem>
        <Link to="/Users">
        <div className="navbar-text mr-3" style={{border:'black', marginBottom:'4px', height:'15px'}}>
          
            
            
            
            
            
            <input 
                type="text" 
                placeholder="Search..." 
                value={UserString} 
                onChange={e => dispatch(filterUsersByFullname(e.target.value))}
            />
        </div> 
        </Link>
      </NavItem>
      <NavItem>
        {user ?
        <Link to={`/dashboard/${user._id}`}>
          <span className="navbar-text mr-3" >
            {user.photo && <img style={{width:'20px', height:'20px', marginRight:'15px',marginBottom:'2px', borderRadius:'5px'}} src={user.photo} alt=""/>}
            <strong style={{color:'white'}}>{user ? `${user.fullname}` : null}</strong>
          </span>
        </Link> : null}
      </NavItem>
      {user && user.role[0] === "Student" && 
      <NavItem>
        <Link to="/subscribedIn">
          <span className="navbar-text mr-3">
          <strong style={{color:'white'}}>Subscribed In</strong>
          </span>
        </Link>
      </NavItem>
      }
      {user && user.role[0] === "Professional" && 
      <NavItem>
        <Link to="/subscribers">
          <span className="navbar-text mr-3">
          <strong style={{color:'white'}}>Subscribers</strong>
          </span>
        </Link>
      </NavItem>
      }
      <NavLink href="#" onClick={logoutUser} style={{color:'white'}}>
        Logout
      </NavLink>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="primary" dark expand="sm" expand="sm" className="mb-5" style={{borderRadius:'30px'}}>
        <Container>
          <NavbarBrand href="/" style={{fontFamily:'papyrus', fontWeight:'bold'}}>Orenda</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuth ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;