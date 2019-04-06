import React, {useEffect} from 'react'
import {getPortfolioData} from '../store/companyDetailsTable'
import {getNews} from '../store/financialDataTable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Table} from 'semantic-ui-react'

const CompanyData = (props, initialTicker = 'KO') => {
  const ticker = props.ticker ? props.ticker : initialTicker
  useEffect(
    () => {
      props.getPortfolioData(ticker)
      props.getNews(ticker)
    },
    [props.ticker]
  )
  const {news} = props
  return (
    <div className="companyFinancials-container">
      <h5>News</h5>
      <div className="financialList">
        <Table striped>
          <Table.Body>
            {news.map(val => {
              return (
                <Table.Row key={val.url}>
                  <Table.Cell>{val.source}</Table.Cell>
                  <Table.Cell>
                    <a href={val.url} target="_blank">
                      {val.headline}
                    </a>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stats: state.companyDetailsTable.stats,
    ticker: state.chart.ticker,
    news: state.financialDataTable.news
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolioData: ticker => dispatch(getPortfolioData(ticker)),
    getNews: ticker => dispatch(getNews(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyData)
)
