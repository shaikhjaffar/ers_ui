import { useSelector } from 'react-redux';


export  const useId =(id)=>{
      let Data = []
    const getdata = useSelector((state)=> state.DataReducer.data);
       console.log(getdata)
      getdata.filter(function (elemnt){
        if(id === elemnt._id){
             console.log(elemnt)
            Data = elemnt
        }
      })
     return Data
}