import React, { useState } from 'react';

const FilterData = ({ setDate, showData, setPopularityFilter, setkeyword }) => {
    const [name, setName] = useState('');
    const filter = (e) => {
        const keyword = e.target.value;
        setName(keyword)
        setkeyword(keyword)
        setPopularityFilter('')
    };

    return (
        <div className='bg-red-400 grid grid-cols-1 text-center p-4 gap-y-2 sm:grid-cols-2 md:grid-cols-3'>
            <select className="select select-bordered w-full mx-auto max-w-xs" onChange={(e) => setDate(e.target.value) || setkeyword('') || setPopularityFilter('')}>
                <option disabled selected>Search for release Date</option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
            </select>
            <select className="select select-bordered w-full max-w-xs mx-auto" onChange={(e) => setPopularityFilter(e.target.value) || setkeyword('')}>
                <option disabled selected>Search by popularity</option>
                {
                    showData.map(data =>
                        <option key={data.id}>{data.popularity}</option>
                    )
                }


            </select>
            <div className='sm:col-span-2 md:col-span-1'>
                <input
                    type="search"
                    value={name}
                    onChange={filter}
                    className="input max-w-xs w-full"
                    placeholder="filter by movie name"
                />
            </div>
        </div>
    );
};

export default FilterData;