import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import TickerItem from './TickerItem'

const Ticker = ({data}) => {
  const passIn = data.slice(0, 120)
  return (
    <div className="ticker-wrapper">
      <div className={passIn.length === 0 ? 'ticker' : 'ticker scrolling'}>
        {passIn.map(symbol => (
          <div key={symbol.symbol} className="ticker__item">
            <TickerItem symbol={symbol} />
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    data: state.ticker.data
  }
}

export default withRouter(connect(mapStateToProps, null)(Ticker))
