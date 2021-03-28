import React from "react";
import { SubCommentItem } from "./subCommentItem";

export const SubComments = ({ subComments }) => {
  return (
    <div>
      {subComments.map((subComment) => (
        <SubCommentItem key={subComment._id} subComment={subComment} />
      ))}
    </div>
  );
};
