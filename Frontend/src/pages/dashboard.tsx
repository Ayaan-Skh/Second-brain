
import { Button } from '../components/Button'
import { Addicon } from '../components/AddIcon'
import { Shareicon } from '../components/ShareIcon'
import { Card } from '../components/Card'
// import { Header } from './components/Header'
import { CreateContent } from '../components/CreateContentModel'
import { useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const {contents,refresh} = useContent()
      useEffect(()=>{
      refresh()
      },[modalOpen])

  return (
    <>
      <Sidebar />
      <div className='ml-72'>

        <CreateContent open={modalOpen} onClose={() => {
          setModalOpen(false)
        }} />
        <div className='bg-yellow-100 h-screen'>
          {/* <Header /> */}
          <div className='flex justify-end'>
            <Button onClick={() => { setModalOpen(true) }} variant='secondary' text='Add content' startIcon={<Addicon />}></Button>
            <Button variant='primary' text='Share Brain ' startIcon={<Shareicon />} ></Button>
          </div>
          <div className='flex'>

            {contents.map(({ title, type, link }) => <Card title={title} link={link} type={type} />)}

          </div>
        </div>
      </div>
    </>
  )
}


