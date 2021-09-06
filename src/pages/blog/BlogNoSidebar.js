import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutSeven from "../../layouts/LayoutSeven";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPostsNoSidebar from "../../wrappers/blog/BlogPostsNoSidebar";
import api from "../../config/api";

const BlogNoSidebar = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>{ "Frais Péi, votre maraîcher en ligne - Le blog" }</title>
        <meta property="title" content={ "Frais Péi, votre maraîcher en ligne - Le blog" } />
        <meta property="og:title" content={ "Frais Péi, votre maraîcher en ligne - Le blog" } />
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
                    <BlogPostsNoSidebar />
                  </div>

                  {/* blog pagination */}
                  <BlogPagination />
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
