import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = (props) => {
  const { data } = props
  return (
    <div className='group relative w-full'>
      <Link to={`movies/${data.imdbID}`} className='block'>
        <div className='relative overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl'>
          {/* Image Container with Overlay */}
          <div className='relative aspect-[2/3] overflow-hidden'>
            <img 
              src={data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
              alt={data.Title} 
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster'
              }}
            />
            {/* Gradient Overlay on Hover */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            
            {/* Year Badge */}
            <div className='absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold ring-2 ring-white/20'>
              {data.Year}
            </div>

            {/* Hover Info Overlay */}
            <div className='absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
              <div className='text-white'>
                <p className='text-lg font-bold mb-1 line-clamp-2 drop-shadow-lg'>{data.Title}</p>
                <div className='flex items-center gap-2 text-sm text-gray-300'>
                  <i className="ri-movie-2-line"></i>
                  <span>{data.Type === 'movie' ? 'Movie' : 'Series'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Bottom - Always Visible */}
          <div className='p-4 bg-gradient-to-b from-gray-800 to-gray-900'>
            <div className='min-h-[60px] flex flex-col justify-center'>
              <p className='text-white font-semibold text-base line-clamp-2 group-hover:text-blue-400 transition-colors duration-300'>
                {data.Title}
              </p>
              <div className='flex items-center justify-between mt-2'>
                <span className='text-gray-400 text-sm'>{data.Year}</span>
                <span className='inline-flex items-center gap-1 text-yellow-400 text-sm'>
                  <i className="ri-star-fill text-xs"></i>
                  <span className='text-gray-300'>View Details</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard