import axios from "axios"
 const url = "https://ersapi.onrender.com"
const LoginService = (email,password) => {
       return axios
        .post(`${url}/login`,{
            "email":email,
            "password":password
        })
}
const SingupService = (data) => {
  return axios
  .post(`${url}/singupUser`,data)
}

const EmployeeService = {
   getAllEmployee : function (){
    return axios
      .get(`${url}/allemployee`)
   },
   addEmployee : function (data){
    return axios 
      .post(`${url}/addEmployee`,data)
   },
   getEmployeById: function (id){
    return axios 
    .post(`${url}/GetEmployeeById`,{
      "id":id
    })
   },
   updateEmployee:function (data){
    return axios
    .post(`${url}/updateEmployee`,data)
   },
   updatePass:function (data){
    return axios
    .post(`${url}/newPassword`,data)
   },
   updateDesig:function (data){
    return axios
    .post(`${url}/changeDesig`,data)
   },
   feedback:function (data){
    return axios
    .post(`${url}/feedback`,data)
   },
   deleteEmployee : function (id){
    return axios 
      .post(`${url}/deletEmployee`,{
        "id":id
      })
   },
   uploadImage:function(data){
    return axios
    .post(`${url}/uploadImage`,data)
   }

}
const ReviewService = {
  getAllReview: function (){
   return axios
     .get(`${url}/allemployee`)
  },
  addReview : function (data){
   return axios 
     .post(`${url}/addReview`,data)
  },
  addFeedback:function(data){
    return axios 
    .post(`${url}//feedback`,data)
  }

}


export {LoginService,EmployeeService,ReviewService,SingupService}