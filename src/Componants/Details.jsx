import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import $ from 'jquery'

export default function Details() {

  let { country } = useParams()
  let navigate = useNavigate()


  let [countryDetail, setCountryDetails] = useState()

  useEffect(() => {
    getCountryData()

  }, [])

  async function getCountryData() {
    let { data } = await axios.get(`https://restcountries.com/v3.1/alpha/${country}`)
    setCountryDetails(data[0])
    $(".loading").fadeOut(500)
  }


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
      <div className='position-fixed top-0 end-0 start-0 bottom-0 loading '>
        <i className='fa-solid fa-spinner fa-spin fa-4x'></i>
      </div>


      <div className='w-100 px-4 py-2 divBg elements lightElementsBg'>
        <div className='d-flex justify-content-between title'>
          <Link to={"rest-countries-api-with-color-theme-switcher-master/home"} className='elements lightElementsBg text-decoration-none'><h1 >Where in the world?</h1></Link>
          <div onClick={changeMode} className='px-2 rounded-2 bg-transparent d-flex align-items-center darkModeBtn justify-content-center border border-2'><i className="fa-regular fa-moon "></i>
            <h6 className='ms-1 '>Dark Mode</h6></div>
        </div>
      </div>


      {countryDetail ? <div className="container-fluid lightBg mainSection">
        <button onClick={() => navigate(-1)} className='btn bg-transparent  px-4 mt-4 ms-4 elements lightElementsBg border border-1'>
          <i className="fa-solid fa-arrow-left-long"></i> Back
        </button>
        <div className="row align-items-top my-4 ms-2 g-4">

          <div className="col-md-5 pe-4">

            <img src={countryDetail.flags.png} alt="" className='w-100 ' />
          </div>
          <div className="col-md-7 item lightElementsBg">
            <h2>{countryDetail.name.common}</h2>
            <div className='d-flex item2 '>
              <div className='me-5'>
                <p><span className='fw-bold'>Native Name: </span>{countryDetail.name.common}</p>

                <p><span className='fw-bold'>Population: </span><span>{countryDetail.population}</span></p>
                <p><span className='fw-bold'>Region: </span><span>{countryDetail.region}</span></p>
                <p><span className='fw-bold'>Sub Region: </span><span></span>{countryDetail.subregion}</p>
                <p><span className='fw-bold'>Capital: </span><span>{countryDetail.capital?.join(", ")}</span></p>
              </div>

              <div >
                <p><span className='fw-bold'>Top Level Domain: </span><span>{countryDetail.tld}</span></p>
                <p><span className='fw-bold'>Currencies: </span>{Object.values(countryDetail.currencies).map((e, i) => {
                  return <span key={i}>{e.name}</span>
                  console.log(e.name);
                })}</p>
                <p><span className='fw-bold'>Languages: </span>
                  {Object.values(countryDetail.languages).map((y, i) => {
                    return <span key={i}>{y}, </span>
                    console.log(y);
                  })}
                </p>
              </div>
            </div>


            <p><span className='fw-bold'>Border Countries: </span> {countryDetail.borders?.map((z, i) => {
              return <Link to={"/border/" + z} key={i} className='elements text-decoration-none'><button className='btn px-4 me-2 bg-transparent elements lightElementsBg border border-2' >{z}</button></Link>

            })}
            </p>
          </div>
        </div>
      </div> : ""}
    </>
  )
}

