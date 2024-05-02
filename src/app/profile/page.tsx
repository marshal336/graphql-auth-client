'use client'
import React from 'react'
import { useUpdateMutation } from '~/gql/_generated'
import { GiLotusFlower } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMdFolderOpen } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { CiCamera } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";


import Image from 'next/image';
import Link from 'next/link';

interface IState {
  username: string;
  email: string;
  password: string;
  profilePeicture: string;
}

const Profile = () => {
  const [state, setState] = React.useState<Partial<IState>>({
    username: '',
    email: '',
    password: '',
    profilePeicture: ''
  })
  const [update, { data, error }] = useUpdateMutation({
    variables: {
      profilePicturer: state.profilePeicture,
      input: {
        email: state.email,
        password: state.password,
        username: state.username,
      }
    }
  })
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setState({ profilePeicture: e.target.files[0].name })
    }
  };

  return (
    <div className='w-full'>
      <header className="h-[74px] w-full fixed left-[74px] top-0 right-0 bg-neutral-700 z-20">
        <div className="max-w-[1600px] flex items-center justify-between px-4 py-5">
          <h2 className='text-2xl'>Profile</h2>
          <div className="flex gap-3 items-center">
            <FaBell className='cursor-pointer' />
            <Image src={'/next.svg'} alt='logo' width={56} height={56} />
          </div>
        </div>
      </header>
      <div className="w-[74px] bg-neutral-700 h-full fixed z-[1] left-0 top-0 bottom-0 flex justify-start py-5 items-center flex-col">
        <div className="flex flex-col items-center justify-between">
          <GiLotusFlower className='text-[33px] mb-[74px]' />

          <div className="flex flex-col gap-12 mb-16 justify-center items-center">
            <Link href={'/'}><BiSolidCategoryAlt /></Link>
            <Link href={'/'}><IoMdFolderOpen /></Link>
            <Link href={'/'} className='relative' >
              <AiOutlineMessage />
              <p className='w-2 h-2 bg-red-700 rounded-full absolute top-0 right-0 z-10'></p>
            </Link>
            <Link href={'/'}><FaRegHeart /></Link>
          </div>

          <Link href={'/'}><IoSettings /></Link>
        </div>
        <CiLogout className='mt-auto text-2xl' />
      </div>
      <div className="relative top-[160px] left-[176px]">
        <div className="flex gap-10 items-center">
          <div className="w-[180px] h-[180px] bg-slate-400 rounded-full border-[8px] border-white relative">
            <CiCamera className='cursor-pointer absolute bottom-0 right-0 bg-slate-400 text-5xl p-2 rounded-full border-[3px] border-white' />
          </div>
          <div className="flex flex-col">
            <h1 className='text-4xl'>Username</h1>
            <p className='text-base'>Your account is ready, you can now apply for advice.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-[96px] relative top-[300px]">
        <div className="flex flex-col w-[217px] h-[416px] bg-slate-100 text-black">
          {[...new Array(3)].map((_, i) => (
            <div className="p-4 font-bold active:bg-neutral-700" key={i}>sds</div>
          ))}
        </div>
        <div className="flex flex-col gap-10">
          <h2>Edit Profile</h2>
          <div className="flex gap-14 h-full">
            <div className="w-[500px] bg-slate-300">sdsds</div>
            <div className="w-[500px] bg-slate-300">sd</div>
          </div>
        </div>
      </div>
    </div>
  )
}
// 
export default Profile