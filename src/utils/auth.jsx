// auth.js
export const isAuthenticated = () => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    return email && password;
  };
  