import React from 'react'
import { NavLink } from "react-router-dom"

export default function Footer() {
  return (
    <div className='footer z-90 static bottom-0 w-full bg-gray-800 text-white text-center p-4' id="footerID">
        <NavLink to="/">About</NavLink>
        <NavLink to="/">Contact</NavLink>
        <NavLink to="/">Q&A</NavLink>
        <NavLink to="/">Terms & Condition</NavLink>
        <NavLink to="/">@Copyright Infiteam 2024</NavLink>
    </div>
  )
}
