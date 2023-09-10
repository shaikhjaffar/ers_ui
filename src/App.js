
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import Employee from './components/Employee';
import ProfilePage from './components/ProfilePage';
import Login from './components/login';
import { Route,Routes} from 'react-router-dom';
function App() {
  return (
    <>
    <Routes>
   <Route  path='/ers_ui' element={ <Login/>} />
   <Route path='/ers_ui/Admin' element={<AdminDashboard/>} />
   <Route path='/ers_ui/profilePage/:id' element={<ProfilePage/>} />
   <Route path='/ers_ui/Employee' element={<Employee/>} />
   <Route>404 Not Found</Route>
   </Routes>
    </>
  
  );
}

export default App;
