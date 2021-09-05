import React, { Fragment, useContext, useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import ArticleActions from "../../services/ArticleActions";
import MercureContext from "../../contexts/MercureContext";
import {FacebookShareButton, FacebookIcon, TwitterIcon, FacebookMessengerShareButton, FacebookMessengerIcon, TwitterShareButton, LinkedinIcon, LinkedinShareButton} from "react-share";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { updateArticles } from "../../data/dataProvider/eventHandlers/articleEvents";

const BlogPostsNoSidebar = () => {

  const { updatedArticles, setUpdatedArticles } = useContext(MercureContext);
  const [articlesOpering, setArticlesOpering] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => fetchArticles(), []);

  useEffect(() => {
      if (isDefinedAndNotVoid(updatedArticles) && !articlesOpering) {
          setArticlesOpering(true);
          updateArticles(articles, setArticles, updatedArticles, setUpdatedArticles)
              .then(response => setArticlesOpering(response));
      }
  }, [updatedArticles]);

  const fetchArticles = () => {
      ArticleActions
          .findAll()
          .then(response => setArticles(response.filter(a => a.visible)));
  };

  return (
    <Fragment>
      { articles.map(article => {
              return (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                      <div className="blog-wrap-2 mb-30">
                          <div className="blog-img-2">
                              <Link to={ process.env.PUBLIC_URL + "/articles/" + article.id }>
                                  {/* <img src={ api.API_DOMAIN + "/uploads/pictures/" + article.image.filePath } alt="" />   {process.env.PUBLIC_URL + "/assets/img/blog/blog-9.jpg"}  */}
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
                              </Link>
                          </div>
                          <div className="blog-content-2">
                              <div className="blog-meta-2">
                                  <ul>
                                      <li>Le { (new Date(article.publishedAt)).toLocaleDateString('fr-FR', { timeZone: 'UTC'}) }</li>
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
                                        Lire +
                                    </Link>
                                </div>
                                <div className="blog-share">
                                    <span>Partager :</span>
                                    <div className="share-social">
                                        <ul>
                                            <li>
                                                {/* <a className="facebook" href="//facebook.com"><i className="fa fa-facebook" /></a> */}
                                                <FacebookShareButton 
                                                    url={ process.env.PUBLIC_URL + "/articles/" + article.id }  // api.CLIENT_DOMAIN
                                                    quote={"Frais Pei"}
                                                    hashtag="#fraispei"
                                                    className="facebook"
                                                    // className={classes.socialMediaButton}
                                                  >
                                                      <FacebookIcon size={36} round={true}/>
                                                </FacebookShareButton>
                                            </li>
                                            <li>
                                                {/* <a className="twitter" href="//twitter.com"><i className="fa fa-twitter" /></a> */}
                                                <FacebookMessengerShareButton
                                                    appId={ process.env.FACEBOOK_APP_ID }
                                                    // url={ process.env.PUBLIC_URL + "/articles/" + article.id }  // api.CLIENT_DOMAIN
                                                    // quote={"Frais Pei"}
                                                    // hashtag="#fraispei"
                                                    className="facebook"
                                                    // className={classes.socialMediaButton}
                                                  >
                                                      <FacebookMessengerIcon size={36} round={true}/>
                                                </FacebookMessengerShareButton>
                                            </li>
                                            <li>
                                                {/* <a className="instagram" href="//instagram.com"><i className="fa fa-instagram" /></a> */}
                                                <TwitterShareButton
                                                    // appId={ process.env.FACEBOOK_APP_ID }
                                                    // url={ process.env.PUBLIC_URL + "/articles/" + article.id }  // api.CLIENT_DOMAIN
                                                    title={"Frais Pei"}
                                                    // description="#fraispei"
                                                    // className="instagram"
                                                    // className={classes.socialMediaButton}
                                                  >
                                                      {/* <FacebookMessengerIcon size={36} round={true}/> */}
                                                      <TwitterIcon size={36} round={true}/> 
                                                </TwitterShareButton>
                                            </li>
                                            <li>
                                                {/* <a className="instagram" href="//instagram.com"><i className="fa fa-instagram" /></a> */}
                                                <LinkedinShareButton
                                                    // appId={ process.env.FACEBOOK_APP_ID }
                                                    // url={ process.env.PUBLIC_URL + "/articles/" + article.id }  // api.CLIENT_DOMAIN
                                                    title={"Frais Pei"}
                                                    summary="#fraispei"
                                                    source={ api.CLIENT_DOMAIN }
                                                    // className="instagram"
                                                    // className={classes.socialMediaButton}
                                                  >
                                                      {/* <FacebookMessengerIcon size={36} round={true}/> */}
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

      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={process.env.PUBLIC_URL + "/assets/img/blog/blog-9.jpg"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>22 April, 2020</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                Lorem ipsum blog post
              </Link>
            </h4>
            <p>
              Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
              cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  read more
                </Link>
              </div>
              <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={process.env.PUBLIC_URL + "/assets/img/blog/blog-8.jpg"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>22 April, 2020</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                New collection of our shop
              </Link>
            </h4>
            <p>
              Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
              cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  read more
                </Link>
              </div>
              <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={process.env.PUBLIC_URL + "/assets/img/blog/blog-7.jpg"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>22 April, 2020</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                Ipsum blog post two
              </Link>
            </h4>
            <p>
              Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
              cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  read more
                </Link>
              </div>
              <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={process.env.PUBLIC_URL + "/assets/img/blog/blog-6.jpg"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>22 April, 2020</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                New shop collection
              </Link>
            </h4>
            <p>
              Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
              cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  read more
                </Link>
              </div>
              <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={process.env.PUBLIC_URL + "/assets/img/blog/blog-5.jpg"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>22 April, 2020</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                Lorem blog post four
              </Link>
            </h4>
            <p>
              Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
              cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  read more
                </Link>
              </div>
              <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={process.env.PUBLIC_URL + "/assets/img/blog/blog-4.jpg"}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>22 April, 2020</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                Ipsum blog post five
              </Link>
            </h4>
            <p>
              Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
              cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  read more
                </Link>
              </div>
              <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPostsNoSidebar;
