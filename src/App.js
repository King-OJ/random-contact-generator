import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function App() {

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [value, setValue] = useState('random person')
  const [title, setTitle] = useState('name')

  const getProfile = async() => {
    setLoading(true)
    const request = await fetch(url)
    const data = await request.json()
    const person = data.results[0]

    const { email, phone } = person
    const { dob: { age } } = person
    const { password } = person.login
    const { first, last } = person.name
    const {street: { name, number} } = person.location
    const { large: image } = person.picture

    const newPerson = {
      email,
      phone,
      password,
      image,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }

    setProfile(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }

  useEffect(() => {
    getProfile()
  }, [])

  function handleChange(e){
    if(e.target.classList.contains('icon')){
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(profile[newValue])
    }
  }

  return (
    <main>

      <div className="block bcg-black">
      </div>

      <div className="block">
        <div className="container">
          <img src={(profile && profile.image)|| defaultImage} alt="user" className="user-img"/>
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label = "name" onMouseOver={handleChange}><FaUser /></button>
            <button className="icon" data-label = "email" onMouseOver={handleChange}><FaEnvelopeOpen /></button>
            <button className="icon" data-label = "age" onMouseOver={handleChange}><FaCalendarTimes /></button>
            <button className="icon" data-label = "street" onMouseOver={handleChange}><FaMap /></button>
            <button className="icon" data-label = "phone" onMouseOver={handleChange}><FaPhone /></button>
            <button className="icon" data-label = "password" onMouseOver={handleChange}><FaLock /></button>
          </div>

          <button className='btn' type='button' onClick={getProfile}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>

    </main>
  )
}

export default App
