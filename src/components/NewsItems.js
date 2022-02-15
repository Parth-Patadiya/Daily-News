import React from 'react';
import "./NewsItems.css";
import { Component } from 'react/cjs/react.production.min';

export default class NewsItems extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props;
    return (
      <>
        <div className="col-md-4 NewsItems">
          <div className="card" >
            <div style={{display:"flex", justifyContent:"flex-end", position:"absolute",right:0}}>
            <span className='badge rounded-pill bg-danger'>
              {source.name}
            </span>
            </div>
            <img src={imageUrl} className="card-img-top image" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}... 
              </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toGMTString()} </small></p>
              <a target="_blank" rel="noreferrer" href={newsUrl} className="btn btn-sm btn-primary ">Read More</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}
