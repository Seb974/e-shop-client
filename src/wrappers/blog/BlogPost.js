import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import parse from 'html-react-parser';
import Imgix from "react-imgix";
import { isDefined } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import {FacebookShareButton, FacebookIcon, TwitterIcon, FacebookMessengerShareButton, FacebookMessengerIcon, TwitterShareButton, LinkedinIcon, LinkedinShareButton} from "react-share";
import AuthContext from "../../contexts/AuthContext";

const BlogPost = ({ article, strings }) => {

  const { platform } = useContext(AuthContext);

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          { isDefined(article.image.imgPath) ?
            <Imgix  src={ article.image.imgPath } className="lazyload" alt={ article.filePath } width="750" disableSrcSet={ true } disableLibraryParam={ true }
                    attributeConfig={{
                      srcSet: 'data-srcset',
                      sizes: 'data-sizes'
                    }}
            />
            :
            <img src={ api.API_DOMAIN + "/uploads/pictures/" + article.image.filePath } alt=""/>
          }
        </div>
        <div className="blog-details-content mb-4">
          <div className="blog-meta-2">
            <ul>
              <li>{ strings["the_date"] } { (new Date(article.publishedAt)).toLocaleDateString('fr-FR', { timeZone: 'UTC'}) }</li>
            </ul>
          </div>
          <h3>{ article.title }</h3>
          { parse(article.content) }
        </div>
        <div className="blog-share d-flex justify-content-end">
          {/* <span>{ strings["share"] } :</span> */}
          <div className="share-social">
          <ul>
              <li className="d-inline mx-2">
                  <FacebookShareButton 
                      url={ api.CLIENT_DOMAIN + "/articles/" + article.id }
                      quote={ platform.name }
                      hashtag={ isDefined(platform.name) ? "#" + platform.name.replaceAll(' ', '').toLowerCase() : "" }
                      className="facebook"
                  >
                      <FacebookIcon size={36} round={true}/>
                  </FacebookShareButton>
              </li>
              <li className="d-inline mx-2">
                  <FacebookMessengerShareButton
                      url={ api.CLIENT_DOMAIN + "/articles/" + article.id }
                      appId="630008714635405"
                      redirectUri={ api.CLIENT_DOMAIN + "/articles" }
                      className="facebook"
                  >
                      <FacebookMessengerIcon size={36} round={true}/>
                  </FacebookMessengerShareButton>
              </li>
              <li className="d-inline mx-2">
                  <TwitterShareButton
                      url={ api.CLIENT_DOMAIN + "/articles/" + article.id }
                      title={ platform.name }
                  >
                      <TwitterIcon size={36} round={true}/> 
                  </TwitterShareButton>
              </li>
              <li className="d-inline mx-2">
                  <LinkedinShareButton
                      url={ api.CLIENT_DOMAIN + "/articles/" + article.id }
                      title={ platform.name }
                      summary={ isDefined(platform.name) ? "#" + platform.name.replaceAll(' ', '').toLowerCase() : "" }
                      source={ api.CLIENT_DOMAIN }
                  >
                      <LinkedinIcon size={36} round={true}/> 
                  </LinkedinShareButton>
              </li>
          </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default multilanguage(BlogPost);
