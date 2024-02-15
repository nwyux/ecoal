import React from 'react'
import { NavLink } from "react-router-dom"
import { Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <div className='footer z-90 static bottom-0 gap-2 text-lg w-full bg-marron flex flex-col sm:flex-row justify-center sm:justify-around sm:items-center text-white text-center py-4'>
        <NavLink to="/">About</NavLink>
        <hr className="sm:hidden w-screen bg-noir block h-0.5 opacity-40" />
        <NavLink to="/">Contact</NavLink>
        <hr className="sm:hidden w-screen bg-noir block h-0.5 opacity-40" />
        <NavLink to="/questions">Q&A</NavLink>
        <hr className="sm:hidden w-screen bg-noir block h-0.5 opacity-40" />
        <NavLink to="/">Terms & Condition</NavLink>
        <hr className="sm:hidden w-screen bg-noir block h-0.5 opacity-40" />
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex gap-4 justify-center">
          <Facebook size={36} />
          <Twitter size={36} />
          <Instagram size={36} />
          </div>
        <NavLink className="text-sm" to="/">@Copyright Infiteam 2024</NavLink>
        </div>
    </div>
  )
}