import React, { useContext, useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";
import HomeContext from "../../contexts/HomeContext";
import sliderData from "../../data/hero-sliders/hero-slider-thirty-three.json";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const HeroSliderThirtyThree = () => {

  const { homepage } = useContext(HomeContext);
  const [index, setIndex] = useState(0);
  const { selectedCatalog } = useContext(AuthContext);

  useEffect(() => {
    if( isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes)) {
      const max = homepage.heroes.filter(h => !isDefinedAndNotVoid(h.catalogs) || h.catalogs.find(cat => cat.id === selectedCatalog.id)).length;
      setIndex(Math.floor(Math.random() * max));
    }
  }, [homepage]);

  return !(isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes)) ? <></> : (
    <div className="slider-area position-relative">
      <span
        className="body-effect effect-snow"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/assets/img/icon-img/snow1.png"
          })`
        }}
      />
      <div
        className="single-slider slider-height-14 bg-img"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + sliderData.backgroundImage
          })`
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6 align-self-center">
              <div className="slider-content-14">
                <h3 style={{ 
                      color: isDefined(homepage.heroes[index].titleColor) ? homepage.heroes[index].titleColor : "white",
                      shadow: isDefined(homepage.heroes[index].textShadow) && homepage.heroes[index].textShadow ? "0.1em 0.1em 0.2em black" : "none",
                  }}
                >
                  {homepage.heroes[index].title}
                </h3>
                <h1 dangerouslySetInnerHTML={{ __html: homepage.heroes[index].subtitle }}
                    style={{ 
                      color: isDefined(homepage.heroes[index].textColor) ? homepage.heroes[index].textColor : "white",
                      shadow: isDefined(homepage.heroes[index].textShadow) && homepage.heroes[index].textShadow ? "0.1em 0.1em 0.2em black" : "none"
                    }}
                />
                <div className="slider-btn btn-hover">
                  <Link 
                      to={isDefined(homepage.heroes[index].product) ? "/product/" + homepage.heroes[index].product.id : "/shop"}
                      style={{
                        border: 'none',
                        backgroundColor: isDefined(homepage.heroes[index].titleColor) ? homepage.heroes[index].titleColor : "#ED59A0",
                      }}
                  >
                    COMMENCEZ VOS ACHATS !
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
              <div className="slider-single-img-14">
                { isDefined(homepage.heroes[index].image.imgPath) ?
                    <Imgix  src={ homepage.heroes[index].image.imgPath } className="lazyload default-img" alt={ homepage.heroes[index].image.filePath } width="530" disableSrcSet={ true } disableLibraryParam={ true }
                            attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                    />
                    :
                    <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + homepage.heroes[index].image.filePath } alt="" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSliderThirtyThree;
