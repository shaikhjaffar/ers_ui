import React, { useState } from 'react'
import { useEffect } from 'react'
import { EmployeeService } from '../service'
import {ReviewService } from '../service';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
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
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
  } from 'mdb-react-ui-kit';
export default function ReviewBox(id) {
     const [Data,setData] = useState([])
      const [Profile,setProfile] = useState()
      const [data,setdata] = useState()
     const [basicModal, setBasicModal] = useState(false);
     const [average,setaverage] = useState(0)
     const toggleShow = () => setBasicModal(!basicModal);
     const getdata = useSelector((state)=> state.profileReducer.data.employee);
             
     function CalculateAverage () {
      const r1 = Number(document.getElementById('manager1').value)
      const r2 = Number(document.getElementById('hr1').value)
      const r3= Number(document.getElementById('tl1').value)
      setaverage((r1+r2+r3)/3)
   } 
   function AddReview () {
    
      console.log(getdata)
    ReviewService.addReview({
      id : data._id,
        name:data.name,
       manager: document.getElementById('manager1').value,
       hr: document.getElementById('hr1').value,
      TL: document.getElementById('tl1').value,
       Average_Rating:average,
      complete: document.getElementById('complete1').value,
      Invigilator:getdata._id,
    }
        
    )
    .then(res => {
      toast.success(res.data.message,{
         position:toast.POSITION.TOP_RIGHT
      })
       toggleShow()
     })
     .catch(err => {
      toast.error(err.response.data.message,{
        position:toast.POSITION.TOP_RIGHT
      })
      toggleShow()
     })
}

        useEffect(()=>{
            console.log(id)
            EmployeeService.getAllEmployee()
            .then(res => {
                  console.log(res.data)
              const filterData = res.data.filter(function (element){
                  if(element.Review.length !== 0 ){
                    if(element.Review[0].Invigilator === id.id){
                      return element
                  }
                  }
              
              })
               console.log(filterData)
               setData(filterData)
            })
            
        },[1])
  return (

        Data.length !== 0 ? Data.map(element => {
             return (
              <>
                <ToastContainer />
                <MDBBtn color='secondary' key={element._id} onClick={()=>{
                   setdata(element)
                  toggleShow()}}>
                {element.name}
              </MDBBtn>
              
           <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
           <MDBModalDialog>
             <MDBModalContent>
               <MDBModalHeader>
                 <MDBModalTitle>Performance Review</MDBModalTitle>
                 <MDBBtn className='btn-close' color='none' onClick={()=>{
                   setProfile(getdata)
                  toggleShow()}}></MDBBtn>
               </MDBModalHeader>
               <MDBModalBody>
               <MDBInput label='Candidate Name' id='name' type='text' value={ data?  data.name : ""} />
               <MDBInput label='Manager Rating' id='manager1' type='number' onKeyDown={(e) => {
                                 e.preventDefault();
                               }} onChange={()=>{CalculateAverage()}} min={0} max={10} />
                  <MDBInput label='HR Rating' id='hr1' type='number' onKeyDown={(e) => {
                                 e.preventDefault();
                               }} onChange={()=>{CalculateAverage()}} min={0} max={10}/>
                  <MDBInput label='Team Lead Rating' id='tl1' type='number' onKeyDown={(e) => {
                                 e.preventDefault();
                               }} onChange={()=>{CalculateAverage()}} min={0} max={10}/>
                <MDBInput  id='avg' disabled value={`Average Rating :${average ? average : 0} `}/>
                <MDBInput label='Project Completed' id='complete1' type='number' onKeyDown={(e) => {
                                 e.preventDefault();
                               }} min={0} max={10}/>
   
               </MDBModalBody>
   
               <MDBModalFooter>
                 <MDBBtn color='secondary' onClick={toggleShow}>
                   Close
                 </MDBBtn>
                 <MDBBtn onClick={()=>{
                    AddReview()
                 }}>Save changes</MDBBtn>
               </MDBModalFooter>
             </MDBModalContent>
           </MDBModalDialog>
         </MDBModal>
        </>
             )
           
        }) : <div>No Performance Review Task</div>
 )
}
