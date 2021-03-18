import React from "react"
import {Link} from "gatsby";

import Head from '../components/head';
import Layout from "../components/templates/layout";
import aboutStyles from '../components/component-styles/about.module.scss';
export default function Home() {
  return(
    <Layout page="about">
      <Head title="About"/>
      <h3>Hey</h3>
      <p>I am Navdeep Singh Rathore, currently a web developer at <Link to="https://requestly.io" target="_blank" className={aboutStyles.link}>Requestly</Link></p>
      <p>I am always interested in understanding how stuff around us works, especially the software side of things. The internet is my temple of solitude and this blog is an attempt to build my own space away from the chaotic mess of ads and popups. This is where I share what I learn. Hopefully, you find some of it useful.</p>
      
      <p>I would be happy to have a geeky conversation. Ping me on twitter at <Link to="https://twitter.com/nsrCodes" target="_blank" className={aboutStyles.link}>@nsrCodes.</Link> You can also find some fun and stupid projects that I made on github at <Link to="https://github.com/nsrCodes" target="_blank" className={aboutStyles.link}>@nsrCodes.</Link></p>
      {/* <p>If you like what you found here, you can signup to my newsletter where I send emails about new posts as well as interesting things that I find on the internet. If you are a geek like me, you will definitely find these emails a delight. <Link to="https://tinyletter.com/nsrCodes" target="_blank" className={aboutStyles.link}>Subscribe</Link> to be a part of my email list</p> */}
      <p>If you like what you found here, you can signup to my weekly newsletter where I share everything that I find interesting on the internet. If you are a geek like me, you will definitely find these emails a delight. <Link to="https://www.getrevue.co/profile/nsrCodes" target="_blank" className={aboutStyles.link}>Subscribe</Link> to be a part of my email list.</p>
    </Layout>
  )
}
