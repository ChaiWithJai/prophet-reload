import React, {useEffect, useState} from 'react'
import {getPortfolio} from '../store/assetallocation'
import {getStockPriceForAssetAllocation} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Table} from 'semantic-ui-react'

const PortfolioDataTable = props => {
  const [intervalId, setIntervalId] = useState(0)
  const [currentUser, setCurrentUser] = useState(0)
  const intervalFunc = async () => {
    const callBack = (func, userId) => {
      func(userId)
    }
    props.getPortfolio(currentUser)
    const currentInterval = setInterval(() => {
      callBack(props.getPortfolio, props.userId)
    }, 50000)
    //type check currentInterval to be number
    await setIntervalId(Number(currentInterval))
  }
  //we must re-render based values changing inside of the portfolio object so we're checking quanitity changes on items
  const determineReRender = props.portfolio.reduce((accum, val) => {
    accum += val[2]
    return accum
  }, 0)
  useEffect(
    () => {
      setCurrentUser(props.userId)
      //does intervalFunc need to be awaited here?
      intervalFunc()
      props.getPortfolio(props.userId)
      return () => {
        clearInterval(intervalId)
      }
      //add in logic using .reduce method to compare quantities and companies middleware firing too much
    },
    [determineReRender]
  )
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return (
    <div className="portfoliolist-container">
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Ticker</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Current Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {props.portfolio.map((val, idx) => {
          return (
            <Table.Body key={val[0]}>
              <Table.Row id={`portfolioData${idx}`}>
                <Table.Cell>{val[0]}</Table.Cell>
                <Table.Cell textAlign="center">
                  {numberWithCommas(val[2])}
                </Table.Cell>
                <Table.Cell>${numberWithCommas(val[1].toFixed(0))}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )
        })}
      </Table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    portfolio: state.assetallocation.portfolio,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: userId => dispatch(getPortfolio(userId)),
    getStockPriceForAssetAllocation: ticker =>
      dispatch(getStockPriceForAssetAllocation(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PortfolioDataTable)
)
