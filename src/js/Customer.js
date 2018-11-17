


import React from 'react'

class Customer extends React.Component {
  render() {
    return (
        <div className="card" style={{marginTop: '5em'}}>  
            <div className="card-body">
                <h2 className="card-title">{this.props.accountName}</h2>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.account}</h6>
                <h4 className="card-text">Trust Points : {this.props.accountTrustPoints} </h4>
            </div>
        </div>
    )
  }
}

export default Customer
