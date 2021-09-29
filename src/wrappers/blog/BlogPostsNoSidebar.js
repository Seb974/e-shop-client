import React, { Fragment, useContext } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../contexts/AuthContext";
import {FacebookShareButton, FacebookIcon, TwitterIcon, FacebookMessengerShareButton, FacebookMessengerIcon, TwitterShareButton, LinkedinIcon, LinkedinShareButton} from "react-share";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const BlogPostsNoSidebar = ({ articles, strings }) => {

  const { platform } = useContext(AuthContext);

  return !isDefined(platform) || !isDefinedAndNotVoid(articles) ? <></> : (
    <Fragment>
      { articles.map((article, key) => {
              return (
                  <div key={ key } className="col-lg-4 col-md-6 col-sm-12">
                      <div className="blog-wrap-2 mb-30">
                          <div className="blog-img-2">
                              <Link to={ process.env.PUBLIC_URL + "/articles/" + article.id }>
                                  { isDefined(article.image.imgPath) ?
                                    <Imgix  src={ article.image.imgPath } className="lazyload" alt={ article.filePath } width={ 750 } disableSrcSet={ true } disableLibraryParam={ true }
                                            attributeConfig={{
                                              srcSet: 'data-srcset',
                                              sizes: 'data-sizes'
                                            }}
                                    />
                                    :
                                    <img src={ api.API_DOMAIN + "/uploads/pictures/" + article.image.filePath } alt=""/>
                                  }
                              </Link>
                          </div>
                          <div className="blog-content-2">
                              <div className="blog-meta-2">
                                  <ul>
                                      <li>{ strings["the_date"] } { (new Date(article.publishedAt)).toLocaleDateString('fr-FR', { timeZone: 'UTC'}) }</li>
                                      {/* <li>
                                          <Link to={ process.env.PUBLIC_URL + "/articles/" + article.id }>
                                            4 <i className="fa fa-comments-o" />
                                          </Link>
                                      </li> */}
                                  </ul>
                              </div>
                            <h4>
                                <Link to={ process.env.PUBLIC_URL + "/articles/" + article.id }>
                                    { article.title }
                                </Link>
                            </h4>
                            <p style={{ minHeight: "93.33px"}}>{ article.summary }</p>
                            <div className="blog-share-comment">
                                <div className="blog-btn-2">
                                    <Link to={ process.env.PUBLIC_URL + "/articles/" + article.id }>
                                    { strings["see more"] }
                                    </Link>
                                </div>
                                <div className="blog-share">
                                    {/* <span>{ strings["share"] } :</span> */}
                                    <div className="share-social">
                                        <ul>
                                            <li>
                                                <FacebookShareButton 
                                                    url={ api.CLIENT_DOMAIN + "/articles/" + article.id }
                                                    quote={ platform.name }
                                                    hashtag={ isDefined(platform.name) ? "#" + platform.name.replaceAll(' ', '').toLowerCase() : "" }
                                                    className="facebook"
                                                >
                                                    <FacebookIcon size={36} round={true}/>
                                                </FacebookShareButton>
                                            </li>
                                            <li>
                                                <FacebookMessengerShareButton
                                                    url={ api.CLIENT_DOMAIN + "/articles/" + article.id }
                                                    appId="630008714635405"
                                                    redirectUri={ api.CLIENT_DOMAIN + "/articles" }
                                                    className="facebook"
                                                >
                                                    <FacebookMessengerIcon size={36} round={true}/>
                                                </FacebookMessengerShareButton>
                                            </li>
                                            <li>
                                                <TwitterShareButton
                                                    url={ api.CLIENT_DOMAIN + "/articles/" + article.id }
                                                    title={ platform.name }
                                                >
                                                    <TwitterIcon size={36} round={true}/> 
                                                </TwitterShareButton>
                                            </li>
                                            <li>
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
                          </div>
                      </div>
                  </div>
              )
          })
      }
    </Fragment>
  );
};

export default multilanguage(BlogPostsNoSidebar);
