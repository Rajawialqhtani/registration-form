import React, { useState } from 'react';
import './RegistrationForm.css'; // Ensure this file exists for styling

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For showing success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 8) {
      setPasswordStrength('Weak (at least 8 characters required)');
    } else if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
      setPasswordStrength('Medium (Add special characters for stronger security)');
    } else if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[\W_]/.test(password)) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = 'Full name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // This is the handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (validateForm()) {
      setSuccessMessage('Registration Successful!');
      setFormData({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
      setPasswordStrength('');
    } else {
      setSuccessMessage(''); // Clear success message if validation fails
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && <small className="error">{errors.fullname}</small>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <small className={`password-strength ${passwordStrength.toLowerCase()}`}>
            {passwordStrength}
          </small>
          {errors.password && <small className="error">{errors.password}</small>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <small className="error">{errors.confirmPassword}</small>
          )}
        </div>

        <button type="submit">Register</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default RegistrationForm;