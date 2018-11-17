import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import TradePromotion from '../../build/contracts/TradePromotion.json'
import MainLayout from './MainLayout'
import 'bootstrap/dist/css/bootstrap.css'
import { customers, promotions } from './database'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      accountName: '',
      accountTrustPoints: 0,
      appliedPromotions: [],
      availablePromotions: [],
      loading: true,
      processing: false,

    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.tradePromotion = TruffleContract(TradePromotion)
    this.tradePromotion.setProvider(this.web3Provider)

    this.applyPromoFn = this.applyPromoFn.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
    this.hexToString = this.hexToString.bind(this)
  }


  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.setState({ accountName: customers.filter(customer => this.hexToString(customer.id) == this.hexToString(account)).map(customer => customer.name) })
      this.tradePromotion.deployed().then((tradePromotionInstance) => {
        this.tradePromotionInstance = tradePromotionInstance
        this.watchEvents()
        this.tradePromotionInstance.trustPoints().then((_trustPoints) => {
          this.setState({ accountTrustPoints: _trustPoints.toNumber() })
  
          this.tradePromotionInstance.getAppliedPromos().then((_appliedPromotions) => {
            let temp = _appliedPromotions.map(key => key.toNumber())
            this.setState({ appliedPromotions: promotions.filter( promotion => temp.includes(promotion.id) )})
            console.log( this.state.appliedPromotions)
          })

          let _availablePromotions = []

          promotions.forEach( promotion => {
            this.tradePromotionInstance.isPromoAvailable.call(promotion.tpCriteria).then(result => {
              if (!result) _availablePromotions.push(promotion)
              this.setState({ availablePromotions: _availablePromotions})
            })
          })

          this.setState({ availablePromotions: _availablePromotions , loading : false})

          })
        })
      })

  }
  hexToString(hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
  }


  watchEvents() {
    // TODO: trigger event when promo is applied not when component renders
    this.tradePromotionInstance.promotionTxnEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ processing: false })
    })
  }

  applyPromoFn(promoId, tpCost,  tpCriteria) {
    this.setState({ processing: true })
    this.tradePromotionInstance.applyPromo(promoId, tpCost, tpCriteria, { from: this.state.account }).then((result) => result )
  }

  render() {
    return (
      <div>
        {this.state.loading || this.state.voting
          ? <p className='text-center'>Loading...</p>
          : <MainLayout
            account={this.state.account}
            applyPromoFn={this.applyPromoFn}
            availablePromotions={this.state.availablePromotions}
            accountName={this.state.accountName}
            appliedPromotions={this.state.appliedPromotions}
            accountTrustPoints={this.state.accountTrustPoints} />
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
