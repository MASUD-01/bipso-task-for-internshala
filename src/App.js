import { useEffect, useState } from 'react';
import './App.css';
import FilterData from './Component/FilterData';
import ShowComponent from './Component/ShowComponent';

function App() {
  const [showData, setShowData] = useState([])
  const [loading, isLoading] = useState(false)
  const [error, isError] = useState('')
  const [showModalData, setModalShowData] = useState([]);
  const [date, setDate] = useState('')
  const [keyword, setkeyword] = useState('');
  const [popularityFilter, setPopularityFilter] = useState('')
  console.log(popularityFilter)

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoading(true)
        const response = await fetch('https://movie-task.vercel.app/api/popular?page=1')
        const data = await response.json();
        if (data.data.results) {
          setShowData(data.data.results)
          isLoading(false)
        }
      } catch (error) {
        isError('There are some error')
        console.log(error)
      }
    }
    fetchData()
  }, [])

  //filter data by search
  const filterData = showData.filter(data => {
    if (!keyword && !popularityFilter) {
      return data.release_date.toString().includes(date)

    } else if (keyword && !popularityFilter) {

      return data.title.toLowerCase().toString().includes(keyword)
    }

    else if (!keyword && popularityFilter) {
      return data.popularity.toString().includes(popularityFilter)
    } else {
      return showData
    }
  })
  console.log(filterData)
  return (
    <div className="">
      <header className=' bg-orange-400 mb-5'>
        <div className='h-20 px-20 flex items-center justify-center'>
          <h1 className='text-3xl'>Bip.so</h1>
        </div>

      </header>
      <FilterData setDate={setDate} showData={showData} setPopularityFilter={setPopularityFilter} setkeyword={setkeyword}></FilterData>

      {loading && <p className='text-center text-2xl'>Loading....</p>}
      {error && <p className='text-center text-2xl'>{error}</p>}
      {filterData.length === 0 && <p className='text-center text-2xl'>This year hasn't release any movies</p>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 p-6 sm:m-6 sm:p-0'>
        {
          filterData.map((data) => <ShowComponent key={data.id} data={data} setModalShowData={setModalShowData}></ShowComponent>)
        }
      </div>



      {/* modal data to show indivisul movie details */}
      {showModalData &&
        <>
          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          <div className="modal sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">welcome to know Details for
                <span className='text-red-400'> {showModalData.original_title
                }</span> </h3>
              <p className="py-4"> original_language: {showModalData.original_language}</p>
              <p className="py-4">status: {showModalData.status}</p>
              <p className="py-4">popularity: {showModalData.popularity}</p>
              <p className="py-4">vote_average: {showModalData.vote_average}</p>
              <p className="py-4">{showModalData.overview}</p>
              <div className="modal-action">
                <label htmlFor="my-modal-6" className="btn">Close!</label>
              </div>
            </div>
          </div>
        </>

      }

    </div>
  );
}

export default App;
