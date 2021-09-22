import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Background } from 'react-imgix';
import sliderData from "../../data/hero-sliders/hero-slider-thirty-five.json";
import Countdown from "react-countdown-now";
import Renderer from "../../components/countdown/Renderer";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import HomeContext from "../../contexts/HomeContext";
import AuthContext from "../../contexts/AuthContext";

const HeroSliderThirtyFive = () => {

  const { homepage } = useContext(HomeContext);
  const { selectedCatalog } = useContext(AuthContext);
  const [heroes, setHeroes] = useState([]);
  const [countdowns, setCountdowns] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedCountdown, setSelectedCountdown] = useState(null);

  useEffect(() => refreshElements(), []);
  useEffect(() => refreshElements(), [homepage, selectedCatalog]);

  const refreshElements = () => {
      if (isDefined(homepage) && isDefined(selectedCatalog)) {
          if (isDefinedAndNotVoid(homepage.heroes)) {
              const activeHeroes = homepage.heroes.filter(h => !isDefinedAndNotVoid(h.catalogs) || h.catalogs.find(cat => cat.id === selectedCatalog.id));
              setHeroes(activeHeroes);
              setSelectedHero(activeHeroes[0]);
          }
          if (isDefinedAndNotVoid(homepage.countdowns)) {
              const activeCountdowns = homepage.countdowns.filter(c => !isDefinedAndNotVoid(c.catalogs) || c.catalogs.find(cat => cat.id === selectedCatalog.id));
              setCountdowns(activeCountdowns);
              setSelectedCountdown(activeCountdowns[0]);
          }
      }
  };

  return !(isDefined(selectedCountdown) && isDefined(selectedHero)) ? <></> : (
    <div className="slider-area">
        <div
          className="slider-height-2 bg-img slider-content-center"
          style={{ backgroundImage: `url(${selectedHero.image.imgPath})` }}
        >
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 align-self-center">
              <div className="slider-content-15 slider15-mrg-nrg text-center">
                <h1 
                    dangerouslySetInnerHTML={{ __html: selectedHero.title }}
                    style={{ 
                      color: isDefined(selectedHero.titleColor) ? selectedHero.titleColor : "white",
                      shadow: isDefined(selectedHero.textShadow) && selectedHero.textShadow ? "0.1em 0.1em 0.2em black" : "none",
                  }}
                />
                <div className="timer dealy-style-2 wow zoomIn">
                  <Countdown
                    date={ new Date(selectedCountdown.date) }
                    renderer={Renderer}
                  />
                </div>
                <div className="slider-btn-12 btn-hover">
                  <Link
                    className="animated"
                    to={isDefined(selectedHero.product) ? "/product/" + selectedHero.product.id : "/shop"}
                    style={{
                      border: 'none',
                      backgroundColor: isDefined(selectedHero.textColor) ? selectedHero.textColor : "#ED59A0",
                    }}
                  >
                    VOIR LES OFFRES
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSliderThirtyFive;
