import React from "react"
import {Link, graphql, useStaticQuery} from "gatsby";

import Head from '../components/head';
import Layout from "../components/templates/layout";
import blogStyles from '../components/component-styles/index.module.scss';

export default function Blog() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark (
        filter: {
          frontmatter: {published: {eq: true}}
        }
        sort: {
          fields: [frontmatter___date]
          order: DESC
        }
      ) {
        edges {
          node {
            frontmatter {
              title
              date
            }

            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return(
    <Layout page="Home">
      <Head title="Home" />
      <h4>All articles </h4>
      <hr />
      <ol className={blogStyles.list}>
        {data.allMarkdownRemark.edges.map(post => {
          return (
            <Link to={`/${post.node.fields.slug}`}>
              <li className={blogStyles.listItem}>
                <h3 className={blogStyles.title}>{post.node.frontmatter.title}</h3>
                <p className={blogStyles.date}>{post.node.frontmatter.date}</p> 
              </li>
            </Link>
            )
        })}
      </ol>
    </Layout>
  )
}
