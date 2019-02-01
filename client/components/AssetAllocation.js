import React, {Component} from 'react'
import {getPortfolio} from '../store/assetallocation'
import {getStockPriceForAssetAllocation} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  FlexibleXYPlot,
  BarSeries,
  XAxis,
  YAxis,
  RectSeries,
  VerticalBarSeries,
  RadialChart
} from 'react-vis'
import {callbackify} from 'util'

class AssetAllocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: {},
      portValues: [],
      intervalId: 0
    }
    this.interval = this.interval.bind(this)
  }
  async componentDidMount() {
    await this.interval()
  }
  async interval() {
    const callBack = func => {
      func()
    }
    this.props.getPortfolio()
    const intervalId = setInterval(() => {
      callBack(this.props.getPortfolio)
    }, 500)
    await this.setState({intervalId})
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  // componentDidUpdate(prevProps, prevState) {
  //   // Typical usage (don't forget to compare props):
  //   //
  //   //Thunk returns an object be sure to just grab price --> this is erroring out
  //   //
  //   // const portArr = Object.keys(this.state.portfolio);
  //   // console.log("portArr", portArr)
  //   // const portVal = portArr.map(async (val) => {
  //   //   console.log("val", val)
  //   //   await this.props.getStockPriceForAssetAllocation(val);
  //   // })
  //   // const isLoaded = prevState.portValues[0] === undefined
  //   // console.log('Prev', isLoaded, 'State', this.state.portValues[0])
  //   // const realTimePricePort = this.props.portfolioData.reduce(async (accum, val) => {
  //   //   if (val.ticker !== 'MONEY') {
  //   //     let total = await this.props.getStockPriceForAssetAllocation(val.ticker)
  //   //     accum.push([
  //   //       val.ticker,
  //   //       val.quantity,
  //   //       // this.props.getStockPriceForAssetAllocation(val.ticker),
  //   //       total
  //   //     ])
  //   //   } else {
  //   //     accum.push([val.ticker, val.quantity, val.quantity])
  //   //   }
  //   //   return accum
  //   // }, [])
  //   if (this.props.portfolioData !== prevProps.portfolioData) {
  //     this.setState({
  //       portfolio: this.props.portfolioData,
  //       // portValues: realTimePricePort
  //     })
  //   }
  // }
  render() {
    let myData
    if (!this.state.portfolio) {
      // const cashCash = this.state.cash || 0
      // const portPort = this.state.stocks || 0
      // // const cashCash = 2;
      // // const portPort = 13;
      // myData = Object.values(this.state.portfolio).reduce((accum, val) => {
      //   accum.push({angle: val.quantity})
      //   return accum
      // }, [])
    } else {
      myData = [{angle: 0}, {angle: 0}, {angle: 100}]
    }
    return <RadialChart data={myData} width={300} height={300} />
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.assetallocation.portfolio,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio,
    getStockPriceForAssetAllocation: ticker =>
      dispatch(getStockPriceForAssetAllocation(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssetAllocation)
)
