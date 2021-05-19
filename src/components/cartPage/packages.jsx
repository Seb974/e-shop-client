import React, { useContext } from 'react';
import { connect } from "react-redux";
import AuthContext from '../../contexts/AuthContext';
import DeliveryContext from '../../contexts/DeliveryContext';
import { isDefined } from '../../helpers/utils';
import { multilanguage } from "redux-multilanguage";

const Packages = ({ currency, strings }) => {

    const { country, settings } = useContext(AuthContext);
    const { packages, availableWeight } = useContext(DeliveryContext);

    return packages.length <= 0 ? <></> : (
        <>
            <h3 className="cart-page-title mt-4">{ "Colisage nécessaire" }</h3>
            <div className="row">
                <div className="col-12">
                <div className="table-content table-responsive cart-table-content">
                    <table>
                    <thead>
                        <tr>
                        <th>Image</th>
                        <th>{strings["product_name"]}</th>
                        <th>{strings["unit_price"]}</th>
                        <th>{strings["qty"]}</th>
                        <th>{strings["subtotal"]}</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor: "#F9F9F9"}}>
                        { packages.map((_package, key) => {
                        const catalogPrice = _package.container.catalogPrices.find(catalogPrice => catalogPrice.catalog.code === country);
                        const price = isDefined(catalogPrice) ? catalogPrice.amount : 0;
                        const taxToApply = !isDefined(_package.container) || !settings.subjectToTaxes ? 0 : _package.container.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === country).percent;
                        const finalContainerPrice = !isDefined(_package.container) ? 0 : (price * currency.currencyRate * (1 + taxToApply)).toFixed(2);

                        return !isDefined(_package.container) ? <></> : (
                            <tr key={key}>
                            <td className="product-thumbnail">
                                <img className="img-fluid" src="/assets/img/icon-img/parcel.png" alt=""/>
                            </td>
                            <td className="product-name text-center">
                                { _package.container.name }
                                <div className="cart-item-variation">
                                { key === 0 && availableWeight >= 0.1 ? 
                                    <span className="text-warning"><i className="fas fa-info-circle mr-1"></i>{ (Math.floor(availableWeight * 10) / 10).toFixed(2) } Kg disponible</span> :
                                    <span className="text-success"><i className="fas fa-check-circle mr-1"> Colis complet</i></span>
                                }
                                </div>
                            </td>
                            <td className="product-price-cart">
                                <span className="amount">{finalContainerPrice  + " " + currency.currencySymbol}</span>
                            </td>

                            <td className="product-quantity">
                                <span className="amount">{ _package.quantity.toFixed(2) }</span>
                            </td>
                            <td className="product-subtotal">
                                { (finalContainerPrice * _package.quantity).toFixed(2) + " " + currency.currencySymbol }
                            </td>
                            <td className="product-remove"></td>
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
      currency: state.currencyData
    };
  };
 
export default connect(mapStateToProps)(multilanguage(Packages));