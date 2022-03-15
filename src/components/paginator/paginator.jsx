import React, { useEffect, useState } from "react";

const Paginator = ({ pageLimit, totalRecords, pageNeighbours, currentPage, setCurrentPage }) => {

    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';
    const [pages, setPages] = useState([]);
    const [_pageLimit, setPageLimit] = useState(12);
    const [_totalRecords, setTotalRecords] = useState(0);
    const [_pageNeighbours, setPageNeighbours] = useState(0);
    const [_totalPages, setTotalPages] = useState(0);

    useEffect(() => init(), []);
    useEffect(() => init(), [_totalRecords, _pageLimit, _pageNeighbours]);

    // useEffect(() => {
    //     if (isDefined(setCurrentPage)) {
    //     var newCurrentPage = Math.max(1, Math.min(currentPage, _totalPages));
    //     setCurrentPage(newCurrentPage);
    //     }
    // }, [_totalPages, _pageLimit]);

    useEffect(() => {
        const newPages = fetchPageNumbers();
        setPages(newPages);
    }, [_totalPages, _pageNeighbours, currentPage]);

    const init = () => {
        const newTotalRecords = totalRecords === void 0 ? null : (typeof totalRecords === 'number' ? totalRecords : 0);
        const newPageLimit = pageLimit === void 0 ? 12 : (typeof pageLimit === 'number' ? pageLimit : 12);
        const newPageNeighbours = pageNeighbours === void 0 ? 0 : (typeof pageNeighbours === 'number' ? Math.max(0, Math.min(pageNeighbours, 2)) : 0);
        const newTotalPages = Math.ceil(newTotalRecords / newPageLimit);
        setTotalRecords(newTotalRecords);
        setPageLimit(newPageLimit);
        setPageNeighbours(newPageNeighbours);
        setTotalPages(newTotalPages);
    };

    const gotoPage = page => {
        var newCurrentPage = Math.max(1, Math.min(page, _totalPages));
        setCurrentPage(newCurrentPage);
    };

    const handleMoveLeft = e => gotoPage(currentPage - _pageNeighbours * 2 - 1);

    const handleMoveRight = e => gotoPage(currentPage + _pageNeighbours * 2 + 1);

    const handleClick = (e, page) => gotoPage(page);

    const fetchPageNumbers = () => {
        const totalNumbers = _pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (_totalPages > totalBlocks) {
            let _pages = [];
            const leftBound = currentPage -_pageNeighbours;
            const rightBound = currentPage + _pageNeighbours;
            const beforeLastPage = _totalPages - 1;
            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
            _pages = range(startPage, endPage);
            const pagesCount = _pages.length;
            const singleSpillOffset = totalNumbers - pagesCount - 1;
            const leftSpill = startPage > 2;
            const rightSpill = endPage < beforeLastPage;
            const leftSpillPage = LEFT_PAGE;
            const rightSpillPage = RIGHT_PAGE;

            if (leftSpill && !rightSpill) {
                const extraPages = range(startPage - singleSpillOffset, startPage - 1);
                _pages = [leftSpillPage].concat(_toConsumableArray(extraPages), _toConsumableArray(_pages));
              } else if (!leftSpill && rightSpill) {
                const _extraPages = range(endPage + 1, endPage + singleSpillOffset);
        
                _pages = [].concat(_toConsumableArray(_pages), _toConsumableArray(_extraPages), [rightSpillPage]);
              } else if (leftSpill && rightSpill) {
                _pages = [leftSpillPage].concat(_toConsumableArray(_pages), [rightSpillPage]);
              }
        
              return [1].concat(_toConsumableArray(_pages), [_totalPages]);
            }
            return range(1, _totalPages);
    };

    const _toConsumableArray = arr => {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    };

    const _arrayWithoutHoles = arr => {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
          return arr2;
        }
    };

    const _iterableToArray = iter => {
        return Array.from(iter);
    };

    const _nonIterableSpread = () => {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
    };

    const range = (from, to) => {
        var step = 1;
        var i = from;
        var pool = [];
      
        while (i <= to) {
          pool.push(i);
          i += step;
        }
        return pool;
      };

    return (
        <ul className="mb-0 mt-0">
            {   pages.map((page, index) => {
                    return (
                        <li key={ index }>
                            <button 
                                onClick={ e => page === LEFT_PAGE ? handleMoveLeft(e) : page === RIGHT_PAGE ? handleMoveRight(e) : handleClick(e, page) } 
                                className={ page === LEFT_PAGE || page === RIGHT_PAGE ? 'page-link' : 'page-item '.concat(currentPage === page ? 'active' : '')}
                            >
                                { page }
                            </button>
                        </li>
                    );
                }) 
            }
        </ul>
    );
  }

  export default Paginator;