import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getStockPrice} from '../store/chart'
import {getComparedStockPrice} from '../store/compareChart'
import {getStockPriceToBuy, getStockPriceToSell} from '../store/assetallocation'
import {Button, Segment} from 'semantic-ui-react'

const Search: React.FC = ({props} : any) => {
  const [equity, setEquity] = useState('')
  //not being used
  const [timeFrame, setTimeFrame] = useState('ytd')

  const handleChange = evt => {
    evt.preventDefault()
    setEquity(evt.target.value)
  }
  const handleSubmit = async () => {
    await props.getStockPrice(equity, 'ytd')
    await setEquity('')
  }

  return (
    <div className="search">
      <div>
        <label>
          <input type="text" value={equity} onChange={handleChange} onSubmit={handleSubmit} />
        </label>
        <Segment id="search-button">
          <Button
            color="purple"
            type="submit"
            icon="check"
            onClick={handleSubmit}
          />
        </Segment>
      </div>
    </div>
  )
}


const BuySellPage = (props) => {
  const [ticker, setTicker] = useState('')
  const [quantity, setQuantity] = useState(0)
  const handleSubmitBuy = evt => {
    evt.preventDefault()
    props.buyStock({ticker, quantity}, props.userId)
    setQuantity(0)
  }
  const handleSubmitSell = evt => {
    evt.preventDefault()
    props.sellStock({ticker, quantity}, props.userId)
    setQuantity(0)
  }
  useEffect(
    () => {
      setTicker(props.ticker)
    },
    [props.ticker]
  )
  return (
    <div className="buy-sell-everything-container">
      <Search props={props} />
      <div className="buy-sell-ticker">
        <h3>{props.ticker}</h3>
      </div>
      <div className="buy-sell-quantity">
        <label>Quantity to Buy or Sell: </label>
        <input
          required
          name="quantity"
          value={quantity}
          //create tests to check type on evt.target.value
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(evt.target.value))}
        />
      </div>
      <div className="small ui vertical buttons">
        <Segment inverted id="buy">
          <Button
            className="ui buttons"
            inverted
            color="purple"
            type="submit"
            onClick={handleSubmitBuy}
          >
            Buy
          </Button>
        </Segment>
        <Segment inverted id="sell">
          <Button
            className="ui buttons"
            inverted
            color="purple"
            type="submit"
            onClick={handleSubmitSell}
          >
            Sell
          </Button>
        </Segment>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {    
    historicalPrices: state.chart.historicalPrices,
    ticker: state.chart.ticker,
    ticker2: state.chart.ticker2,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyStock: (orderDetails, userId) =>
      dispatch(getStockPriceToBuy(orderDetails, userId)),
    sellStock: (orderDetails, userId) =>
      dispatch(getStockPriceToSell(orderDetails, userId)),
    getStockPrice: (ticker, time) => dispatch(getStockPrice(ticker, time)),
    getCompanyStockPrices: (ticker1, time) =>
      dispatch(getComparedStockPrice(ticker1, time))
  
  }
}

//why aren't we using withStore here
const CompanyWithStore = connect(mapStateToProps, mapDispatchToProps)(
  BuySellPage
)

export default CompanyWithStore
