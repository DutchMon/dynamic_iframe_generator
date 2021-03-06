import React from "react"
import { createPopper } from '@popperjs/core'
import Link from 'next/link'

const Dropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    })
    setDropdownPopoverShow(true);
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  }
  return (
    <div className="relative inline-flex justify-center align-middle w-full">
      <button
        className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-green-900 active:bg-green-600 ease-linear transition-all duration-150"
        type="button"
        ref={btnDropdownRef}
        onClick={() => {
          dropdownPopoverShow
            ? closeDropdownPopover()
            : openDropdownPopover()
        }}
      >
        Select Sport
            </button>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-green-800 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
        }
      >
      <Link href="/">
        <a className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
          Home
        </a>
      </Link>
        <Link href="/mlb">
          <a className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
            MLB
          </a>
        </Link>
        <a
          href="#pablo"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white"
          onClick={e => e.preventDefault()}
        >
          Another action
              </a>
        <a
          href="#pablo"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white"
          onClick={e => e.preventDefault()}
        >
          Something else here
              </a>
        <div className="h-0 my-2 border border-solid border-t-0 border-green-800 opacity-25" />
        <a
          href="#pablo"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white"
          onClick={e => e.preventDefault()}
        >
          Seprated link
              </a>
      </div>
    </div>
  )
}

export default Dropdown