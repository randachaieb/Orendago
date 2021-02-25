import React from 'react'
import HomeStudent from './HomeStudent'
import HomePro from './HomePro'
import HomeAdmin from './HomeAdmin'
import HomeVisitor from './HomeVisitor'
import {useSelector} from 'react-redux'



const Home = ({result}) => {
  
  const user = useSelector(state => state.authReducer.user)
  const isAuth = useSelector(state => state.authReducer.isAuth)


  if(user && isAuth && user.role[0] === "Admin") {
    return <HomeAdmin result={result}/>
  }
  
  else if (user && isAuth && user.role[0] === "Professional") {
    return <HomePro result={result}/>
  } 
  
  else if (user && isAuth && user.role[0] === "Student") {
    return <HomeStudent result={result}/>
  } 
  
  else {
    return <HomeVisitor result={result}/>
  }

} 

export default Home;