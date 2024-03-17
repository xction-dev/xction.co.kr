//Pagination 사용법을 안내한 Sample Page입니다.
//사용법은 Props의 index 등에 따라 조금씩 달라질 수 있습니다.
// import React, { useState } from "react";
// import Comment from './Comment';  // Import your component
// import Pagination from './Pagination';  // Import pagination

const CommentList = () =>
  // { comments }
  {
    return null;
    // const [currentPage, setCurrentPage] = useState(1);  //paginate
    // const itemsPerPage = 5;  // 한 페이지에 몇 개나 들어갈지

    // const indexOfLastComment = currentPage * itemsPerPage;
    // const indexOfFirstComment = indexOfLastComment - itemsPerPage;
    // const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // return (
    //   <div>
    //     {currentComments.map((comment) => (
    //       <Comment key={comment.id} text={comment.text} />
    //     ))}
    //     <Pagination
    //       itemsPerPage={itemsPerPage}
    //       totalItems={comments.length}
    //       currentPage={currentPage}
    //       paginate={paginate}
    //     />
    //   </div>
    // );
  };

export default CommentList;
