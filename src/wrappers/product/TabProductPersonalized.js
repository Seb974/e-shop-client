import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductGridHomePersonalized from "./ProductGridHomePersonalized";
import { Link } from "react-router-dom";
import ProductsContext from "../../contexts/ProductsContext";
import AuthContext from "../../contexts/AuthContext";
import { multilanguage } from "redux-multilanguage";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const TabProductPersonalized = ({ spaceTopClass, spaceBottomClass, bgColorClass, category, strings }) => {
  
  const { products } = useContext(ProductsContext);
  const { selectedCatalog } = useContext(AuthContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (isDefinedAndNotVoid(products) && isDefined(selectedCatalog)) {
      const newProducts = products.filter(p => p.catalogs.find(c => c.id === selectedCatalog.id))
                                  .filter(p => p.new);
      setNews(newProducts);
    }
  }, [products]);

  return (
    <div
      className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${bgColorClass ? bgColorClass : ""}`}
    >
      <div className="container">
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav variant="pills" className="product-tab-list pb-55 text-center">
              { isDefinedAndNotVoid(news) &&
                  <Nav.Item>
                    <Nav.Link eventKey="newArrival">
                      <h4>{ strings["new_arrivals"] }</h4>
                    </Nav.Link>
                  </Nav.Item>
              }
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>{ strings["best_sellers"] }</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>{ strings["our_selection"] }</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row justify-content-center">
                <ProductGridHomePersonalized
                    category={category}
                    type="new"
                    limit={8}
                    spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row justify-content-center">
                <ProductGridHomePersonalized
                    category={category}
                    type="bestSeller"
                    limit={8}
                    spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row justify-content-center">
                <ProductGridHomePersonalized
                    category={category}
                    type="saleItems"
                    limit={8}
                    spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more round-btn text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop"}
            style={{
              borderRadius : '0.25rem'
            }}
          >
            EN VOIR PLUS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductPersonalized.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default multilanguage(TabProductPersonalized);
