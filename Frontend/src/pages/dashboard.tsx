
import { Button } from '../components/Button'
import { Addicon } from '../components/AddIcon'
import { Shareicon } from '../components/ShareIcon'
import { Card } from '../components/Card'
// import { Header } from './components/Header'
import { CreateContent } from '../components/CreateContentModel'
import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'

export function Dashboard() {
  const [modalOpen,setModalOpen]=useState(false)
  return (
    <>
    <Sidebar/>
    <div className='ml-72'>

        <CreateContent open={modalOpen} onClose={()=>{
          setModalOpen(false)
        }}/>
      <div className='bg-yellow-100 h-screen'>
          {/* <Header /> */}
        <div className='flex justify-end'>
          <Button onClick={()=>{setModalOpen(true)}} variant='secondary' text='Add content' startIcon={<Addicon />}></Button>
          <Button variant='primary' text='Share Brain ' startIcon={<Shareicon />} ></Button>
        </div>
        <div className='flex'>
          <Card title='Rust info' link='https://youtu.be/l3uqVC-aNEM?si=3uLxmpEtWRMfBkx_' type='youtube' />
          <Card title='Solana Mining info' link='https://youtu.be/w9QTMZhkFMM?si=4DvnQlQASq_a2r2F' type='twitter' />
        </div>
        </div>
      </div>
    </>
  )
}


