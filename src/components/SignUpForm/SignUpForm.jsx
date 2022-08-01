import React, { Component } from "react";
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {



  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };



  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // If an error occurred
      this.setState({ error: "Sign Up Failed - Try again" });
    }
  };


  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div >
        <div >
          <form autoComplete="off" onSubmit={this.handleSubmit} className="flex flex-col w-300px ">
            
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required
               placeholder="Name"
              className="my-1.5 border-4 rounded-xl py-2 px-4 border-black bg-[#f7f7f2] focus:border-black focus:ring-0"
            />
         
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required
              placeholder="Email"
              className="my-1.5 border-4 rounded-xl py-2 px-4 border-black bg-[#f7f7f2] focus:border-black focus:ring-0"
            />
            
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required
              placeholder="Password"
              className="my-1.5 border-4 rounded-xl py-2 px-4 border-black bg-[#f7f7f2] focus:border-black focus:ring-0"
            />
            
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required
              placeholder="Password Confirm"
              className="my-1.5 border-4 rounded-xl py-2 px-4 border-black bg-[#f7f7f2] focus:border-black focus:ring-0"
            />
            <button type="submit" disabled={disable}
            className="my-1.5 bg-[#1f1f1f] text-white font-medium py-2 px-4 rounded hover:ring hover:ring-orange-400"
            >SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}