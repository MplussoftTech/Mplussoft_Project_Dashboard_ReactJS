const Pagination = ({
  currentPage,
  totalEntries,
  entriesPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  if (totalPages <= 1) return null;

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);

    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) end = Math.min(visiblePages, totalPages);
    if (currentPage + halfVisible > totalPages)
      start = Math.max(1, totalPages - visiblePages + 1);

    if (start > 1) {
      pageNumbers.push(
        <button
          key={1}
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (start > 2) pageNumbers.push(<span key="start-ellipsis">...</span>);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`btn btn-sm mx-1 ${
            i === currentPage ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1)
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      pageNumbers.push(
        <button
          key={totalPages}
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
      <span>
        Showing {startEntry} to {endEntry} of {totalEntries} entries
      </span>

      <div className="d-flex align-items-center gap-1 flex-wrap">
        {currentPage > 1 && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}

        {generatePageNumbers()}

        {currentPage < totalPages && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
