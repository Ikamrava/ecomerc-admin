import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import Layout from '../components/Layout'
import { Avatar } from '@nextui-org/react';


export default function Home() {
  const { data: session } = useSession()

  return ( 

    <Layout>
      <div className='flex w-full items-center gap-2'>
      <Avatar 
          squared 
          src={session?.user.image} />
        <div className=' capitalize'>Hello {session?.user.name}</div>
       
        {/* <img src={session?.user.image}/> */}
      </div>
      
    </Layout>
    
  )

}
