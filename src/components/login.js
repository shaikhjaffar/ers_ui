import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { LoginService } from '../service';
import { useDispatch,useSelector } from 'react-redux';
import { fetch_data_success } from './redux/action';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'bootstrap';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  //const getdata = useSelector((state)=> state.profileReducer.data);
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

  return (
    <MDBContainer className='my-3 g-0 d-flex align-items-center'>
      <MDBCard>
      <ToastContainer />
        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>

              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

            

              <MDBBtn className="mb-4 w-100" onClick={HandleSubmit}>Sign in</MDBBtn>

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

export default Login;