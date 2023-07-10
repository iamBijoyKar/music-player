import { MdMenu } from "react-icons/md"
import { AiFillHome } from "react-icons/ai"
import { AiOutlineHome } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { BiSolidSearch } from "react-icons/bi"
import { LuLibrary } from "react-icons/lu"
import { AiFillSetting } from "react-icons/ai"
import { AiOutlineSetting } from "react-icons/ai"
import { Tooltip } from "@material-tailwind/react"

import momoLogo from "../assets/peach.png"

import { useState } from "react"

type Props = {
  page: string
  changePage: (page: string) => void
}

export default function SideBar(prop: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const { page, changePage } = prop

  return (
    <>
      <div className={` ${!isMenuOpen ? "w-fit" : "w-[400px]"}`}>
        <div className=' backdrop-blur-[6px]  w-full h-full bg-[#ffffff33] border shadow rounded-r-lg py-4 flex flex-col justify-between'>
          <div className=''>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='flex flex-row justify-between px-4 py-3 hover:bg-[#ffffff52]'>
              <MdMenu className='text-3xl' />
              {isMenuOpen && (
                <Tooltip placement='top' content='Momo Player'>
                  <img src={momoLogo} className='w-[35px] cursor-pointer' />
                </Tooltip>
              )}
            </div>
            <div className='flex flex-col mt-3 '>
              <div
                onClick={() => changePage("home")}
                className={`flex flex-row items-center gap-4 py-3 hover:bg-[#ffffff52]  ${
                  page === "home" ? "border-l-[4px] pl-3 " : "pl-4"
                }`}>
                {page === "home" ? (
                  <AiFillHome className='text-3xl' />
                ) : (
                  <AiOutlineHome className='text-3xl' />
                )}
                {isMenuOpen && <span className='text-xl font-bold'>Home</span>}
              </div>
              <div
                onClick={() => changePage("search")}
                className={`flex flex-row items-center gap-4  py-3 hover:bg-[#ffffff52] ${
                  page === "search" ? "border-l-[4px] pl-3" : "pl-4"
                }`}>
                {page === "search" ? (
                  <BiSolidSearch className='text-3xl' />
                ) : (
                  <BiSearch className='text-3xl' />
                )}
                {isMenuOpen && (
                  <span className='text-xl font-bold'>Search</span>
                )}
              </div>
              <div
                onClick={() => changePage("library")}
                className={`flex flex-row items-center gap-4  py-3 hover:bg-[#ffffff52] ${
                  page === "library" ? "border-l-[4px] pl-3" : "pl-4"
                }`}>
                {page === "library" ? (
                  <LuLibrary className='text-3xl font-bold' />
                ) : (
                  <LuLibrary className='text-3xl' />
                )}
                {isMenuOpen && (
                  <span className='text-xl font-bold'>Library</span>
                )}
              </div>
            </div>
          </div>

          <div
            onClick={() => changePage("settings")}
            className={`flex flex-row items-center gap-4 py-3 mb-[100px] hover:bg-[#ffffff52] ${
              page === "settings" ? "border-l-[4px]  pl-3" : "pl-4"
            }`}>
            {page === "settings" ? (
              <AiFillSetting className='text-3xl font-bold' />
            ) : (
              <AiOutlineSetting className='text-3xl' />
            )}
            {isMenuOpen && <span className='text-xl font-bold'>Settings</span>}
          </div>
        </div>
      </div>
    </>
  )
}
