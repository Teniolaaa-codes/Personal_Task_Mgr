import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import MyTasks from "./pages/MyTasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/mytasks" element={<MyTasks />} />
          <Route path="/newtask" element={<NewTask />} />
          <Route path="/edittask/:id" element={<EditTask />} /> {/* Edit task by id */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// https://personal-task-manager-1-qlkp.onrender.com
