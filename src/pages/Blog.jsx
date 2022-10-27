import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { firestore } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Blog() {
  // state
  const [blogData, setBlogData] = useState([]);

  // function get collection data dari firebase
  const getBlogDataCollection = async () => {
    let result = [];
    let blogColRef = collection(firestore, "blogs");
    await getDocs(blogColRef)
      .then((res) => {
        res.forEach((e) => {
          result.push(e.data());
        });
      })
      .catch((err) => {
        console.error(err);
      });

    return result;
  };

  // component lifecycle
  useEffect(() => {
    getBlogDataCollection()
      .then((res) => {
        console.log(res);
        setBlogData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Blog Page</title>
        <meta name="title" content="halaman blog" />
        <meta name="description" content="halaman blog" />
      </Helmet>

      <h1>Blog Page</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        {blogData.map((item) => (
          <div key={item.id}>
            <h3> {item.title} </h3>
            <img src={item.banner} alt={item.title} />
            <p> {item.description} </p>
            <small>
              {item.author} | {Date(item.createdAt).toString()}
            </small>
            <div>
              <Link to={`/blog/detail/${item.id}`}>Selengkapnya...</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
