import { create } from "@mui/material/styles/createTransitions";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { createNewUser, loading, error, message, persistUser } =
    useContext(AuthContext);
  useEffect(() => {
    if (!persistUser()) {
      return navigate("/admin/register");
    } else {
      return navigate("/chat");
    }
  }, []);
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = newUser;
      const result = await createNewUser(email, password);
      if (result === undefined) {
        return;
      } else {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <div className="container">
      <div className="container">
        <h2 className="text-center">Registrate para empezar a chatear</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
          </div>
          {error && <p className="alert-error">{message}</p>}
          <input
            type="submit"
            value={loading ? "Validando..." : "Registrate"}
          />
        </form>
        <p>
          Tienes cuenta? <Link to="/admin/login">Aqui puedes acceder</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
