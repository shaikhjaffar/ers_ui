import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import Profile from '../assets/profile.png'
import { EmployeeService } from '../service';
import { useNavigate } from 'react-router-dom';
import { fetch_All_data_ } from './redux/action';
export default function AdminDashboard() {
   const dispatch = useDispatch()
    const getdata = useSelector((state)=> state.profileReducer.data);
 
    const [basicModal, setBasicModal] = useState(false);

    const [data,setdata] = useState([])
    const navigate = useNavigate()
    const toggleShow = () => setBasicModal(!basicModal);
    
      function showdetail (){
        const showdetail = document.getElementById('detail')
          showdetail.style.transform = "scale(1,1)"
      }
      function Notshowdetail (){
        const showdetail = document.getElementById('detail')
          showdetail.style.transform = "scale(0,0)"
      }
      function getAllEmployee3 () {
        EmployeeService.getAllEmployee()
        .then(res =>{
          if(res.status !== 200) {
           toast.error(res.statusText, {
             position: toast.POSITION.TOP_RIGHT
           }); 
          }
         setdata(res.data)
          dispatch(fetch_All_data_(res.data))
        })
        .catch(err => {
         toast.error(err, {
           position: toast.POSITION.TOP_RIGHT
         });
        })
      }


       function deleteEmployee(id){
         EmployeeService.deleteEmployee(id)
         .then(res => {
          toast.success(res.data.message,{
             position:toast.POSITION.TOP_RIGHT
          })
         })
         .catch(err => {
          toast.error(err.response.data.message,{
            position:toast.POSITION.TOP_RIGHT
          })
         })
         getAllEmployee3()
       }
       function AddEmployee () {
        const Data = {
          "name": document.getElementById("typeText").value,
          "Designation":document.getElementById("desig").value,
          "Email":document.getElementById("typeEmail").value,
          "phone":document.getElementById("typePhone").value
        }
        EmployeeService.addEmployee(Data)
         .then(res => {
          toggleShow()
          getAllEmployee3()
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

      useEffect(()=>{
        getAllEmployee3()
      },[1])
  return (
    <>
      <ToastContainer />
         <div className="top-nav">
        <h2 style={{marginLeft: "5%"}}>Admin Dashboard</h2>
        <div className="userConatiner" onMouseOver={showdetail} onMouseOut={Notshowdetail} >
        <img src={Profile} className="profileimg"  alt="profile"/>
        <div className="pdetail" id="detail">
          <span>{getdata.employee.name}</span>
          <span onClick={()=>{
            navigate("/")
          }}>Logout</span>
        </div>
        </div>
      
       
      </div>
      <div className="main-section">
      <div className="main" id="ico">
        <ul className="full" id="ful">
          <li onClick={toggleShow}>
            Add Employee
          </li>
        </ul>
      </div>
      <div style={{width:"80%"}}>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Sr.no</th>
      <th scope="col">Name</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Email</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
      {
        data.map((emp,index) => {
          return(
            <tr key={emp.id}>
          <th scope="row">{index+1}</th>
          <td>{emp.name}</td>
          <td>{emp.phone}</td>
          <td>{emp.Email}</td>
          <td onClick={()=>{
           navigate(`/profilePage/${emp._id}`)
          }}><img width="25" height="25" src="https://img.icons8.com/ios/50/connection-sync.png" alt="connection-sync"/></td>
          <td onClick={()=>{
            deleteEmployee(emp._id)
          }}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg></td>
        </tr>)
        })
      }
  </tbody>
</table>
      </div>
     
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add New Employee</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBInput label='Name' id='typeText' type='text' />
            <MDBInput label='Email' id='typeEmail' type='email' />
            <MDBInput label='Phone number' id='typePhone' type='tel' />
            <select class="form-select" aria-label="Default select example" id='desig'>
  <option selected>Select Designation</option>
  <option value="Admin">Admin</option>
  <option value="Employee">Employee</option>
</select>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={()=>{
                AddEmployee()
              }}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      
      </div>

        
    </>
  )
}
