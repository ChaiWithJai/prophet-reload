import React from 'react'
import PropTypes from 'prop-types'
import {InstantSearch, connectAutoComplete} from 'react-instantsearch-dom'

//for later use when Algolia is implemented
const WithInstantSearch = ({children}) => {
  return (
    <div>
      <h1>Search Bar</h1>
      <InstantSearch
        appId={process.env.ALGOLIA_ID}
        apiKey={process.env.ALGOLIA_API_KEY}
        indexName={process.env.ALGOLIA_INDEX}
      >
        {children}
      </InstantSearch>
    </div>
  )
}

WithInstantSearch.propTypes = {
  children: PropTypes.element.isRequired
}

export default WithInstantSearch
