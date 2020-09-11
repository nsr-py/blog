const path = require('path')

module.exports.onCreateNode =({node, actions}) => {
  const { createNodeField } = actions
  if( node.internal.type === 'MarkdownRemark' ) {
    const slug = path.basename(node.fileAbsolutePath, '.md')
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })  
  }
}

module.exports.createPages = async ({graphql, actions}) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/components/templates/blogPost.js`)

  const response = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  response.data.allMarkdownRemark.edges.forEach( edge => {
    createPage({
      path: `/${edge.node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        slug: `${edge.node.fields.slug}`
      }
    })

  })

}