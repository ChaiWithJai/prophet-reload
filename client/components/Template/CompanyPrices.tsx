import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import BuySellPage from '../BuySellPage'

const CompanyPrices = props => {
  return (
    <div className="selector-child-container">
      <h4> Use this search to change charts </h4>
      <BuySellPage ticker={props.ticker} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stats: state.companyDetailsTable.stats,
    ticker: state.chart.ticker
  }
}

export default withRouter(connect(mapStateToProps)(CompanyPrices))
