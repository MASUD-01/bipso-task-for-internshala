import React from 'react';

const ShowComponent = ({ data, setModalShowData }) => {
    const showModalDetails = (id) => {
        const fetchData = async () => {
            try {

                const response = await fetch(`https://movie-task.vercel.app/api/movie?movieId=${id}`)
                const data = await response.json();
                if (data.data) {
                    setModalShowData(data.data)

                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }
    return (
        <label htmlFor="my-modal-6" onClick={() => showModalDetails(data.id)}>
            <div className="card max-w-96 bg-base-100 shadow-xl mx-auto cursor-pointer">
                <figure><img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title"> Movies name: {data.original_title.slice(0, 15)}</h2>
                    <h2 className="card-title"> Movies popularity: {data.popularity}</h2>
                </div>
            </div>
        </label>
    );
};

export default ShowComponent;