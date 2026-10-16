import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/protectedRoute";
import { AuthProvider } from "./context/authContext";
import HomePage from "./pages/HomePage";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import MyTasks from "./pages/MyTasks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mytasks"
            element={
              <ProtectedRoute>
                <MyTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newtask"
            element={
              <ProtectedRoute>
                <NewTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edittask/:id"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />{" "}
          {/* Edit task by id */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
