import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logoutUser } from "./reducers/userReducer";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import userService from "./services/users";
import IndivUser from "./components/IndivUser";
import IndivBlog from "./components/IndivBlog";
import Blogs from "./components/Blogs";
import { Nav, Navbar } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const { user, blogs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await userService.getAll();
      setUsers(users);
    };

    getAllUsers();
  }, []);

  const handleLogoutButton = () => {
    dispatch(logoutUser());
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link style={{ padding: 5 }} to="/">
                    home
                  </Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={{ padding: 5 }} to="/blogs">
                    blogs
                  </Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={{ padding: 5 }} to="/users">
                    users
                  </Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <p>{user.name} logged-in </p>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <button onClick={handleLogoutButton}>logout</button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <div>
            <Togglable>
              <CreateBlog />
            </Togglable>
          </div>

          <Routes>
            <Route path="/" element={<Blogs blogs={sortedBlogs} />} />
            <Route path="/blogs" element={<Blogs blogs={sortedBlogs} />} />
            <Route
              path="/blogs/:id"
              element={<IndivBlog blogs={blogs} user={user} />}
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<IndivUser users={users} />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
