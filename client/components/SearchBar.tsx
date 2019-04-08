import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'
import {connectAutoComplete, algoliasearch, instantsearch} from 'react-instantsearch-dom'
import {withRouter} from 'react-router-dom'
import {Search, Image} from 'semantic-ui-react'

/*
const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
});
*/

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
`

const formatHits = hits => {
  return _.chain(hits)
    .map(h => {
      return {title: h.symbol, description: h.name}
    })
    .slice(0, 10)
    .value()
}

const SearchBar: React.StatelessComponent<any> = props => {
  const [val, setVal] = useState('')

  const onChange = (e, {value}) => {
    setVal(value)
    props.refine(value)
  }

  const onSelect = (e, {result}) => {
    setVal('')
    props.history.push({
      pathname: `${result.title.toLowerCase()}`
    })
  }

  return (
    <SearchWrap>
      <h1>Hi</h1>
      <Search
        style={{width: '90%'}}
        fluid
        input={{style: {width: '90%'}}}
        size="small"
        placeholder="Enter Company or Symbol"
        value={val}
        onSearchChange={onChange}
        onResultSelect={onSelect}
        results={formatHits(props.hits)}
      />
    </SearchWrap>
  )
}

SearchBar.propTypes = {
  refine: PropTypes.func.isRequired,
  hits: PropTypes.array.isRequired
}

export default connectAutoComplete(withRouter(SearchBar))
