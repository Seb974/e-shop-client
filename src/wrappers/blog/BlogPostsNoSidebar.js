import React, { Fragment, useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { isDefined } from "../../helpers/utils";
import ArticleActions from "../../services/ArticleActions";

const BlogPostsNoSidebar = () => {

  const [articles, setArticles] = useState([]);

  useEffect(() => fetchArticles(), []);

  const fetchArticles = () => {
      ArticleActions
          .findAll()
          .then(response => setArticles(response));
  };

  return (
    <Fragment>
      {   articles.map(article => {
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
                                      <li>22 April, 2020</li>
                                      <li>
                                          <Link to={ process.env.PUBLIC_URL + "/articles/" + article.id }>
                                            4 <i className="fa fa-comments-o" />
                                          </Link>
                                      </li>
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
                                                <a className="facebook" href="//facebook.com"><i className="fa fa-facebook" /></a>
                                            </li>
                                            <li>
                                                <a className="twitter" href="//twitter.com"><i className="fa fa-twitter" /></a>
                                            </li>
                                            <li>
                                                <a className="instagram" href="//instagram.com"><i className="fa fa-instagram" /></a>
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
