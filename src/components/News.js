import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';
const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&page=1&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles || [])
    setTotalResults(parsedData.totalResults || 0)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    // If no more articles returned, consider we've reached the end
    if (parsedData.articles?.length === 0) {
      setTotalResults(articles.length);
      return;
    }
    setPage(page+1);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

  return (
    <>
      <h1 className="text-center" style={{margin: '90px 0 35px 0'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category || 'General')} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles?.length || 0}
        next={fetchMoreData}
        hasMore={(articles?.length || 0) < totalResults && (articles?.length || 0) > 0}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}>
            <b>Yay! You have seen all news articles</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {articles?.map((element, index) => {
              return (
                <div className="col-md-4" key={`${element.url}-${index}`}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://static.politico.com/61/09/f55f7be4457e85b3f62478e1a97f/deportation-error-abrego-garcia-74051.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt ? element.publishedAt : "Unknown"}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

    </>
  );
}

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: ''
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
  setProgress: PropTypes.func
}

export default News;
