import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from "../MovieCard/MovieCard"

const Movielisting = () => {

  const movies = useSelector((state) => state.movies.movies);
  const shows = useSelector((state) => state.movies.shows);

  return (
    <div className="w-full space-y-12 py-8 px-4 sm:px-6 lg:px-8">
      {/* Movies Section */}
      <section className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-700/50 shadow-lg">
              <div className="flex items-center gap-3">
                <i className="ri-movie-2-fill text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"></i>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Movies
                </h2>
                <span className="hidden sm:inline-flex items-center px-3 py-1 bg-blue-600/30 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30">
                  {movies?.length || 0} results
                </span>
              </div>
            </div>
          </div>
        </div>

        {movies && movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
            {movies.map((movie, key) => (
              <MovieCard key={key} data={movie} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-800/30 rounded-2xl border border-gray-700/50">
            <div className="p-6 bg-gray-800/50 rounded-full mb-4">
              <i className="ri-movie-2-line text-6xl text-gray-600"></i>
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2">No movies found</p>
            <p className="text-gray-500 text-sm text-center max-w-md">
              Try searching for movies using the search bar above
            </p>
          </div>
        )}
      </section>

      {/* Shows Section */}
      <section className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-700/50 shadow-lg">
              <div className="flex items-center gap-3">
                <i className="ri-tv-line text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"></i>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  TV Shows
                </h2>
                <span className="hidden sm:inline-flex items-center px-3 py-1 bg-purple-600/30 rounded-full text-purple-300 text-sm font-medium border border-purple-500/30">
                  {shows?.length || 0} results
                </span>
              </div>
            </div>
          </div>
        </div>

        {shows && shows.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
            {shows.map((show, key) => (
              <MovieCard key={key} data={show} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-800/30 rounded-2xl border border-gray-700/50">
            <div className="p-6 bg-gray-800/50 rounded-full mb-4">
              <i className="ri-tv-line text-6xl text-gray-600"></i>
            </div>
            <p className="text-gray-400 text-lg font-medium mb-2">No shows found</p>
            <p className="text-gray-500 text-sm text-center max-w-md">
              Try searching for TV shows using the search bar above
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Movielisting