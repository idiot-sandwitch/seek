import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/layout/navbar";
import { PostItem } from "./components/layout/post_item";
import { ResourcePosts } from "./components/pages/resourcePosts";

function App() {
  const posts = [
    {
      title: "New Post1",
      content: "AAAaaaaaa look what i found good resource",
      type: "video",
      authorId: "avijeet11",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      votes: 5,
      comments: ["aaaa aaaaa", "aaaaa"],
      editorChoice: true,
      code: "MAT0011",
      subject: "Machine Learning",
    },
    {
      title: "New Post2",
      content: "AAAaaaaaa look what i found good resource",
      type: "video",
      authorId: "avijeet11",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      votes: 5,
      comments: ["aaaa aaaaa", "aaaaa"],
      editorChoice: true,
      code: "MAT0011",
      subject: "Machine Learning",
    },
    {
      title: "New Post3",
      content: "AAAaaaaaa look what i found good resource",
      type: "video",
      authorId: "avijeet11",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      votes: 5,
      comments: ["aaaa aaaaa", "aaaaa"],
      editorChoice: true,
      code: "MAT0011",
      subject: "Machine Learning",
    },
    {
      title: "New Post4",
      content: "AAAaaaaaa look what i found good resource",
      type: "video",
      authorId: "avijeet11",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      votes: 5,
      comments: ["aaaa aaaaa", "aaaaa"],
      editorChoice: true,
      code: "MAT0011",
      subject: "Machine Learning",
    },
    {
      title: "New Post5",
      content: "AAAaaaaaa look what i found good resource",
      type: "video",
      authorId: "avijeet11",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      votes: 5,
      comments: ["aaaa aaaaa", "aaaaa"],
      editorChoice: true,
      code: "MAT0011",
      subject: "Machine Learning",
    },
    {
      title: "New Post6",
      content: "AAAaaaaaa look what i found good resource",
      type: "video",
      authorId: "avijeet11",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      votes: 5,
      comments: ["aaaa aaaaa", "aaaaa"],
      editorChoice: true,
      code: "MAT0011",
      subject: "Machine Learning",
    },
  ];

  return (
    <div className="App">
      <Header />
      <ResourcePosts posts={posts} />
    </div>
  );
}

export default App;
