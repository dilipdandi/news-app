import React, { Component } from 'react';
import NewsItems from './NewsItems.jsx';
import { Spinner } from './Spinner.js';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(){
    super();
    this.state = {
    articles: [],
    loading: false,
    page: 1
      }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0bb6c6f6c441482d9b4c8b33a24c4c19&page=1&pagesize=${this.props.pageSize}`
    this.setState({loading:true})
    let data =  await fetch(url)
    let parasedData = await data.json()
    this.setState({articles: parasedData.articles, 
      totalResults: parasedData.totalResults,
      loading:false
    })

  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0bb6c6f6c441482d9b4c8b33a24c4c19&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
    this.setState({loading:true})
    let data =  await fetch(url)
    let parasedData = await data.json()
    this.setState({
      page: this.state.page - 1,
      articles: parasedData.articles,
      loading:false 
    })
  }

  
  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0bb6c6f6c441482d9b4c8b33a24c4c19&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
    this.setState({loading:true})
    let data =  await fetch(url)
    let parasedData = await data.json()
    this.setState({
      page: this.state.page + 1,
      articles: parasedData.articles,
      loading:false
    }) 
  }
}

  render() {
    return (
    <div className='container my-3'>
        <h1 className='heading-1'><strong>News Wave</strong></h1>
        <h1 className='heading-2'><strong>Top Headlines</strong></h1>
        {this.state.loading && <Spinner/>}
       <div className='row mt-4'>
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
              <NewsItems title={element.title ? element.title : " "} 
              description={element.description ? element.description : " "}
               imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
          })}
         <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
         </div>
      </div>
    </div>
    )
  }
}
export default News
