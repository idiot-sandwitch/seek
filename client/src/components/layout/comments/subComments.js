import React from "react";
import SubCommentBox from "./subCommentBox";
import { SubCommentItem } from "./subCommentItem";

import Row from "react-bootstrap/esm/Row";

export const SubComments = ({
  subComments,
  voteHandler,
  commentId,
  showBox,
}) => {
  return (
    <Row style={{ width: "100%" }}>
      {showBox ? <SubCommentBox commentId={commentId} />:<div></div>}
      {subComments.map((subComment) => (
        <SubCommentItem
          key={subComment._id}
          subComment={subComment}
          voteHandler={voteHandler}
        />
      ))}
    </Row>
  );
};
