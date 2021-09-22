import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

const HeroSliderThirtyFour = () => {

  const { homepage } = useContext(HomeContext);
  const { selectedCatalog } = useContext(AuthContext);
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);

  // useEffect(() => refreshHeroes(), []);
  useEffect(() => refreshHeroes(), [homepage, selectedCatalog]);

  const refreshHeroes = () => {
      if (isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(selectedCatalog)) {
        const activeHeroes = homepage.heroes.filter(h => !isDefinedAndNotVoid(h.catalogs) || h.catalogs.find(cat => cat.id === selectedCatalog.id));
        setHeroes(activeHeroes);
        setSelectedHero(activeHeroes[0]);
      }
  };

  return !isDefined(selectedHero) ? <></> : (
    <div className="slider-area">
      <div
        className="slider-height-5 bg-img d-flex align-items-center"
        style={{ backgroundImage: `url(${selectedHero.image.imgPath})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="slider-content-3 slider-content-3-white slider-animated-1 text-center">
                <h3 
                    className="animated"
                    style={{ 
                      color: isDefined(selectedHero) && isDefined(selectedHero.titleColor) ? selectedHero.titleColor : "white",
                      shadow: isDefined(selectedHero) && isDefined(selectedHero.textShadow) && selectedHero.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                  }}
                >
                    { selectedHero.title }
                </h3>
                <h1 
                    className="animated"
                    style={{ 
                      color: isDefined(selectedHero) && isDefined(selectedHero.textColor) ? selectedHero.textColor : "white",
                      shadow: isDefined(selectedHero) && isDefined(selectedHero.textShadow) && selectedHero.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                    }}
                >
                    { selectedHero.subtitle }
                </h1>
                <p 
                    className="animated"
                    style={{ 
                      color: isDefined(selectedHero) && isDefined(selectedHero.textColor) ? selectedHero.textColor : "white",
                      shadow: isDefined(selectedHero) && isDefined(selectedHero.textShadow) && selectedHero.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                    }}
                >
                    { selectedHero.text }
                </p>
                <div className="slider-btn btn-hover">
                  <Link 
                      className="animated" 
                      to={isDefined(selectedHero.product) ? "/product/" + selectedHero.product.id : "/shop"}
                      style={{ 
                        backgroundColor: isDefined(selectedHero) && isDefined(selectedHero.titleColor) ? selectedHero.titleColor : "#ED59A0",
                    }}
                  >
                    J'EN PROFITE
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

export default HeroSliderThirtyFour;
