// src/components/NewsItem.js
import React from 'react';
import './NewsItem.css';

const NewsItem = ({ title, content, createdAt }) => {
  return (
    <li className="news-item">
      <h3>{title}</h3>
      <p>{content}</p>
      <span className="timestamp">{new Date(createdAt).toLocaleString()}</span>
    </li>
  );
};

export default NewsItem;
