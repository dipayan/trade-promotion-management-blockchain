import React from 'react'

class PromoCampaign extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selected: '0' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selected: parseInt(event.target.value) });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Apply a new Promotion</h5>
          <form onSubmit={(event) => {
            event.preventDefault()
            this.props.availablePromotions.filter(promotion => promotion.id === this.state.selected ).forEach(promotion => this.props.applyPromoFn(promotion.id,  promotion.tpCost, promotion.tpCriteria))
            
          }}>
            <div className='form-group'>
              <select className='form-control' value={this.state.selected} onChange={this.handleChange.bind()}>
                <option key="0" value="0"> -- Select a promo --</option>
                {this.props.availablePromotions.map((promotion) => {
                  return <option key={promotion.id} value={promotion.id}>{promotion.id} . {promotion.name}</option>
                })}
              </select>
            </div>
            

            {this.state.selected !== '0' ?
            <div>
            <button type='submit' className='btn btn-primary'>Apply</button>
            <hr />
              <table className="table table-warning table-bordered">

                {this.props.availablePromotions.filter(promotion => promotion.id === this.state.selected ).map(promotion =>
                  <tbody key={promotion.id}>
                    <tr>
                      <td>Promo ID </td><td>{promotion.id}</td>
                    </tr>
                    <tr>
                      <td>Promo Name </td><td>{promotion.name}</td>
                    </tr>
                    <tr>
                      <td>Details </td><td>{promotion.description}</td>
                    </tr>
                    <tr>
                      <td>Criteria </td><td>{promotion.tpCriteria}</td>
                    </tr>
                    <tr>
                      <td>Cost </td><td>{promotion.tpCost}</td>
                    </tr>
                  </tbody>
                )}
              </table>
              </div>
              : null
            }

          </form>
        </div>
      </div>
    )
  }
}

export default PromoCampaign
