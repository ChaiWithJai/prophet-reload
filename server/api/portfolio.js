const router = require('express').Router()
const {User, Transaction, Stock, Portfolio} = require('../db/models')
const {getCurrentMarketValue} = require('../db/models/portfolio')
module.exports = router
const axios = require('axios')
var Sequelize = require('sequelize')

router.get('/:userId', async (req, res, next) => {
  try {
    const userPortfolio = await Portfolio.getPortfolio(req.params.userId)
    res.json(userPortfolio)
  } catch (error) {
    next(error.message)
  }
})

// router.get('/:userId', async (req, res, next) => {
//     const money = 'MONEY'
//     try {
//         const userPortfolio = await Portfolio.getPortfolio(req.params.userId)
//         console.log("Number?", await currentMarketPrice('aapl') * userPortfolio[0].dataValues.quantity)
//         const updatedValues = await Portfolio.update({
//             // currentMarketValue: await currentMarketPrice(userPortfolio.ticker)
//             currentMarketValue: Portfolio.quantity
//         }, {
//             where: {
//                 ticker: {
//                     [Op.not]: money
//                 },
//                 userId: req.params.userId
//             }
//         })
//         res.json(updatedValues)
//     } catch (error) {
//         next(error.message)
//     }
// })
