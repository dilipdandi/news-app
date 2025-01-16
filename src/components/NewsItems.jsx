import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class NewsItems extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
        <div className='my-3'>
        <div className="card">
        <img src={!imageUrl ? "https://img.freepik.com/free-vector/breaking-news-illustration-with-fresh-information-tablet-screen-tv-anchor-newspaper-radio-receiver-round-symbols_98292-7775.jpg?t=st=1736778840~exp=1736782440~hmac=1328e7ebea13344dc9e4c3aebe84999526634483319e3df3965b40e6e39983e9&w=740" : imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <Link rel="noreferrer" to={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</Link>
        </div>
      </div>
    </div>
    )
  }
}

export default NewsItems
