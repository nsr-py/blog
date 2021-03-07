---
title: "What are Cookies?"
date: "2020-09-16"
tags: [cookies, chrome, firefox]
category: [internet]
published: true
---
We all have heard about cookies on the internet. Who can forget those annoying pop-ups from websites saying "_We use cookies. Agree to continue_"?!\
But today, let's actually understand what cookies are and how they work to be better aware of its threats and usecases.

**Cookie** is just some small information that sits in your browser and is sent along with every request that you send to a particular domain.
The **domain** is that of the site where the cookie was made. 

So let's say you were to go to twitter.com and twitter stores a cookie specific to you on your browser. 
>That cookie is sent along with every request that you send to twitter.com from there on. 

Hence, if you were to now visit this blog, the cookie from twitter.com will not be sent in the requests to access the content of this blog (_there is an exception to this that we will cover as well_).

## Types of cookies
Understanding the different types of cookies will help us understand what cookies are actually used for.

There are many basis for classification of cookies, most common of those are based on _lifetime_ of the cookie and the _type of requests_ that the cookies are attached to. 

####1. Session Cookies

These are cookies that expire once the browser is closed. This is made to keep track of your current session on a particular website.\
Such cookies are used to implement the shopping cart feature in most e-commerce websites.

####2. Persistent Cookies

These cookies have a lifetime of days or even weeks. Ever wondered how the **Remember me** option that you _check_ while logging in works? It is done using such cookies. \
They sometimes contain sensitive informaation about the user.

####3. Third Party Cookies

These cookies are sent during third party requests to the cookie domain. \
These are the cookies that advertising companies use to understand which ads do you click on, what sites you visit and accordingly serve ads that are tailored to your needs

>There are other classifications of cookies as well like based on _origin_, _scope_, etc. 
>In the previous decade, many big software companies were up for [trial](https://www.wired.com/2010/07/zombie-cookies-lawsuit/) for using [_zombie cookies_](https://www.youtube.com/watch?v=lq6ZimHh-j4)

 

## What is the problem?

Let's first address the less concerning problem before we look at the big discussion. 

#### Cookies add to bandwidth
The cookie associated to a partiular site is sent with every request to that site. And with reports suggesting some companies even track around 300 cookies per user, users with low bandwidth might face some problems. 

#### Cookies track you even when you are not on the site.

Earlier we mentioned that cookies are sent to a particular domain and only along with requests to that domain. I hope this tickles your curiosity to ask, "_What happens if I am on another domain but still send a request to the domain of the cookie in the background?_". This is how **cookie stitching** takes place.

Let's go back to the twitter example again. 
Let's say that on my blog I add a section that shows my recent tweets. In that case, I am requesting data from twitter in the background to get my recent tweets. The fun part is, when this request for data is made to twitter, your cookies might also be sent along with it, _although you never visited twitter_ while using this blog.

This is how advertising companies like **Google Ads** track you. The advertising platform (be it a blog, news article, etc. ) might not be a part of google's domain, _but_, since the site is requesting data for the advertisement to be shown on the site from the google servers, your google cookies are sent along with that request which lets google know that you have visited that site. 

>Maybe that's why people say. **Google is EVERYWHERE**

---

## Luckily, Google isn't all bad
The recent updates in browsers like chrome and firefox to add the `same-site` attribute to all cookies and restricting most third-party cookie access by default has made it easier to recognise which companies are tracking you and how.\
_If you are curious to read more about this, do read the article about [same site property](/what-is-same-site-attribute) to get updated about the recent changes_