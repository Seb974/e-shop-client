import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import BrandLogoOneSingle from "../../components/brand-logo/BrandLogoOneSingle";
import SectionTitle from "../../components/section-title/SectionTitle";
import brandLogoData from "../../data/brand-logos/brand-logo-one.json";
import { multilanguage } from "redux-multilanguage";
import useWindowDimensions from "../../helpers/screenDimensions";
import SellerActions from "../../services/SellerActions";
import { isDefinedAndNotVoid } from "../../helpers/utils";


const BrandLogoSliderOne = ({ spaceBottomClass, spaceTopClass, strings }) => {

  const { height, width } = useWindowDimensions();
  const [sellers, setSellers] = useState([]);

  useEffect(() => fetchSellers(), []);

  const fetchSellers = () => {
      SellerActions
        .findSellersWithLogo()
        .then(response => setSellers(response));
  };

  const settings = {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 5
      },
      768: {
        slidesPerView: 4
      },
      640: {
        slidesPerView: 3
      },
      320: {
        slidesPerView: 2
      }
    }
  };

  return (
    <div
      className={`brand-logo-area ${
        spaceBottomClass ? spaceBottomClass : ""
      }  ${spaceTopClass ? spaceTopClass : ""}`}
    >
      <div className="container">
      <SectionTitle
          titleText={ strings["our_partners"] }
          subtitleText={ strings["partners_products"] }
          subtitleColorClass="grey"
          positionClass="text-center"
          spaceClass="mb-55"
          borderClass="no-border"
        />
        <div className="brand-logo-active d-flex justify-content-around">
          {/* <Swiper {...settings}> */}
            {/* {brandLogoData && brandLogoData */}
            { isDefinedAndNotVoid(sellers) && 
                sellers
                  .sort(() => Math.random() - 0.5)
                  .filter((logo, i) => {
                    return width <= 620 ? i < 2 : 
                          width > 630 && width <= 768 ? i < 3 : i < 5;
                  })
                  .map((single, key) => {
                      return (
                        <BrandLogoOneSingle
                            data={ single }
                            key={ key }
                            sliderClassName="swiper-slide"
                            spaceBottomClass="mb-30"
                        />
                      );
                })
            }
          {/* </Swiper> */}
        </div>
      </div>
    </div>
  );
};

BrandLogoSliderOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default multilanguage(BrandLogoSliderOne);
