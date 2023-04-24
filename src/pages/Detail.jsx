import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getNote } from '../features/note/noteSlice'
import Markdown from '../components/Markdown'
import Home from './Home'

const Detail = () => {
    const dispatch = useDispatch()

    const { id } = useParams()
    // console.log(id)

    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(`https://note-api-zeta.vercel.app/api/note?id=${id}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    console.log(data)

  return (
    <Home>
      <div className='container mx-auto p-5 lg:p-0'>
        <Markdown title={data && data.title} markdown={data && data.description} />
      </div>
    </Home>
  )
}

export default Detail