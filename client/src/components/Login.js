import React from 'react'

export default function Login() {
  return (
<form method='post' action='http://127.0.0.1:8000/api/login'> 
  <label>
    Email :
    <input type="email" name="email" required/>
  </label>
  <label>
    Password :
    <input type="text" name="password" required/>
  </label>
  <input type="submit" value="Submit" />
</form>
  )
}
