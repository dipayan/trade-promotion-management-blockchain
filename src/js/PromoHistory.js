import React from 'react'

class PromoHistory extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Availed Promotion History</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Promo #</th>
                <th>Promo Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody >
              {this.props.appliedPromotions.map((promotion) => 
                  <tr key={promotion.id}>  
                  <td>{promotion.id}</td>
                  <td>{promotion.name}</td> 
                  <td>{promotion.description}</td> 
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default PromoHistory
