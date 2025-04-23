import React from 'react'
import { Link } from 'react-router-dom'




const MovieCard = (props) => {
  const { data } = props
  console.log("detail", data)
  return (
    <div >


      <div className='inner'>
        <Link to={`movies/${data.imdbID}`}>
          <div className='card-top'>
            <img src={data.Poster} alt={data.Title} className='rounded-lg' />
          </div>
          <div className='card-bottom'>
            <div className='card-info'>
              <p className='text-sm'>{data.Title}</p>
              <p>{data.Year}</p>

            </div>
          </div>
        </Link>
      </div>

    </div>
  )
}

export default MovieCard