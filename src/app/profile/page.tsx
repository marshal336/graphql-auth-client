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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

const Profile = () => {
  const logoRef = React.useRef<HTMLInputElement>(null)
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [profilePicturer, setProfilePeicture] = React.useState('')

  const [update, { data, error }] = useUpdateMutation({
    variables: {
      profilePicturer,
      input: {
        email,
        password,
        username,
      }
    }
  })
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePeicture(e.target.files[0].name)
    }
  };
  console.log(data);

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
            <CiCamera onClick={() => logoRef.current?.click()} className='cursor-pointer absolute bottom-0 right-0 bg-slate-400 text-5xl p-2 rounded-full border-[3px] border-white' />
          </div>
          <input type="file" ref={logoRef} onChange={handleChangeFile} hidden />
          <div className="flex flex-col">
            <h1 className='text-4xl'>Username</h1>
            <p className='text-base'>Your account is ready, you can now apply for advice.</p>
          </div>
        </div>
      </div>
      <Tabs className="flex justify-center gap-[96px] relative top-[300px]">
        <div className="flex flex-col w-[217px] h-[416px]">
          <TabsList defaultValue={'edit'}>
            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            <TabsTrigger disabled value="notifications">Notifications</TabsTrigger>
            <TabsTrigger disabled value="choose">Choose Plan</TabsTrigger>
            <TabsTrigger disabled value="password">Password & Security</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='edit' className='flex flex-col gap-3'>
          <h2 className='text-3xl'>Edit Profile</h2>
          <div className="flex flex-col gap-10 h-[543px] w-[543px]">
            <div className="flex flex-col gap-5 h-full">
              <Input placeholder='username' type='text' onChange={(e) => setUsername(e.target.value)} />
              <Input placeholder='email' type='email' onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} />
              <Button onClick={() => update()} className='max-w-[100px]' type='submit'>Save</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
// 
export default Profile