import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutSeven from "../../layouts/LayoutSeven";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPostsNoSidebar from "../../wrappers/blog/BlogPostsNoSidebar";
import api from "../../config/api";
import ArticleActions from "../../services/ArticleActions";
import MercureContext from "../../contexts/MercureContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { updateArticles } from "../../data/dataProvider/eventHandlers/articleEvents";
import AuthContext from "../../contexts/AuthContext";

const BlogNoSidebar = ({ location }) => {

  const itemsPerPage = 3;
  const { pathname } = location;
  const { platform } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { updatedArticles, setUpdatedArticles } = useContext(MercureContext);
  const [articlesOpering, setArticlesOpering] = useState(false);
  const [articles, setArticles] = useState([]);
  const [paginatedArticles, setPaginatedArticles] = useState([]);

  useEffect(() => fetchArticles(), []);

  useEffect(() => {
    if (isDefinedAndNotVoid(updatedArticles) && !articlesOpering) {
        setArticlesOpering(true);
        updateArticles(articles, setArticles, updatedArticles, setUpdatedArticles)
            .then(response => setArticlesOpering(response));
    }
  }, [updatedArticles]);

  useEffect(() => {
    setPaginatedArticles(BlogPagination.getData(articles, currentPage, itemsPerPage));
  }, [articles, currentPage]);

  const fetchArticles = () => {
      ArticleActions
          .findAll()
          .then(response => setArticles(response.filter(a => a.visible)));
  };

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= Math.ceil(articles.length / itemsPerPage))
      setCurrentPage(newPage);
  };

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
        <title>{ platform.name + " - Le blog" }</title>
        <meta property="title" content={ platform.name + " - Le blog" } />
        <meta property="og:title" content={ platform.name + " - Le blog" } />
        <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
        <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
      </MetaTags>

      <LayoutSeven stick="stick">
        <div className="blog-area pt-100 pb-100 blog-no-sidebar mt-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="mr-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPostsNoSidebar articles={ paginatedArticles }/>
                  </div>

                  {/* blog pagination */}
                  { Math.ceil(articles.length / itemsPerPage) > 1 &&
                    <BlogPagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={articles.length}/>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutSeven>
    </Fragment>
  );
};

BlogNoSidebar.propTypes = {
  location: PropTypes.object
};

export default BlogNoSidebar;
