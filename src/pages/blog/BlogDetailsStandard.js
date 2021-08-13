import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import BlogComment from "../../wrappers/blog/BlogComment";
import BlogPost from "../../wrappers/blog/BlogPost";
import LayoutSeven from "../../layouts/LayoutSeven";
import ArticleActions from "../../services/ArticleActions";
import { isDefined } from "../../helpers/utils";

const BlogDetailsStandard = ({ match, history }) => {

  const { id = "new" } = match.params;
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

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Blog Post</title>
        <meta
          name="description"
          content="Blog post page of flone react minimalist eCommerce template."
        />
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
