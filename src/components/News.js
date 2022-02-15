import React from 'react'
import { Component } from 'react/cjs/react.production.min';
import Loading from './Loading';
import "./News.css";
import NewsItems from './NewsItems';
import PropTypes from 'prop-types'

export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 15,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      country: 'in'
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}`;
  }

  capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fce9eaae7e7a4e92982f3eebeed5f4ef&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(20);
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalArticals: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  previousHandler = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  nextHandler = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  render() {
    return (
      <div className="container">
        <h2  style={{ textAlign: "center" }}>Daily News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Loading />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((e) => {
            return <NewsItems key={e.url} title={e.title ? e.title.slice(0, 40) : " "}
              description={e.description ? e.description.slice(0, 60) : " "}
              imageUrl={e.urlToImage ? e.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"}
              newsUrl={e.url}
              author={e.author ? e.author : "Unknown"}
              publishedAt={e.publishedAt}
              source={e.source}
            />
          })}

        </div>
        <div className="container d-flex justify-content-around" style={{ marginBottom: "60px" }}>
          <button disabled={this.state.page <= 1} className="page-link link" onClick={this.previousHandler}>Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticals / `${this.props.pageSize}`)} className="page-link link" onClick={this.nextHandler}>Next</button>
        </div>
      </div>
    )
  }
}
