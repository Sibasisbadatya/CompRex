import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Chat from './Pages/Chat';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import Main from "./Pages/Main";
import Other from "./Pages/Other";
import Chart from "./Pages/Chart";
const App = () => {
  return (
    <>
      <Routes>
        {/* <Route exact path="/chat" element={<Chat />} /> */}
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/image" element={<Main />} />
        <Route exact path="/other" element={<Other />} />
        <Route exact path="/chart" element={<Chart />} />
      </Routes>
    </>
  )
}
export default App;
