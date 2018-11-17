pragma solidity 0.4.24;

contract TradePromotion {

    uint public trustPoints;
    uint private txnPointCost;
    uint[] private appliedPromotions;

    event promotionTxnEvent (
        uint indexed _promoId
    );

    constructor () public {
        trustPoints = 500;
    }

    function isPromoAvailable(uint _tpCriteria) external view returns (bool) {
        return trustPoints > _tpCriteria ;
    }

    function getAppliedPromos() external view returns (uint[]) {
        return appliedPromotions;
    }

    function applyPromo (uint _promoId, uint _tpCost, uint _tpCriteria ) public {
        //require that the same promo does not gets added twice
        for (uint i = 0; i < appliedPromotions.length; i++) {
            require(appliedPromotions[i] != _promoId, "Same promo cant be applied twice");
        }

        require(_promoId > 0 && _tpCriteria < trustPoints, "Your trust point is not sufficient for this promo");

        appliedPromotions.push(_promoId);

        trustPoints = trustPoints - _tpCost;

        // trigger event
        emit promotionTxnEvent(_promoId);
    }
    
}
