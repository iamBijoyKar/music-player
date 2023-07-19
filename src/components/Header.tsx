import momoLogo from "../assets/peach.png"
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react"
import defaultProfilePic from "../assets/profile.png"
import { useAppSelector } from "../hooks/hooks"

export default function Header() {
  const page = useAppSelector((state) => state.currentPage.currentPage)
  return (
    <>
      <header className='flex flex-col  '>
        {/* <div className='flex flex-row gap-4 items-center mb-6'>
          <img src={momoLogo} className='w-[40px]' alt="" />
          <h1 className='text-white font-bold text-xl'>もも (Momo) Player</h1>
        </div> */}
        <div className='flex flex-row justify-between '>
          <h1 className='text-2xl'>
            My Music / <span className=' capitalize'>{page}</span>
          </h1>
          <div className=''>
            <Menu>
              <MenuHandler>
                <Avatar
                  src={defaultProfilePic}
                  variant='circular'
                  className='cursor-pointer'
                />
              </MenuHandler>
              <MenuList>
                <MenuItem className='flex items-center gap-2'>
                  <Typography variant='small' className='font-normal'>
                    My Profile
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div className=''></div>
      </header>
    </>
  )
}
