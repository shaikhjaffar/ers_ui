
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit';
import { EmployeeService, ReviewService } from '../service';
import { ToastContainer, toast } from 'react-toastify';
import ReviewBox from './ReviewBox';
import { json } from 'react-router-dom';

export default function Employee() {
  const [basicModal, setBasicModal] = useState(false);
  const [feedback,setfeedback] = useState(false)
  const [password,setpassword] = useState(false)
  const toggleShow = () => setBasicModal(!basicModal);
  const getdata = useSelector((state)=> state.profileReducer.data);
   const [Data,setData] = useState()
   const [name,setname] = useState("")
   const [average,setaverage] = useState(0)
      function CalculateAverage () {
         const r1 = Number(document.getElementById('manager').value)
         const r2 = Number(document.getElementById('hr').value)
         const r3= Number(document.getElementById('tl').value)
         setaverage((r1+r2+r3)/3)
      }  

      function AddReview () {
          ReviewService.addReview({
            id : Data._id,
              Candidate_name:Data.name,
             manager: document.getElementById('manager').value,
             hr: document.getElementById('hr').value,
            TL: document.getElementById('tl').value,
             Average_Rating:average,
            complete: document.getElementById('complete').value,
            Invigilator:getdata.employee._id,
          }
              
          )
          .then(res => {
            toast.success(res.data.message,{
               position:toast.POSITION.TOP_RIGHT
            })
            //  setData(res.data.review)
             toggleShow()
           })
           .catch(err => {
            toast.error(err.response.data.message,{
              position:toast.POSITION.TOP_RIGHT
            })
            toggleShow()
           })
      }
       function updatePass (){
        EmployeeService.updatePass(
          {
            "id":Data._id,
            "pass":document.getElementById("password").value
          }
         
        
          
        )
        .then(res => {
          toast.success(res.data.message,{
             position:toast.POSITION.TOP_RIGHT
          })
          setpassword(!password)
         })
       }

       function AddFeedback(){
        EmployeeService.feedback(
          {
            "id":Data._id,
            "feedback":document.getElementById("feed").value
          }
        )
        .then(res => {
          toast.success(res.data.message,{
             position:toast.POSITION.TOP_RIGHT
          })
          setfeedback(!feedback)
         })
       }
   useEffect(()=>{
       
    setData(getdata.employee)
    if (getdata.employee.Review.length !== 0 ){
        EmployeeService.getEmployeById(getdata.employee.Review[0].Invigilator)
    .then(res => {
       setname(res.data.name)
    })
    }
   
 
   },[Data])
  return (
    Data ? 
    <div>
      <section style={{ backgroundColor: '#eee' }}>
    
      <MDBCard className="mb-4 mb-md-0">
      
      </MDBCard>
      <ToastContainer />
           <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Performance Review</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBInput label='Manager Rating' id='manager' type='number' onKeyDown={(e) => {
                              e.preventDefault();
                            }} onChange={()=>{CalculateAverage()}} min={0} max={10} />
               <MDBInput label='HR Rating' id='hr' type='number' onKeyDown={(e) => {
                              e.preventDefault();
                            }} onChange={()=>{CalculateAverage()}} min={0} max={10}/>
               <MDBInput label='Team Lead Rating' id='tl' type='number' onKeyDown={(e) => {
                              e.preventDefault();
                            }} onChange={()=>{CalculateAverage()}} min={0} max={10}/>
             <MDBInput  id='avg' disabled value={`Average Rating :${average ? average : 0} `}/>
             <MDBInput label='Project Completed' id='complete' type='number' onKeyDown={(e) => {
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
      <MDBModal show={feedback} setShow={setfeedback} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Performance Review</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setfeedback(!feedback)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              
            <MDBInput label='Write Your feedback' id='feed' type='text' />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>{setfeedback(!feedback)}}>
                Close
              </MDBBtn>
              <MDBBtn onClick={()=>{
                 AddFeedback()
              }}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal show={password} setShow={setpassword} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Change Password</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setpassword(!password)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              
            <MDBInput label='Enter new Password' id='password' type='password' />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>{setpassword(!password)}}>
                Close
              </MDBBtn>
              <MDBBtn onClick={()=>{
                 updatePass()
              }}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>




      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{Data.Designation}</p>
                <p className="text-muted mb-4">{Data.name}</p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-10">
              <MDBBtn className='mx-2' color='secondary' onClick={()=>{
                setpassword(!password)
              }}>
          Update Password
      </MDBBtn>
      <MDBBtn className='mx-2' color='secondary' onClick={()=>{setfeedback(!feedback)}}>
          Add Feed Back
      </MDBBtn>
      
     
          
     
              </MDBCardBody>
            </MDBCard>


          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Data.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Data.Email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Data.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Performance</span>Rating</MDBCardText>
                        {
                          Data.Review.length !== 0 ? <>
                          <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Manager Rating</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={Data.Review[0].Manager_Rating*10} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>HR Rating</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={Data.Review[0].Hr_Rating*10} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Team Lead Rating</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={Data.Review[0].TeamLead_Rating*10} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Evaluated By</MDBCardText>
                    <MDBBtn className='mx-2' color='dark'>
                    {name}
      </MDBBtn>
            


                          </> :       <MDBBtn className='mx-2' color='light'>
                          No Review Given
      </MDBBtn>
                        }  

                    
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Project Detail</span></MDBCardText>
                   

                    {
                      Data.Review[0] ? <>
                            <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Completed Project</MDBCardText>
                    <MDBBtn className='mx-2' color='secondary'>
                   {Data.Review[0].ProjectComplete}
      </MDBBtn>
     
      
                      </> :  <MDBBtn className='mx-2' color='light'>
                         No Project Detail
      </MDBBtn>
                    }
              

            

                   
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Performance </span>Review</MDBCardText>
                   
                    <ReviewBox id={Data._id}/>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    
    </section>
    </div>  : <></>
  )
}
