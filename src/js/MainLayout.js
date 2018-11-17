import React from 'react'
import PromoHistory from './PromoHistory'
import PromoCampaign from './PromoCampaign'
import Customer from './Customer';
import logo from '../logo.png';

class MainLayout extends React.Component {
  render() {
    return (
      <div>
<nav className="navbar navbar-dark bg-success">
  <a className="navbar-brand" href="#">
    <img src={logo} width="30" height="30" className="d-inline-block align-left" alt=""/>
     Trade Promotion Management Console
  </a>
</nav>
       
      <div className="row">
        <div className="offset-md-4 col-sm-4 text-center" >               
          <Customer accountName={this.props.accountName} account={this.props.account} accountTrustPoints= {this.props.accountTrustPoints}/>
        </div>
        <hr />
      </div>
      <div className="row">
      <div className="col-sm-6 text-center" style={{marginTop: '5em'}}>  
            <PromoCampaign applyPromoFn={this.props.applyPromoFn} availablePromotions={this.props.availablePromotions} />
        </div>      
        <div className="col-sm-6 text-center" style={{marginTop: '5em'}}>   
          <PromoHistory appliedPromotions={this.props.appliedPromotions}  />
        </div>
      </div>
      </div>
    )
  }
}

export default MainLayout
