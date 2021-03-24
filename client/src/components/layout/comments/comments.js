import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Comment_item } from "./comment_item";

export const Comments = () => {
  //TODO:Make state for commnents, load comments when opening individual post
  const mycomments = [
    {
      authorId: 12324,
      postId: 23123,
      content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address what happened.`,
      votes: 32,
      subComments: [
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 223321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 23211,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
      ],
    },
    {
      authorId: 12354,
      postId: 23123,
      content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address what happened.`,
      votes: 32,
      subComments: [
        {
          authorId: 23281,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
      ],
    },
    {
      authorId: 12364,
      postId: 23123,
      content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address what happened.`,
      votes: 32,
      subComments: [
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
      ],
    },
    {
      authorId: 12384,
      postId: 23123,
      content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address what happened.`,
      votes: 32,
      subComments: [
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
      ],
    },
    {
      authorId: 12345,
      postId: 23123,
      content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address what happened.`,
      votes: 32,
      subComments: [
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
        {
          authorId: 2321,
          replyToId: 32312,
          content: ` I had no idea when I would be ready to write this. Part of me
            thought it would be early on, when I was still really feeling the
            pain of what happened. I thought I would sit in the corner of my
            bedroom with the lights dimmed, just rolling off my thoughts. I’d
            have a glass of red wine, cozy up with a blanket, and finally get
            the chance to address “what happened”.`,
          votes: 69,
        },
      ],
    },
  ];

  return (
      <Container className="seekCommentBox">
        {" "}
        {mycomments.map((comment) => (
          <Comment_item key={comment.authorId} comment={comment} />
        ))}
      </Container>
  );
};
