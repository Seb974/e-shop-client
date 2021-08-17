import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Background } from 'react-imgix';
import sliderData from "../../data/hero-sliders/hero-slider-thirty-five.json";
import Countdown from "react-countdown-now";
import Renderer from "../../components/countdown/Renderer";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import HomeContext from "../../contexts/HomeContext";

const HeroSliderThirtyFive = () => {

  const { homepage } = useContext(HomeContext);

  return !(isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes)) ? <></> : (
    <div className="slider-area">
        <div
          className="slider-height-2 bg-img slider-content-center"
          style={{ backgroundImage: `url(${homepage.heroes[0].image.imgPath})` }}
        >
        {/* <Background src={ homepage.heroes[0].image.imgPath } className="slider-height-2 bg-img slider-content-center"
          imgixParams={{ w: 1920, h: 800 }} disableLibraryParam={ true }
        > */}
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 align-self-center">
              <div className="slider-content-15 slider15-mrg-nrg text-center">
                <h1 
                    dangerouslySetInnerHTML={{ __html: homepage.heroes[0].title }}
                    style={{ 
                      color: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].titleColor) ? homepage.heroes[0].titleColor : "white",
                      shadow: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].textShadow) && homepage.heroes[0].textShadow ? "0.1em 0.1em 0.2em black" : "none",
                  }}
                />
                <div className="timer dealy-style-2 wow zoomIn">
                  <Countdown
                    date={ new Date(homepage.countdowns[0].date) }
                    renderer={Renderer}
                  />
                </div>
                <div className="slider-btn-12 btn-hover">
                  <Link
                    className="animated"
                    to={isDefined(homepage.heroes[0].product) ? "/product/" + homepage.heroes[0].product.id : "/shop"}
                    style={{
                      border: 'none',
                      backgroundColor: isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(homepage.heroes[0].textColor) ? homepage.heroes[0].textColor : "#ED59A0",
                    }}
                  >
                    MORE OFFER
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

export default HeroSliderThirtyFive;
