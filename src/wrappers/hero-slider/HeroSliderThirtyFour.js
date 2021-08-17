import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Background } from 'react-imgix';
import sliderData from "../../data/hero-sliders/hero-slider-thirty-four.json";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const HeroSliderThirtyFour = () => {

  const { homepage } = useContext(HomeContext);

  return !(isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes)) ? <></> : (
    <div className="slider-area">
      <div
        className="slider-height-5 bg-img d-flex align-items-center"
        style={{ backgroundImage: `url(${homepage.heroes[0].image.imgPath})` }}
      >
      {/* <Background src={ homepage.heroes[0].image.imgPath } className="slider-height-5 bg-img d-flex align-items-center"
        imgixParams={{ w: 1920, h: 800 }} disableLibraryParam={ true }
      > */}
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="slider-content-3 slider-content-3-white slider-animated-1 text-center">
                <h3 
                    className="animated"
                    style={{ 
                      color: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].titleColor) ? homepage.heroes[0].titleColor : "white",
                      shadow: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].textShadow) && homepage.heroes[0].textShadow ? "0.1em 0.1em 0.2em black" : "none"
                  }}
                >
                    { homepage.heroes[0].title }
                </h3>
                <h1 
                    className="animated"
                    style={{ 
                      color: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].textColor) ? homepage.heroes[0].textColor : "white",
                      shadow: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].textShadow) && homepage.heroes[0].textShadow ? "0.1em 0.1em 0.2em black" : "none"
                    }}
                >
                    { homepage.heroes[0].subtitle }
                </h1>
                <p 
                    className="animated"
                    style={{ 
                      color: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].textColor) ? homepage.heroes[0].textColor : "white",
                      shadow: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].textShadow) && homepage.heroes[0].textShadow ? "0.1em 0.1em 0.2em black" : "none"
                    }}
                >
                    { homepage.heroes[0].text }
                </p>
                <div className="slider-btn btn-hover">
                  <Link 
                      className="animated" 
                      to={isDefined(homepage.heroes[0].product) ? "/product/" + homepage.heroes[0].product.id : "/shop"}
                      style={{ 
                        backgroundColor: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].titleColor) ? homepage.heroes[0].titleColor : "#ED59A0",
                    }}
                  >
                    J'EN PROFITE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </Background> */}
      </div>
    </div>
  );
};

export default HeroSliderThirtyFour;
