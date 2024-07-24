import React from 'react'
import Card from './Card';
import './Home.css';


const CarAuction = () => {
  return (
    <div className="auction-page">
      <div style={{ paddingLeft:'0', paddingRight: '0' }}>
        <div className='styles_breadCrumbContainer__Vlpan'>
          <ul className='styles_breadCrumbWrapper__fxIbd'>
            <li className='styles_breadCrumbItem__zo38H'>
              <a class href="/">Home</a>
              <span>/</span>
            </li>
            <li className='styles_breadCrumbItem__zo38H styles_active__bLuew'>Cars</li>
          </ul>
        </div>
      </div>
      <div className='styles_auctionsLayoutContain__m0KIP'>
        <div className='styles_auctionsLayoutWrap__jqoMM'>
        <div className='styles_fixedButtonContainer__bN8C6'></div>
        <div className='styles_auctionsLayoutFilter__Shzwl' style={{ width: 'unset' }}>
          <div className='styles_filterExpand__ebw7V'>
            <img class src='./down-arrow-svgrepo-com.svg' alt='expand'/>
          </div>
          <div className='styles_auctionsLayoutData__JLaU1'>
            <div className='list_filtersContain__yvdDH'>
              <div className='list_filterActions__lH_vR'>
                <span>Filters</span>
                <img src='./down-arrow-svgrepo-com.svg' alt='close-icon' className='list_filterClose__7W9cj'/>
                <span className='list_resetDimmed__WCbIc'>Reset All Filters</span>
              </div>
              <div className='list_btnContainer__ASpJa' style={{ gap: '.5rem', flexDirection: 'row', display: 'flex' }}>
                <button className='list_applyFilterBtn__tGAfo list_disabled__ptdP1' style={{ flex: '1 1 0%' }}>
                  Apply Filter (926)
                </button>
                <button className='list_applyFilterBtn__tGAfo list_disabled__ptdP1' style={{ flex: '1 1 0%' }} disabled>
                  Save Filter
                </button>
              </div>
              <div style={{ width: '100%' }}>
                <div>
                  <div className='styles_filterList__2NSJ2'>
                    <div className='styles_filterListItem__kPmdc'>
                      <div className='site-accordion'>
                        <div className='site-accordion-head'>
                          <div className='styles_filterListItemHead__Yhs_H'>
                            <span>Category</span>
                            <img 
                              src='./minus-gray.png' 
                              notactivesrc='./plus-gray.png' 
                              activesrc='./minus-gray.png'
                              alt='accordion'
                              width='16'
                              height='16'
                              loading='lazy'
                              rel='preload'
                            />
                          </div>
                        </div>
                        <div className='site-accordion-body'>
                          <div className='styles_filterListItemBody__P8gV_'>
                            <ul className='styles_filterTypeList___WrZU'>
                              <li className='styles_filterTypeListItem__wzE5_'>
                                <div className='styles_filterTypeListItemData__ClFle'>
                                  <img 
                                    src='https://cdn.emiratesauction.com/media/2wt3e92zf3mzuk536din7720g3cg8zhbnurys49vj2psmw9pax/t_,w_174,h_174,wm_0,tr_1/images.png'
                                    alt='Bikes filter icon'
                                    width='33'
                                    height='33'
                                    style={{ marginBottom: '5px' }}
                                  />
                                  <span>Bikes</span>
                                </div>
                                <div className='styles_filterTypeFloatingIcon__zMj_8'>
                                  <img 
                                    src='./checkbox-gray.svg'
                                    alt='check'
                                    width='22'
                                    height='22'
                                    loading='lazy'
                                    rel='preload'
                                  />
                                </div>
                              </li>
                              <li className='styles_filterTypeListItem__wzE5_'>
                                <div className='styles_filterTypeListItemData__ClFle'>
                                  <img 
                                    src='https://cdn.emiratesauction.com/media/2wt3e92zf3mzuk536din7720g3cg8zhbnurys49vj2psmw9pax/t_,w_174,h_174,wm_0,tr_1/images.png'
                                    alt='Bikes filter icon'
                                    width='33'
                                    height='33'
                                    style={{ marginBottom: '5px' }}
                                  />
                                  <span>Boats & Jet Skies</span>
                                </div>
                                <div className='styles_filterTypeFloatingIcon__zMj_8'>
                                  <img 
                                    src='./checkbox-gray.svg'
                                    alt='check'
                                    width='22'
                                    height='22'
                                    loading='lazy'
                                    rel='preload'
                                  />
                                </div>
                              </li>
                              <li className='styles_filterTypeListItem__wzE5_'>
                                <div className='styles_filterTypeListItemData__ClFle'>
                                  <img 
                                    src='https://cdn.emiratesauction.com/media/2wt3e92zf3mzuk536din7720g3cg8zhbnurys49vj2psmw9pax/t_,w_174,h_174,wm_0,tr_1/images.png'
                                    alt='Bikes filter icon'
                                    width='33'
                                    height='33'
                                    style={{ marginBottom: '5px' }}
                                  />
                                  <span>Buses</span>
                                </div>
                                <div className='styles_filterTypeFloatingIcon__zMj_8'>
                                  <img 
                                    src='./checkbox-gray.svg'
                                    alt='check'
                                    width='22'
                                    height='22'
                                    loading='lazy'
                                    rel='preload'
                                  />
                                </div>
                              </li>
                              <li className='styles_filterTypeListItem__wzE5_'>
                                <div className='styles_filterTypeListItemData__ClFle'>
                                  <img 
                                    src='https://cdn.emiratesauction.com/media/2wt3e92zf3mzuk536din7720g3cg8zhbnurys49vj2psmw9pax/t_,w_174,h_174,wm_0,tr_1/images.png'
                                    alt='Bikes filter icon'
                                    width='33'
                                    height='33'
                                    style={{ marginBottom: '5px' }}
                                  />
                                  <span>Heavy Trucks</span>
                                </div>
                                <div className='styles_filterTypeFloatingIcon__zMj_8'>
                                  <img 
                                    src='./checkbox-gray.svg'
                                    alt='check'
                                    width='22'
                                    height='22'
                                    loading='lazy'
                                    rel='preload'
                                  />
                                </div>
                              </li>
                              <li className='styles_filterTypeListItem__wzE5_'>
                                <div className='styles_filterTypeListItemData__ClFle'>
                                  <img 
                                    src='https://cdn.emiratesauction.com/media/2wt3e92zf3mzuk536din7720g3cg8zhbnurys49vj2psmw9pax/t_,w_174,h_174,wm_0,tr_1/images.png'
                                    alt='Bikes filter icon'
                                    width='33'
                                    height='33'
                                    style={{ marginBottom: '5px' }}
                                  />
                                  <span>Machinery</span>
                                </div>
                                <div className='styles_filterTypeFloatingIcon__zMj_8'>
                                  <img 
                                    src='./checkbox-gray.svg'
                                    alt='check'
                                    width='22'
                                    height='22'
                                    loading='lazy'
                                    rel='preload'
                                  />
                                </div>
                              </li>
                              <li className='styles_filterTypeListItem__wzE5_'>
                                <div className='styles_filterTypeListItemData__ClFle'>
                                  <img 
                                    src='https://cdn.emiratesauction.com/media/2wt3e92zf3mzuk536din7720g3cg8zhbnurys49vj2psmw9pax/t_,w_174,h_174,wm_0,tr_1/images.png'
                                    alt='Bikes filter icon'
                                    width='33'
                                    height='33'
                                    style={{ marginBottom: '5px' }}
                                  />
                                  <span>Other</span>
                                </div>
                                <div className='styles_filterTypeFloatingIcon__zMj_8'>
                                  <img 
                                    src='./checkbox-gray.svg'
                                    alt='check'
                                    width='22'
                                    height='22'
                                    loading='lazy'
                                    rel='preload'
                                  />
                                </div>
                              </li>
                              <li className='styles_filterTypeListItem__wzE5_'>
                                <div className='styles_filterTypeListItemData__ClFle'>
                                  <img 
                                    src='https://cdn.emiratesauction.com/media/2wt3e92zf3mzuk536din7720g3cg8zhbnurys49vj2psmw9pax/t_,w_174,h_174,wm_0,tr_1/images.png'
                                    alt='Bikes filter icon'
                                    width='33'
                                    height='33'
                                    style={{ marginBottom: '5px' }}
                                  />
                                  <span>Pick up</span>
                                </div>
                                <div className='styles_filterTypeFloatingIcon__zMj_8'>
                                  <img 
                                    src='./checkbox-gray.svg'
                                    alt='check'
                                    width='22'
                                    height='22'
                                    loading='lazy'
                                    rel='preload'
                                  />
                                </div>
                              </li>
                              <li className='styles_filterTypeListItem__wzE5_'>
                                <div className='styles_filterTypeListItemData__ClFle'>
                                  <img 
                                    src='https://cdn.emiratesauction.com/media/2wt3e92zf3mzuk536din7720g3cg8zhbnurys49vj2psmw9pax/t_,w_174,h_174,wm_0,tr_1/images.png'
                                    alt='Bikes filter icon'
                                    width='33'
                                    height='33'
                                    style={{ marginBottom: '5px' }}
                                  />
                                  <span>Trailers</span>
                                </div>
                                <div className='styles_filterTypeFloatingIcon__zMj_8'>
                                  <img 
                                    src='./checkbox-gray.svg'
                                    alt='check'
                                    width='22'
                                    height='22'
                                    loading='lazy'
                                    rel='preload'
                                  />
                                </div>
                              </li>
                              <li className='styles_filterTypeListItem__wzE5_'>
                                <div className='styles_filterTypeListItemData__ClFle'>
                                  <img 
                                    src='https://cdn.emiratesauction.com/media/2wt3e92zf3mzuk536din7720g3cg8zhbnurys49vj2psmw9pax/t_,w_174,h_174,wm_0,tr_1/images.png'
                                    alt='Bikes filter icon'
                                    width='33'
                                    height='33'
                                    style={{ marginBottom: '5px' }}
                                  />
                                  <span>Vehicles</span>
                                </div>
                                <div className='styles_filterTypeFloatingIcon__zMj_8'>
                                  <img 
                                    src='./checkbox-gray.svg'
                                    alt='check'
                                    width='22'
                                    height='22'
                                    loading='lazy'
                                    rel='preload'
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Card />
        </div>
      </div>
    </div>
  )
}

export default CarAuction