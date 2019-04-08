import React from 'react'
import SearchList from './Search'
import CompanyPrices from './CompanyPrices'
import PeerSelections from './PeerSelections'

const Selector = () => {
  return (
    <div className="selector-container">
      <SearchList />
      <CompanyPrices />
      <PeerSelections />
    </div>
  )
}

export default Selector
