import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { isMobile } from "react-device-detect";
import Card from "../carAuction/Card";





function Motors(props) {
  sessionStorage.setItem('previousPage', window.location.href);
  return (
    <div>
      <Navbar />
      <Allcomp categories={props.categories} brands={props.brands} body_type={props.body_types} />
    </div>
  )
}
export default Motors;

const Allcomp = (props) => {

  const [price, setPrice] = useState(0);
  const [maxprice, setmaxPrice] = useState(100000000);
  const [milage, setmilage] = useState(0);
  const [maxmilage, setmaxmilage] = useState(100000000);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedstartYear, setSelectedstartYear] = useState(1900);
  const navigate = useNavigate('');

  const years = [];
  for (let year = currentYear; year >= 1800; year--) {
    years.push(year);
  }
  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };
  const handlestartYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedstartYear(year);
  };

  const handlePriceChange = (newValue) => {
    setPrice(newValue);
  };
  const handlemaxPriceChange = (newValue) => {
    setmaxPrice(newValue);
  };

  const handlemilageChange = (newValue) => {
    setmilage(newValue);
  };
  const handlemaxmilageChange = (newValue) => {
    setmaxmilage(newValue);
  };

  const [selectedOption, setSelectedOption] = useState('');
  const [models, setmodels] = useState('');
  const { t } = useTranslation();
  const customStyles = {
    option: (state) => ({
      height: 40, // Adjust the height of each option item
    }),
  };
  useEffect(() => {
    var modelURL = "https://backendauction.mydriven.ae/car_models/" + selectedOption.id;
    axios.get(modelURL).then((response) => {
      setmodels(response.data);
    });
  }, [selectedOption]);





  const Filters = () => {

  }
  const handlemix = () =>{
    navigate('/allmotors');
  }

  if (props.categories !== '' && props.brands !== '' && props.body_types !== null) {
    console.log(price, maxmilage, maxprice, selectedstartYear, selectedYear)
    return (
      <div className="row m-2 mt-5">
        {!isMobile &&
          <div className="col-md-3">
            <div className="Container-fluid"><Link to={"/"} ><span>{t("home")}</span></Link>/{t("motor")}</div>
            <div className="Container-fluid mt-5 mb-3"><b>{t("Filters")} </b><button className="btn btn-warning" style={{ marginRight: "20px", marginLeft: "20px" }} onClick={handlemix}><b>{t("Reset")}</b></button></div>
            <div className="Container-fluid mt-3 mb-3">
              <button className="btn btn-warning w-100 py-3" onClick={Filters}>{t("ApplyFilter")}</button>
            </div>


            <div className="Container-fluid bold-cont"><b>{t("Categoryf")}</b> <br /><br />
              {
                props.categories.map((category) => {
                  return (
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name='category' id={category.name} />
                      <label class="form-check-label" for={category.name} key={category.name}>
                        {category.name}
                      </label>
                    </div>
                  )
                })
              }
            </div>

            <div className="Container-fluid bold-cont mt-3"><b>{t("brands")}</b> <br /><br />

              {/* <input class="form-control mb-3" type="search" placeholder="Search" aria-label="Search"/> */}
              <div >
                {
                  <Select
                    options={props.brands}
                    onChange={(selectedOption) => setSelectedOption(selectedOption)}
                    value={selectedOption}
                    styles={customStyles}
                  />
                }</div>

            </div>

            <div className="Container-fluid bold-cont mt-3"><b>{t("models")}</b> <br /><br />
              <div>
                {
                  <Models models={models} />
                }
              </div>
            </div>

            <div className="Container-fluid bold-cont mt-3"><b>{t("Body")}</b> <br /><br />
              <div>
                {
                  <BodyTypes body_types={props.body_type} />
                }
              </div>
            </div>

            <div className="Container-fluid bold-cont mt-3"><b>{t("Price_Range")}</b> <br /><br />
              <div className="">

                <div style={{ margin: '20px', width: '80%' }}>
                  <div>
                    <label>{t('min_price')}: AED {price}</label>
                  </div>
                  <Slider
                    min={0}
                    max={100000000}
                    defaultValue={price}
                    value={price}
                    onChange={handlePriceChange}
                    step={1}
                    trackStyle={{ backgroundColor: '#007bff' }}
                    handleStyle={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                    railStyle={{ backgroundColor: '#e9ecef' }}
                  />

                  <div className="mt-3">
                    <label>{t('max_price')}: AED {maxprice}</label>
                  </div>
                  <Slider
                    min={0}
                    max={100000000}
                    defaultValue={maxprice}
                    value={maxprice}
                    onChange={handlemaxPriceChange}
                    step={1}
                    trackStyle={{ backgroundColor: '#007bff' }}
                    handleStyle={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                    railStyle={{ backgroundColor: '#e9ecef' }}
                  />
                </div>

              </div>
            </div>


            <div className="Container-fluid bold-cont mt-3"><b>{t("milage_range")}</b> <br /><br />
              <div className="">

                <div style={{ margin: '20px', width: '80%' }}>
                  <div>
                    <label>{t('min_milage')}: KM {milage}</label>
                  </div>
                  <Slider
                    min={0}
                    max={100000000}
                    defaultValue={milage}
                    value={milage}
                    onChange={handlemilageChange}
                    step={1}
                    trackStyle={{ backgroundColor: '#007bff' }}
                    handleStyle={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                    railStyle={{ backgroundColor: '#e9ecef' }}
                  />

                  <div className="mt-3">
                    <label>{t('max_milage')}: <br />KM {maxmilage}</label>
                  </div>
                  <Slider
                    min={0}
                    max={100000000}
                    defaultValue={maxmilage}
                    value={maxmilage}
                    onChange={handlemaxmilageChange}
                    step={1}
                    trackStyle={{ backgroundColor: '#007bff' }}
                    handleStyle={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                    railStyle={{ backgroundColor: '#e9ecef' }}
                  />
                </div>

              </div>
            </div>

            <div className="Container-fluid bold-cont mt-3"><b>{t("Year_Range")}</b> <br /><br />
              <div className="">

                <div style={{ margin: '20px', width: '80%' }}>
                  <label htmlFor="year">{t('start_year')}:</label>
                  <select id="year" value={selectedstartYear} onChange={handlestartYearChange}>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ margin: '20px', width: '80%' }}>
                  <label htmlFor="year">{t('end_year')}:</label>
                  <select id="year" value={selectedYear} onChange={handleYearChange}>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            <div className="Container-fluid mt-3 mb-3"><button className="btn btn-warning w-100 py-3" onClick={Filters}>{t("ApplyFilter")}</button></div>

          </div>}
        <Card  />
      </div>
    )
  }
}


const Models = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    option: (state) => ({
      height: 40, // Adjust the height of each option item
    }),
  };
  if (props.models !== '') {
    return (
      <Select
        options={props.models}
        onChange={(selectedOption) => setSelectedOption(selectedOption)}
        value={selectedOption}
        styles={customStyles}
      />
    )
  }
}

const BodyTypes = (props) => {
  if (props.body_types !== '') {
    return (
      props.body_types.map((body_type) => {
        return (

          <div class="form-check">
            <input class="form-check-input" type="radio" name='body_type' id={body_type.id} />
            <label class="form-check-label" for={body_type.id} key={body_type.id}>
              {body_type.name}
            </label>
          </div>
        )
      })
    )
  }
}