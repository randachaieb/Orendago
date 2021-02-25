import React from 'react'
import { filterCardsByTitle, filterCardsByRegion, filterCardsByCategory } from '../../../Redux/actions/cardActions';
import {useDispatch, useSelector} from 'react-redux'
import {Form} from 'react-bootstrap'




function Filter() {

    const TitleString = useSelector(state => state.cardReducer.TitleString)
    const RegionString = useSelector(state => state.cardReducer.RegionString)
    const dispatch = useDispatch()

    return (
    <Form style={{display:'flex', justifyContent:'space-around'}}>
        <Form.Group controlId="formGroupName">
          <Form.Label>Search By Company</Form.Label> <br></br>
          <Form.Control type="text" placeholder="search by name" value={TitleString} onChange={e => dispatch(filterCardsByTitle(e.target.value))} style={{borderColor:'grey'}}/>
        </Form.Group>
        <Form.Group controlId="formGroupRegion">
          <Form.Label>Search by Region</Form.Label> <br></br>
          <Form.Control type="text" placeholder="search by region" value={RegionString} onChange={e => dispatch(filterCardsByRegion(e.target.value))} style={{borderColor:'grey'}}/>
        </Form.Group>
      <Form.Group controlId="formGroupCategory"> 
      <Form.Label>Search by Category</Form.Label> <br></br>
      <select onChange={e => dispatch(filterCardsByCategory(e.target.value))} style={{width:'160px', height:'35px', borderRadius:'5px', borderColor:'grey'}}>
        <option value="All">All</option>
        <option value="Schools">Schools</option>
        <option value="Training Centers">Training Centers</option>
        <option value="Coworking Spaces">Coworking Spaces</option>
        <option value="Clubs">Clubs</option>
      </select>
      </Form.Group>
    </Form>
    )
}

export default Filter
