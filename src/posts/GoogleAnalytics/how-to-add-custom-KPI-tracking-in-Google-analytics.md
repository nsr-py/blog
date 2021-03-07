---
title: "How to track custom KPIs with Google Analytics"
date: "2020-09-10"
tags: [API, Google Analytics, AJAX]
category: [internet]
published: true
---
> TL;DR: I sent data through an AJAX request to an end point of google analytics. Follow [this article](/send-custom-events-to-google-analytics) for step-by-step instructions

## The task that I was trying to complete
I needed a away to get a analytics report for the number of users whose premium plan is active on a particular day. This would then become a company KPI for the product.

## First approach *TL;DR: Didn't Work*
We had all our customer data on firebase real time database. After some digging, I found that firebase too has an analytics dashboard called firebase analytics and that we could set custom user properties. These custom properties could then be used to make audiences that we wanted to monitor.
The approach that I decided to take was that I could make a custom property called `isPremiunActive` for each and every user and run a scheduled firebase function everyday, that would traverse through all the premium users and set this property on their profile as `true` if their plan has not yet expired, else it would set it to false.
*Later we would change to function to only set things to false as we would set it to true when ever the user buys a new plan*

#### Why it did not work
The firebase SDK method `setUserProperty`, that was supposed to set the value of this custom user property, did not take any parameters like user ID or email or any such argument that could let us tell the function about the user we are targeting. After a few hours of reading the docs and contacting firebase support, I came to know that this method was only supposed to used within the app (*during a logged in session*) and the user was identified by the authentication details stored in the firebase SDK.

>Firebase support, if you are reading this(*highly unlikely*), I was very happy that you responded to my queries very quickly and thoroughly. They helped me understand what the firebase analytics feature was actually meant for and how it is not for my needs.

## Second approach *The title of the article. Let's answer the how*
I started searching for a way to raise custom events on Google analytics using some API in my firebase functions. At first, the only API that I could find was the `Google Analytics Reporting V4`.
This API was pitched everywhere as a way to get analytics data by performing all sorts of complex queries (*thanks to the number of query parameters that it provides. THERE ARE A TON!*)
But you might wonder that if you can only get data then this API does not solve our problem, and you are right. The only reason I even considered exploring it was because the only endpoint that it had handled post requests (*Little did I know that `POST` does not always mean sending data to be stored somewhere you want*) 

At this point I had lost all hopes and decided that I would just store the data for each day on firebase (*In a somewhat ordered fashion for now*) and get the data from there. Later, we could send all this data to **Google Data Studio** to get a more graphical understanding to the data.

#### Something good finally happened (*well maybe not good, but.... you'll see*)
Our main company product is a web app which, to work in the background and regular work-flow, also has a browser extension. During all this hassle we were at the point of releasing a new version of the app. 
While we were in the process of updating the extension for Firefox, the review report by Firefox did not approve the current version of the app for certain reasons. The good part was that they sent a thorough report of why they did not approve it and how to fix the problems. In the report there was a link pointing to an article titled [Using Google Analytics in extensions](https://blog.mozilla.org/addons/2016/05/31/using-google-analytics-in-extensions/)

**Following is an excerpt from the article**
>This blog post is meant to show the safer ways of using GA, not advocate its unrestricted use.

>I created a branch of one of my add-ons to serve as a demo. The add-on is a WebExtension that injects a content script into some AMO pages to add links that are useful to admins and reviewers. The diff for the branch shouldn’t take much time to read and understand. It mostly comes down to this XHR:
```
let request = new XMLHttpRequest();
let message =
  "v=1&tid=" + GA_TRACKING_ID + "&cid= " + GA_CLIENT_ID + "&aip=1" +
  "&ds=add-on&t=event&ec=AAA&ea=" + aType;

request.open("POST", "https://www.google-analytics.com/collect", true);
request.send(message);
```

I pasted the above script into a new file, and customized it to send function like this

```
let hitGA = () => {
  const GA_TRACKING_ID = "your GA tracking ID"
  const GA_CLIENT_ID = "steps to get this will be given in the resources below"

  const event = {
    category: "pricing",
    action: "counted",
    label: "num_active_users",
    value: 71
  }
  let request = new XMLHttpRequest();
  let message = 
  `v=1&tid=${GA_TRACKING_ID}&cid=${GA_CLIENT_ID}&aip=1&ds=add-on&t=event&ec=${event.category}&ea=${event.action}&el=${event.label}&ev=${event.value}`

  request.open("POST", "https://www.google-analytics.com/collect", true);
  request.send(message);

}
```

And then I copied this whole thing into Firefox's console and *volla* I got a successful **200 OK** Response. 

***But,***\
The event was not seen in firebase analytics. I thought that this might had been because firebase had applied some sort of filtering system for incoming request to avoid tracking *bogus requests* like this.
So, frustrated and tired after the day's effort I decided to sleep on it.

***But,***\
The next day, when I checked Google analytics for the event (*with no hope whatsoever*) the event was there!!!

Finally!

So I implemented the changes in the firebase function and then tried to test it after deployment. It executed successfully and I got a proper response but again there was no such event in analytics.
Turns out that it takes time to track events on firebase (_Why GOOGLE? **WHY?!!**_)

So, like every good story, I successfully committed the code and the program ran happily ever after.


## Links on the web that helped me get through this problem
1. [How to find `GA_CLIENT_ID`](https://www.owox.com/blog/use-cases/google-analytics-client-id/)
2. [StackOverflow question](https://stackoverflow.com/questions/63808048/add-custom-user-property-through-firebase-function) that I opened
3. [Docs](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#events) that were helpful
4. And of course, [***the lifesaver***](https://blog.mozilla.org/addons/2016/05/31/using-google-analytics-in-extensions/)
