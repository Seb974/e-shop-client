import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import parse from 'html-react-parser';
import Imgix from "react-imgix";
import { isDefined } from "../../helpers/utils";

const BlogPost = ({ article }) => {
  return (
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
              <li>22 April, 2018</li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  4 <i className="fa fa-comments-o" />
                </Link>
              </li>
            </ul>
          </div>
          <h3>{ article.title }</h3>
          { parse(article.content) }
        </div>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprhendit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qei
            officia deser mollit anim id est laborum. Sed ut perspiciatis unde
            omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam.{" "}
          </p>
          <blockquote>
            Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do
            eiusmod tempor incididunt labo dolor magna aliqua. Ut enim ad minim
            veniam quis nostrud.
          </blockquote>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehendrit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        
      </div>
      <div className="dec-img-wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img src={ process.env.PUBLIC_URL + "/assets/img/blog/blog-details.jpg" } alt=""/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img src={ process.env.PUBLIC_URL + "/assets/img/blog/blog-details-2.jpg"} alt=""/>
            </div>
          </div>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehendrit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
      </div>
      
      <div className="tag-share">
        <div className="dec-tag">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>lifestyle ,</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>interior ,</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>outdoor</Link>
            </li>
          </ul>
        </div> */}
        <div className="blog-share d-flex justify-content-end">
          <span>share :</span>
          <div className="share-social">
            <ul>
              <li className="d-inline mx-2">
                <a className="facebook" href="//facebook.com">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li className="d-inline mx-2">
                <a className="twitter" href="//twitter.com">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li className="d-inline mx-2">
                <a className="instagram" href="//instagram.com">
                  <i className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="next-previous-post">
        <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
          {" "}
          <i className="fa fa-angle-left" /> prev post
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
          next post <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost;
