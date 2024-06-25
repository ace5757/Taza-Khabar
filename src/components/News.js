import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsComponent from './NewsComponent'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 1
    }
  }

  //this func runs after render method
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc5dc94768cb49398889bcda878f8d59&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
     })
  }

  handlePrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc5dc94768cb49398889bcda878f8d59&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
    })
  }
  handleNext = async () => {
    if (this.state.page + 1 > Math.ceil((this.state.totalResults) / this.props.pageSize)) {
    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc5dc94768cb49398889bcda878f8d59&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1
      })
    }
  }
  render() {
    return (
      <div className='container my-3' >
        <h1 className='text-center my-3'>Trending News</h1>
        <div className='row'>
          {this.state.articles?.map((element) => {
            return <div className='col-md-4 my-3' key={element.url}>
              <NewsComponent title={element.title ? element.title : "##"}
                descripton={element.description ? element.description : ".."}
                imageurl={element.urlToImage ? element.urlToImage : "https://articles-img.sftcdn.net/f_auto,t_article_cover_xl/auto-mapping-folder/sites/3/2023/07/Mision-Chandrayaan-3-1.jpg"}
                url={element.url ? element.url : "/"} author={element.author} date={element.publishedAt}
                source = {element.source.name}/>
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn my-4 btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil((this.state.totalResults) / this.props.pageSize)} type="button" className="btn my-4 btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News

