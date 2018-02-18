import React from 'react'
import { Link } from 'react-router-dom'

export default class Post extends React.Component {
  render() {
    let title = this.props.post.title
    if (this.props.isDraft) {
      title = `${title} (Draft)`
    }

    return (
      <Link className="no-underline ma1" to={`/post/${this.props.post.id}`}>
        <article class="bb b--black-10">
        <a class="db pv4 ph3 ph0-l no-underline black dim" href="#0">
          <div class="flex flex-column flex-row-ns">
            <div class="w-100 w-60-ns pl3-ns">
              <h1 class="f3 fw1 baskerville mt0 lh-title">{ title }</h1>
              <p class="f6 f5-l lh-copy">
                {this.props.post.text}
              </p>
              <p class="f6 lh-copy mv0">By { this.props.post.author.name }</p>
            </div>
          </div>
        </a>
      </article>
      </Link>
    )
  }
}
