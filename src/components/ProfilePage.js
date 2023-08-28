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

export default function ProfilePage() {
  const [basicModal, setBasicModal] = useState(false);
  const [updateModal, setupdateModal] = useState(false);
  const [reviewModal,setreviewModal] = useState(false)
   const [user,setuser] = useState()
  const toggleShow = () => setBasicModal(!basicModal);
  const getdata = useSelector((state)=> state.profileReducer.data);
   const [Data,setData] = useState()
   const [average,setaverage] = useState(0)
      function CalculateAverage () {
         const r1 = Number(document.getElementById('manager').value)
         const r2 = Number(document.getElementById('hr').value)
         const r3= Number(document.getElementById('tl').value)
         setaverage((r1+r2+r3)/3)
      }  
     function OpenReview(){
      setreviewModal(!reviewModal)
      EmployeeService.getAllEmployee()
      
      .then(res => {
        setuser(res.data)
      })
     }
      function AssignedReview(){
       const assigId = document.getElementById('assigndrp').value
       console.log(assigId)
       const assigName = document.getElementById('assigndrp')
        console.log(assigName.options[assigName.selectedIndex].text)
         ReviewService.addReview({
          id:Data._id,
          Invigilator: assigId
         })
         .then(res => {
          toast.success(`Review Assigned to ${assigName.options[assigName.selectedIndex].text}`,{
             position:toast.POSITION.TOP_RIGHT
          })
          console.log(res.data)
         })
         .catch(err => {
          toast.error(err.response.data.message,{
            position:toast.POSITION.TOP_RIGHT
          })
    
         })
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
             setData(res.data.review)
             toggleShow()
           })
           .catch(err => {
            toast.error(err.response.data.message,{
              position:toast.POSITION.TOP_RIGHT
            })
            toggleShow()
           })
      }
       function ChangeDesig(){
        EmployeeService.updateDesig(
          {
            "id":Data._id,
            "desig":document.getElementById("admin").value
          }
        )
        .then(res => {
          toast.success(res.data.message,{
             position:toast.POSITION.TOP_RIGHT
          })
          setupdateModal(!updateModal)
         })
       }

   useEffect(()=>{
  EmployeeService.getEmployeById(window.location.pathname.split("/").splice(-1).toLocaleString())
  .then(res =>{
    setData(res.data)
  })
   },[1])



  return (
     
      Data ?  <section style={{ backgroundColor: '#eee' }}>
      <ToastContainer />


      <MDBModal show={reviewModal} setShow={setreviewModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Assign Performance Review</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setreviewModal(!reviewModal)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
               <select id='assigndrp'>
                {
                user ? user.map (element => {
                  return (
                    <option key={element._id} value={element._id}>
                  {element.name}
                    </option>
                  )
                }) : <></>

                }
      
               </select>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>{setreviewModal(!reviewModal)}}>
                Close
              </MDBBtn>
              <MDBBtn onClick={()=>{
                AssignedReview()
              }}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


          <MDBModal show={updateModal} setShow={setupdateModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update Employee</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setupdateModal(!updateModal)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <select id='admin'>
                  <option value="Admin">
                     Admin
                  </option>
                  <option value="Employee">
                  Employee
                  </option>
                </select>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>{setupdateModal(!updateModal)}}>
                Close
              </MDBBtn>
              <MDBBtn onClick={()=>{
                ChangeDesig()
              }}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

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
              <MDBBtn className='mx-2' color='secondary' onClick={()=>{setupdateModal(!updateModal)}}>
          Change Designation
      </MDBBtn>
    
      <MDBBtn className='mx-2' color='Dark' onClick={()=>{OpenReview()}}>
                          Assign Review
      </MDBBtn>
      
        {
           Data.Review.length !== 0 ? <MDBBtn className='mx-2' color='info' onClick={toggleShow}> Update Review</MDBBtn>  : <MDBBtn className='mx-2' color='info' onClick={toggleShow}> Go for Review</MDBBtn> 
        }
          
     
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
                          Data.Review[0] ? <>
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
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    
    </section> : <loading></loading>
       

   
  );
}