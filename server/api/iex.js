const router = require('express').Router()
const {User, Transaction, Stock, Portfolio} = require('../db/models')
module.exports = router
const axios = require('axios')

router.get('/stockprice/:ticker', async (req, res, next) => {
  try {
    const {data: iexRealtimePrice} = await axios.get(
      `https://api.iextrading.com/1.0/stock/${req.params.ticker}/quote`
    )
    res.json(iexRealtimePrice.latestPrice)
  } catch (err) {
    console.error(
      'IEX API /quote error is likely test https://api.iextrading.com/1.0/stock/##ticker/quote',
      err.message
    )
    next(err)
  }
})

router.get('/getChartData/:ticker/:time', async (req, res, next) => {
  try {
    const {data: iexRealtimePrice} = await axios.get(
      `https://api.iextrading.com/1.0/stock/${req.params.ticker}/chart/${
        req.params.time
      }`
    )
    const chartData = iexRealtimePrice.reduce((accum, val, idx) => {
      accum.push([idx, val.close])
      return accum
    }, [])
    res.json(chartData)
  } catch (err) {
    console.error(
      'IEX API /chart error is likely test https://api.iextrading.com/1.0/stock/##ticker/chart',
      err.message
    )
    next(err)
  }
})

router.get('/getFinancialData/:ticker', async (req, res, next) => {
  try {
    const {data: iexFinancialReportData} = await axios.get(
      `https://api.iextrading.com/1.0/stock/${
        req.params.ticker
      }/financials?period=annual`
    )
    const mostRecentYearFinancialReportFromJSONArr =
      iexFinancialReportData.financials[0]
    res.json(mostRecentYearFinancialReportFromJSONArr)
  } catch (err) {
    console.error(
      'IEX API /financials error is likely test https://api.iextrading.com/1.0/stock/##ticker/financials?period=annual',
      err.message
    )
    next(err)
  }
})

router.get('/getPeers/:ticker', async (req, res, next) => {
  try {
    const {data: iexRealtimePrice} = await axios.get(
      `https://api.iextrading.com/1.0/stock/${req.params.ticker}/peers`
    )
    res.json(iexRealtimePrice)
  } catch (err) {
    console.error(
      'IEX API /peers error is likely test https://api.iextrading.com/1.0/stock/##ticker/peers',
      err.message
    )
    next(err)
  }
})

router.get('/getStats/:ticker', async (req, res, next) => {
  try {
    const {data: iexRealTimeStats} = await axios.get(
      `https://api.iextrading.com/1.0/stock/${req.params.ticker}/stats`
    )
    res.json(iexRealTimeStats)
  } catch (err) {
    console.error(
      'IEX API /stats error is likely test https://api.iextrading.com/1.0/stock/##ticker/stats',
      err.message
    )
    next(err)
  }
})
