import React,{useState} from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useDispatch} from 'react-redux'
import {editUser} from '../../../Redux/actions/userActions'
import axios from 'axios'

const EditProfile = ({el}) => {


const [editPhoto, setEditPhoto] = useState(el.photo)
const [editFullname, setEditFullname] = useState(el.fullname)
const [editDateOfBirth, setEditDateOfBirth] = useState(el.dateOfBirth)
const [editEmail, setEditEmail] = useState(el.email)
const [editAddress, setEditAddress] = useState(el.address)
const [editPhoneNumber, setEditPhoneNumber] = useState(el.phoneNumber)
const [editDescription, setEditDescription] = useState(el.description)
const [editPassword, setEditPassword] = useState(el.password)


const [modalIsOpen,setIsOpen] = useState(false);

const dispatch = useDispatch() 


const edittingUser = () => {
    dispatch(editUser( el._id,
        {photo: editPhoto,
        fullname: editFullname,
        dateOfBirth: editDateOfBirth, 
        email: editEmail, 
        address: editAddress, 
        phoneNumber: editPhoneNumber,
        description: editDescription,
        password: editPassword,
        } 
        ))
    setEditPhoto(el.photo); setEditFullname(el.fullname); setEditDateOfBirth(el.dateOfBirth); setEditEmail(el.email);
    setEditAddress(el.address); setEditPhoneNumber(el.phoneNumber); setEditPassword(el.password);
    setIsOpen(false)
}
/*
const [file, setFile] = useState({})

const onChange = e => {
    setFile(e.target.files[0])
    setEditPhoto(e.target.files[0].name)
    }

    const submitForm = () => {
        const formData = new FormData();
        formData.append("name", editPhoto);
        formData.append("file", file);

        axios.post('/api/users/:_id', formData)
        .then((res) => {
            alert("File Upload success");
        })
        .catch((err) => alert("File Upload Error"));
        };
*/
return (
<div>   
    <Button onClick={() => setIsOpen(true)} style={{marginLeft:'47%'}}>Edit Profile</Button>  
        <Modal isOpen={modalIsOpen}>
        <Form style={{width:'400px', marginLeft:'35%', textAlign:'center', fontWeight:'bold'}}>
            {/*
        <form onSubmit={submitForm}>
        <div className="custom-file mb-4">
            <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
            <label className="custom-file-label" htmlfor="customFile">{editPhoto ? editPhoto : 'Choose file'}</label>
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
        </form>

        <div className="row mt-5">
        <div className="col-md-6 m-auto">
            {editPhoto && <img style={{width: '50%'}} src={file.name} alt={editPhoto}/>}
        </div>
        </div>
            */}

            <Form.Group controlId="formBasicPhoto">
                <Form.Label style={{textAlign:'center'}}>Photo</Form.Label>
                <Form.Control type="text" placeholder="enter a new Photo URL" value={editPhoto} onChange={e => setEditPhoto(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicFullname">
                <Form.Label>FullName</Form.Label>
                <Form.Control type="text" placeholder="enter a new fullname" value={editFullname} onChange={e => setEditFullname(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicDateOfBirth">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control type="date" value={editDateOfBirth} onChange={e => setEditDateOfBirth(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="enter a new email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="enter a new address" value={editAddress} onChange={e => setEditAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="enter a new phone number" value={editPhoneNumber} onChange={e => setEditPhoneNumber(e.target.value)} />
            </Form.Group>

            {el.role[0] === "Professional" &&
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="enter a new description" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
            </Form.Group>}

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="enter a new password" value={editPassword} onChange={e => setEditPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={edittingUser}>Save</Button>
            <Button variant="primary" type="submit" onClick={() => setIsOpen(false)}>Close</Button>
        </Form>
        </Modal>   
    </div>

)
}

export default EditProfile