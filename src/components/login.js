import React, {useState} from 'react';
import { LoginService } from '../service';
import { useDispatch,useSelector } from 'react-redux';
import { fetch_data_success } from './redux/action';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { SingupService } from '../service';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const HandleSubmit =()=>{
    const email = document.getElementById('form1').value
    const password = document.getElementById('form2').value
    LoginService(email,password)
    .then(res =>{
        
         if (res.status === 200){
           dispatch(fetch_data_success(res.data))
           if (res.data.employee.Designation === "Admin"){
             navigate('/Admin')
           }
           else {
               navigate('/employee')
           }
         }
     
    })
    .catch(err => {
     toast.error(err.response.data.message,{
       position:toast.POSITION.TOP_RIGHT
     })
    })
  
 }

 const HandleSingup = () => {
   const password = document.getElementById("newpass").value
   const newpassword = document.getElementById("newpaas1").value
    if (password === newpassword) {
      const Data = {
        "name": document.getElementById("newname").value,
        "Designation":document.getElementById("newdesig").value,
        "Email":document.getElementById("newemail").value,
        "phone":document.getElementById("newPhone").value,
        "password":newpassword
      }
      SingupService(Data)
       .then(res => {
        handleJustifyClick('tab1')
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
       })
       
       .catch(err => {
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT
        });
       })
    }
     else {
      toast.error("Enter Same Password", {
        position: toast.POSITION.TOP_RIGHT
      });
     }
 
 }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
       <ToastContainer/>
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>


          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" onClick={HandleSubmit}>Sign in</MDBBtn>
          <p className="text-center">Not a member? <a href="#!">Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <MDBInput wrapperClass='mb-4' label='Name' id='newname' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Email' id='newemail' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Phone number' id='newPhone' type='tel' />
          <select  class="form-select mb-4" aria-label="Default select example" id='newdesig'>
  <option selected>Select Designation</option>
  <option value="Frontend Developer">Frontend Developer</option>
  <option value="Backend Developer">Backend Developer</option>
  <option value="Traniee">Traniee</option>
  <option value="Other">Other</option>
</select>
          <MDBInput wrapperClass='mb-4' label='Password' id='newpass' type='password'/>
          <MDBInput wrapperClass='mb-4' label='Confirm Password' id='newpaas1' type='password'/>

          <MDBBtn className="mb-4 w-100" onClick={HandleSingup}>Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default Login;