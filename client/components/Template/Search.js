import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Button, Segment, Modal, Transition, Search} from 'semantic-ui-react'
import {getStockPrice} from '../../store/chart'
import {getComparedStockPrice} from '../../store/compareChart'
import {connectSearchBox} from 'react-instantsearch/connectors'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  connectHits,
  Configure
} from 'react-instantsearch-dom'

class SearchModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      size: 'tiny'
    }
  }
  show = size => () => this.setState({size, open: true})

  close = () => this.setState({open: false})

  render() {
    const {open, size} = this.state

    return (
      <div>
        <Button
          content="Click Me!"
          id="help-btn"
          onClick={this.show('tiny')}
          icon="question circle outline icon"
        />
        <div>
          <Transition.Group>
            {open && (
              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>What is an equity?</Modal.Header>
                <Modal.Content>
                  <p>
                    Definition: the value of the shares issued by a company.
                  </p>
                  <p>
                    You can use this to look up a unique stock ticker (ie, Apple
                    [AAPL], Alphabet [GOOG], Tesla [TSLA])
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    onClick={this.close}
                    positive
                    icon="checkmark"
                    labelPosition="right"
                    content="I know that I need to use the Search Bar in Buy/Sell to change the Dashboard"
                  />
                </Modal.Actions>
              </Modal>
            )}
          </Transition.Group>
        </div>
      </div>
    )
  }
}

const Hit = props => {
  const handleSubmit = async tick => {
    await getStockPrice(tick, 'ytd')
  }
  return (
    <div>
      <div className="hit-name">
        <button type="submit">
          <Highlight
            attribute="name"
            onClick={() => handleSubmit(props.hit.symbol)}
            hit={props.hit}
          />{' '}
          ${props.hit.symbol}
        </button>
      </div>
    </div>
  )
}

const CustomHits = connectHits(Hits)

const SearchList = props => {
  return (
    <div className="search">
      <SearchModal />
      <InstantSearch
        appId="MSPV9314C4"
        apiKey="05bc8b4ff6e5864770345ec9f9ec1ea3"
        indexName="iex"
      >
        <SearchBox searchAsYouType={true} />
        <CustomHits hitComponent={Hit} mainProps={props} />
      </InstantSearch>
    </div>
  )
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    historicalPrices: state.chart.historicalPrices,
    ticker: state.chart.ticker,
    ticker2: state.chart.ticker2
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStockPrice: (ticker, time) => dispatch(getStockPrice(ticker, time)),
    getCompanyStockPrices: (ticker1, time) =>
      dispatch(getComparedStockPrice(ticker1, time))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchList)
)
