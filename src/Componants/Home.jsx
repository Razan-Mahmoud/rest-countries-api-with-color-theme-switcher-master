import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery'



export default function Home() {

    let [countryList, setCountryList] = useState([])
    let [selectVal, setSelectVal] = useState("")


    async function getAllCountries() {
        let { data } = await axios.get("https://restcountries.com/v3.1/all")

        setCountryList(data)
        $(".loading").fadeOut(500)
    }

    useEffect(() => {
        getAllCountries()
    }, [])

    let [searchVal, setSearchval] = useState("")


    function changeMode() {
        if ($(".mainSection").hasClass("lightBg")
            && $(".item").hasClass("lightElementsBg")
            && $(".elements").hasClass("lightElementsBg")) {
            $(".mainSection").removeClass("lightBg").addClass("darkBg")
            $(".item").removeClass("lightElementsBg").addClass("darkElementBg")
            $(".elements").removeClass("lightElementsBg").addClass("darkElementBg")

        } else if ($(".mainSection").hasClass("darkBg")
            && $(".item").hasClass("darkElementBg")
            && $(".elements").hasClass("darkElementBg")) {
            $(".mainSection").removeClass("darkBg").addClass("lightBg")
            $(".item").removeClass("darkElementBg").addClass("lightElementsBg")
            $(".elements").removeClass("darkElementBg").addClass("lightElementsBg")

        }
    }
    return (
        <>
            <div className='position-fixed top-0 start-0 end-0 bottom-0 loading'>
                <i className='fa-solid fa-spinner fa-spin fa-4x'></i>
            </div>

            <div className='w-100 px-4 py-2 divBg elements lightElementsBg'>
                <div className='d-flex justify-content-between title'>
                    <Link to={"/rest-countries-api-with-color-theme-switcher-master/home"} className='elements lightElementsBg text-decoration-none'><h1 >Where in the world?</h1></Link>
                    <div onClick={changeMode} className='px-2 rounded-2 bg-transparent d-flex align-items-center darkModeBtn justify-content-center'><i className="fa-regular fa-moon "></i>
                        <h6 className='ms-1 '>Dark Mode</h6></div>
                </div>
            </div>



            <div className="container-fluid pt-4 mb-2 px-4 lightBg mainSection" >
                <div className="row g-4 ">
                    <div className='d-flex justify-content-between my-4'>
                        <input onChange={(e) => setSearchval(e.target.value)} className='form-control w-50 elements lightElementsBg' placeholder='Search for a country' />
                        <select onKeyUp={(e) => setSelectVal(e.target.value)} className='form-select w-25 elements lightElementsBg'>
                            <option label="Filter by Region">Filter by Region</option>
                            <option value="africa">Africa</option>
                            <option value="americas">Americas</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="oceania">Oceania</option>
                        </select>
                    </div>

                    {countryList?.filter((country) => country.name.common.toLowerCase().includes(searchVal)).filter((country) => country.region.toLowerCase().includes(selectVal)).map((country, i) => {
                        return <div key={i} className="col-md-3 mt-5 land">
                            <Link to={"/rest-countries-api-with-color-theme-switcher-master/details/" + country.cca3} className='elements text-decoration-none'>
                                <div className='item lightElementsBg'>
                                    <img src={country.flags.png} alt="" className='w-100 imgs' />
                                    <div className='ms-3 w-100'>
                                        <h4 className='my-2'>{country.name.common}</h4>

                                        <p ><span className='fw-bold'>Population:</span> {country.population}</p>
                                        <p ><span className='fw-bold'>Region:</span> {country.region}</p>
                                        <p ><span className='fw-bold'>Capital:</span> {country.capital}</p>

                                    </div>
                                </div>
                            </Link>
                        </div>

                    })}

                </div>
            </div>

        </>
    )
}
