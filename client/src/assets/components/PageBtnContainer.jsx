import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllPurchasesContext } from "../../pages/AllPurchases";

function PageBtnContainer() {
  const {
    data: { numOfPages, currentPage },
  } = useAllPurchasesContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const {search, pathname} = useLocation()
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  };
  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) {
            prevPage = numOfPages;
          }
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        ant.
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${
                pageNumber === currentPage && "active"
              }`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) {
            nextPage = 1;
          }
          handlePageChange(nextPage);
        }}
      >
        prox.
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}
export default PageBtnContainer;
