import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>
     <section className="flex  flex-grow flex-col justify-center items-center lg:w-full h-[200px] bg-blue-950 text-white">

      <ul className="flex gap-4 mb-3">
        <li>
          <NavLink
            to={"/about"}
            className="hover:text-black  transition-colors"
          >
            About us
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/faqs"}
            className="hover:text-black transition-colors"
          >
            FAQs
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/contactus"}
            className="hover:text-black transition-colors"
          >
            Contact us
          </NavLink>
        </li>
      </ul>
      <ul className="flex gap-4 mb-3 text-xl">
        <li>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>

        <li>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </li>

        <li>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </li>

      </ul>

      <p className="">
       Copyright &copy; {new Date().getFullYear()}- All rights reserved by RedBridge.
      </p>
    </section>
        </>
    )
}

export default Footer
