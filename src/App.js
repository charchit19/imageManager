import Login from './components/login';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Images from './components/images';
import Users from './components/users';
import Allima from './components/allimages';
import UserImages from './components/userImages';
import EditImage from './components/editimage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ='/' exact element = {<Register/>}></Route>
      <Route path ='/register' exact element = {<Register/>}></Route>
      <Route path ='/login' exact element = {<Login/>}></Route>
      <Route path ='/dashboard' exact element = {<Dashboard/>}></Route>
      <Route path ='/images' exact element = {<Images/>}></Route>
      <Route path ='/users' exact element = {<Users/>}></Route>
      <Route path ='/allimg' exact element = {<Allima/>}></Route>
      <Route path="/user-images/:email" element={<UserImages />} />
      <Route path="/user-images/:email/:imageIndex" element={<EditImage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
