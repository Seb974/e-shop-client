import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import BlogComment from "../../wrappers/blog/BlogComment";
import BlogPost from "../../wrappers/blog/BlogPost";
import LayoutSeven from "../../layouts/LayoutSeven";
import ArticleActions from "../../services/ArticleActions";
import { isDefined } from "../../helpers/utils";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";

const BlogDetailsStandard = ({ match, history, location }) => {

  const { id = "new" } = match.params;
  const { platform } = useContext(AuthContext);
  const [article, setArticle] = useState(null);

  useEffect(() => fetchArticle(id), []);
  useEffect(() => fetchArticle(id), [id]);

  const fetchArticle = id => {
    if (id !== "new") {
        ArticleActions.find(id)
            .then(response => {
                setArticle(response);
            })
            .catch(error => {
                console.log(error);
                // TODO : Notification flash d'une erreur
                history.replace("/");
            });
    }
};

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
        <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
        { isDefined(article) && 
            <>
              <title>{ platform.name + " - " + article.title }</title>
              <meta property="title" content={ platform.name + " - " + article.title } />
              <meta property="og:title" content={ platform.name + " - " + article.title } />
              <meta name="description" content={ article.summary } />
              <meta property="og:description" content={ article.summary } />
              <meta property="image" content={ api.API_DOMAIN + "/uploads/pictures/" + article.image.filePath } />
              <meta property="og:image" content={ api.API_DOMAIN + "/uploads/pictures/" + article.image.filePath } />
              <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
            </>
        }
      </MetaTags>
      <LayoutSeven stick="stick">

        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
                <div className="blog-details-wrapper ml-20">
                  { isDefined(article) &&
                    <>
                        <BlogPost article={ article }/>
                        {/* blog post comment */}
                        {/* <BlogComment /> */}
                    </>
                  }
                </div>
            </div>
          </div>
        </div>
        </LayoutSeven>
    </Fragment>
  );
};

BlogDetailsStandard.propTypes = {
  location: PropTypes.object
};

export default BlogDetailsStandard;
