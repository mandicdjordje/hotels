import { useState } from 'react';
import { IoEye } from 'react-icons/io5';
import './AuthCss.css';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};
export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    value: '',
    isTouched: false,
  });
  const [password2, setPassword2] = useState({
    value: '',
    isTouched: false,
  });
  const [passwordShow, setPasswordShow] = useState({
    password,
    showPassword: false,
  });

  const [passwordShow2, setPasswordShow2] = useState({
    password,
    showPassword: false,
  });

  const getIsFormValid = () => {
    return (
      firstName &&
      validateEmail(email) &&
      password.value.length >= 8 &&
      password.value === password2.value
    );
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword({
      value: '',
      isTouched: false,
    });
    setPassword2({
      value: '',
      isTouched: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName);
    alert('Account created!');
    clearForm();
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '500px' }}>
        <fieldset>
          <div>
            <h2>Sign Up</h2>
            <div className="input-icon-container">
              <label>
                First name <sup>*</sup>
              </label>
              <input
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First name"
              />
            </div>
            <div className="input-icon-container">
              <label>Last name</label>
              <input
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last name"
              />
            </div>
            <div className="input-icon-container">
              <label>
                Email address <sup>*</sup>
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email address"
              />
            </div>
            <div className="input-icon-container">
              <label>
                Password <sup>*</sup>
              </label>
              <input
                style={{
                  display: 'inline-block',
                }}
                value={password.value}
                type="password"
                onChange={(e) => {
                  setPassword({ ...password, value: e.target.value });
                }}
                onBlur={() => {
                  setPassword({ ...password, isTouched: true });
                }}
                placeholder="Password"
              />
              <IoEye className="icon-eye" />
              {password.isTouched && password.value.length < 8 ? (
                <PasswordErrorMessage />
              ) : null}
            </div>
            <div className="input-icon-container">
              <label>
                Repeat Password <sup>*</sup>
              </label>
              <input
                value={password2.value}
                type="password"
                onChange={(e) => {
                  setPassword2({ ...password2, value: e.target.value });
                }}
                onBlur={() => {
                  setPassword2({ ...password2, isTouched: true });
                }}
                placeholder="Password"
              />

              {password2.isTouched && password2.value.length < 8 ? (
                <PasswordErrorMessage />
              ) : null}
            </div>

            <button
              type="submit"
              style={{ cursor: 'pointer' }}
              disabled={!getIsFormValid()}
            >
              Create account
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
