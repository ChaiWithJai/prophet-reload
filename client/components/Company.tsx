import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStockPriceToBuy, getStockPriceToSell} from '../store/assetallocation'
import HomePageChart from './HomePageChart'
import CompanyFinancials from './CompanyFinancials'

//this component is no longer needed delete
const Company = props => {
  const handleSubmitBuy = evt => {
    evt.preventDefault()
    props.buyStock()
  }
  const handleSubmitSell = evt => {
    evt.preventDefault()
    props.sellStock()
  }
  return (
    <div>
      <h3>Apple</h3>
      <HomePageChart />
      <CompanyFinancials />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    buyStock: () => dispatch(getStockPriceToBuy()),
    sellStock: () => dispatch(getStockPriceToSell())
  }
}

const CompanyWithStore = connect(null, mapDispatchToProps)(Company)

export default CompanyWithStore
