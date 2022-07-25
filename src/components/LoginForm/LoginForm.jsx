// LoginForm.jsx

import { useState } from "react";
import * as usersService from "../../utilities/users-service";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div>
      <div className="form-container" onSubmit={handleSubmit}>
        <form autoComplete="off">
          {/* <label>Email</label> */}
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="my-1.5 border-4 rounded-xl py-2 px-4 border-black bg-[#f7f7f2] focus:border-black focus:ring-0"
          />
          <br />
          {/* <label>Password</label> */}
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="my-1.5 border-4 rounded-xl py-2 px-4 border-black bg-[#f7f7f2] focus:border-black focus:ring-0"
          />
          <br />
          <button
            type="submit"
            className="my-1.5 bg-[#1f1f1f] text-white font-medium py-2 px-4 rounded hover:ring hover:ring-orange-400"
          >
            Log In
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
