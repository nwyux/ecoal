import React from 'react'

export default function Register() {
  return (
<form method='post' action='http://127.0.0.1:8000/api/register'> 
  <label>
    Name :
    <input type="text" name="name" required/>
  </label>
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
