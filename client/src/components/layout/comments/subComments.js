import React from "react";
import { SubCommentItem } from "./subCommentItem";
import Container from "react-bootstrap/esm/Container";

export const SubComments = ({ subComments }) => {
  return (
    <div>
      {subComments.map((subComment) => (
        <SubCommentItem subComment={subComment} />
      ))}
    </div>
  );
};
