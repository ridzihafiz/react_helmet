import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebaseConfig";

export default function Detail() {
  const { id } = useParams();

  // state
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    banner: "",
    body: "",
    author: "",
    createdAt: "",
  });

  // get single document from firestore
  const getSingleBlog = () => {
    let docRef = doc(firestore, "blogs/" + id);
    getDoc(docRef)
      .then((res) => {
        console.log(res.data());
        setBlog(res.data());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // component lifecycle
  useEffect(() => {
    getSingleBlog();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title> {blog.title} </title>
        <meta name="title" content={blog.title} />
        <meta name="description" content={blog.description} />
      </Helmet>

      <small> {blog.author} </small>
      <img src={blog.banner} alt={blog.title} />

      <hr />
      <p> {blog.body} </p>
      <hr />

      <small> {Date(blog.createdAt).toString()} </small>

      {/* <h1>Detail Blog id : {id} </h1> */}
    </div>
  );
}
