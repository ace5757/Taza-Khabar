import React, { Component } from 'react'

export class NewsComponent extends Component {
    render() {
        let { title, descripton, imageurl, url, author, date, source } = this.props;
        return (
            <div>
                <div className="card">
                    <img src={imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                        style={{left:'80%', zIndex:'1'}}>
                            {source}
                        </span></h5>
                        <p className="card-text">{descripton}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={url} target='_blank' className="btn btn-sm btn-secondary">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsComponent
