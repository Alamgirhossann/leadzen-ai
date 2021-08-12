import React, { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  console.log("in pagination.jsx");

  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pagePrev = () => {
    paginate(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };

  const pageNext = () => {
    paginate(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  return (
    <nav>
      <ul className="pagination">
        {currentPage === 1 ? (
          <div className="mr-2 mt-1">{"<"}</div>
        ) : (
          <li className="page-item">
            <a onClick={pagePrev} className="page-link">
              {"<"}
            </a>
          </li>
        )}

        {pageNumbers.map((number) => (
          <>
            <li
              key={number}
              className={
                (currentPage === number ? "active" : "") + " page-item"
              }
              onClick={() => setCurrentPage(number)}
            >
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          </>
        ))}
        {pageNumbers.length === currentPage ? (
          <div className="ml-2 mt-1">{">"}</div>
        ) : (
          <li className="page-item">
            <a onClick={pageNext} className="page-link">
              {">"}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
