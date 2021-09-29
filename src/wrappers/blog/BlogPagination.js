import React from "react";

const BlogPagination = ({currentPage, itemsPerPage, length, onPageChanged}) => {

  const pagesCount = Math.ceil(length / itemsPerPage);
  const pages = [];

  for(let i = 1; i <= pagesCount; i++) {
      pages.push(i);
  };

  return (
    <div className="pro-pagination-style text-center mt-20">
      <ul>
        <li>
          <button className={"prev" + (currentPage === 1 ? " disabled" : "")} onClick={() => onPageChanged(currentPage - 1)} disabled={ currentPage === 1 }>
            <i className="fa fa-angle-double-left" />
          </button>
        </li>
        { pages.map(page => {
              return (
                <li key={ page }>
                  <button className={currentPage === page ? "active" : ""} onClick={() => onPageChanged(page)}>{ page }</button>
                </li>
              )
          })
        }
        <li>
          <button className={"next" + (currentPage === pagesCount ? " disabled" : "")} onClick={() => onPageChanged(currentPage + 1)} disabled={ currentPage === pagesCount }>
            <i className="fa fa-angle-double-right" />
          </button>
        </li>
      </ul>
    </div>
  );
};

BlogPagination.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
}

export default BlogPagination;
