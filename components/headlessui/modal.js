import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { Fragment, useState, useEffect } from 'react'
import  {storage} from "../../lib/firebase"
import {ref, uploadBytes,getDownloadURL } from "firebase/storage"
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

export default function MyModal({user,updateInfo}) {
  let [isOpen, setIsOpen] = useState(false);
  const [name,setName] = useState(user.name);
  const [bio,setBio] = useState(user.bio);
  const [location,setLocation] = useState(user.location);
  const [profilPicture,setProfilPicture] = useState(user.profilPicture)
  const [banner,setBanner] = useState('')

  const [imageUpload,setImageUpload] = useState(null);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const uploadImage = async () => {
    if (imageUpload == null){
      let _id = user._id
      const data = {name:name, bio:bio, location:location, profilPicture:profilPicture }
      const req = await axios.put(`/api/user/${_id}`,data)
  
      if(req.status === 200){
          updateInfo(data)
          setName(data.name)
          setBio(data.bio)
          setLocation(data.location)
          closeModal()
      }
    }else{
      const imageRef = ref(storage,`${user._id}/profil_picture`);
      uploadBytes(imageRef,imageUpload).then((response)=>{
        getDownloadURL(ref(storage, `${user._id}/profil_picture`))
          .then(async (url) => {
            setProfilPicture(url)
              let _id = user._id
              const data = {name:name, bio:bio, location:location, profilPicture:url }
              const req = await axios.put(`/api/user/${_id}`,data)
          
              if(req.status === 200){
                  updateInfo(data)
                  setName(data.name)
                  setBio(data.bio)
                  setLocation(data.location)
                  closeModal()
              }
          })
      })
    }
  }

  const handleChangeProfilPicture = (e) => {
    setProfilPicture(URL.createObjectURL(e.target.files[0]))
    setImageUpload(e.target.files[0])

  }

  const submitForm = async () => {


    uploadImage()
  }

  useEffect(()=>{
  },[name])


  return (
    <>
        <div onClick={openModal} className='flex items-center justify-center bg-white text-black font-bold w-20 h-9 rounded-3xl cursor-pointer hover:bg-slate-100'>Edit</div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-600 max-w-md transform overflow-hidden rounded-2xl bg-twitter-dark text-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className='flex justify-between mb-4'>
                        <div className='flex items-center gap-4'>
                            <div className='w-6 cursor-pointer' onClick={closeModal}>
                                <svg viewBox='0 0 24 24' fill='white' aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>
                            </div>
                            <h2 className='font-bold text-xl'>Edit profile</h2>
                        </div>
                        <div>
                            <div onClick={submitForm} className='flex items-center justify-center bg-white text-black font-bold w-20 h-9 rounded-3xl cursor-pointer hover:bg-slate-100'>Save</div>
                        </div>
                    </div>
                    <div className='h-64'>
                        <div className='w-full h-48 bg-slate-400'>
                          <input id='profil_picture_input' className='hidden'  type="file" title='' onChange={handleChangeProfilPicture} />
                        </div>
                        <div className='absolute top-48 left-8'>
                          <div className="relative">
                            {profilPicture ? 
                            <img className='inline object-cover w-32 h-32 ml-6 rounded-full brightness-50' src={profilPicture}/>
                            : 
                            <div className="inline object-cover w-32 h-32 ml-6 rounded-full brightness-50">
                                <Image src="/user.png" alt="me" width='128' height='128' className='rounded-full' />
                            </div>}
                            <label htmlFor="profil_picture_input">
                              <div className='absolute top-2/4 left-2/4 cursor-pointer hover:text-slate-200 h-8 w-8'>
                                <FontAwesomeIcon icon={faCamera} size='xl'/>
                              </div>
                            </label>
                          </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label for="name" className="block mb-2 text-sm font-medium dark:text-gray-300">Name</label>
                        <input type="name" id="name" className="bg-twitter-dark border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" defaultValue={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="mb-6">
                        <label for="bio" className="block mb-2 text-sm font-medium dark:text-gray-300">Bio</label>
                        <input type="bio" id="bio" className="bg-twitter-dark border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" defaultValue={bio} onChange={e => setBio(e.target.value)}/>
                    </div>
                    <div className="mb-6">
                        <label for="location" className="block mb-2 text-sm font-medium dark:text-gray-300">Location</label>
                        <input type="location" id="location" className="bg-twitter-dark border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" defaultValue={location} onChange={e => setLocation(e.target.value)}/>
                    </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
