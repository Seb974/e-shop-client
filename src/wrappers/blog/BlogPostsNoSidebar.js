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
                                                <FacebookShareButton 
                                                    url={ api.CLIENT_DOMAIN + "/articles/" + article.id }
                                                    quote={"Frais Pei"}
                                                    hashtag="#fraispei"
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
                                                    title={"Frais Pei"}
                                                >
                                                    <TwitterIcon size={36} round={true}/> 
                                                </TwitterShareButton>
                                            </li>
                                            <li>
                                                <LinkedinShareButton
                                                    url={ api.CLIENT_DOMAIN + "/articles/" + article.id }
                                                    title={"Frais Pei"}
                                                    summary="#fraispei"
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

export default BlogPostsNoSidebar;
