---
title: "How to track custom KPIs with Google Analytics"
date: "2020-09-10"
tags: [API, Google Analytics, AJAX]
category: [internet]
published: true
---
> TL;DR: I sent the data through an AJAX request to an end point of google analytics. Sounds easy, but this isn't the conventional way to use Google Analytics. Follow [this article](/send-custom-events-to-google-analytics) for step-by-step instructions

## The task that I was trying to complete
I needed a away to get a analytics report for the number of users whose premium plan is active on a particular day. This would then become a company KPI for the product.

## First approach *TL;DR: Didn't Work*
We had all our customer data on firebase real time database. After some digging, I found that firebase too has an analytics dashboard called firebase analytics. There we could set custom user properties. These custom properties could then be used to make audiences that we wanted to monitor.

I decided to make a custom property called `isPremiunActive` for each user and run a scheduled firebase function everyday. This function would get all the premium users and set the `isPremiunActive` property on their profile as `true` if their plan had not yet expired, else it would set it to `false`.\
*Later we would automatically write the `isPremiunActive` property as `true` whenever the user buys a new plan. Then the function would only need to set the attribute to `false`*

#### Why this did not work?
The firebase SDK method `setUserProperty`, that was supposed to set the value of this custom user property, did not take any parameters like user ID or email or any such argument that could help us run the function or a particular user. 

After a few hours of reading the documentation and contacting firebase support, I realised that this method was only supposed to be used from within the app(*during a logged in session*), NOT from cloud functions. The user would be identified using the firebase authentication system that we had already setup for the client-side application.

>Firebase support, if you are reading this(*highly unlikely*), I was very happy that you responded to my queries very quickly and thoroughly. You helped me understand what the firebase analytics feature was actually meant for and how it is **not** what I was looking for.

## Second approach: *The one that worked*
I started searching for a way to raise custom events on Google analytics using some API endpoint. At first, the only API that I could find was the `Google Analytics Reporting V4`.
This API was pitched *everywhere* as a way to get analytics data by performing all sorts of complex queries (*thanks to the number of query parameters that it provides. THERE ARE A TON!*)
But since we can only get data, this API did not solve our problem. The only reason I even considered exploring it was because the only endpoint that it had, handled post requests (*Little did I know that `POST` does not always mean sending data to be stored somewhere you want*) 

At this point I had lost all hopes and decided that I would just store the data for each day on firebase (*In a somewhat ordered fashion for now*) and get the data from there. Later, we could send all this data to **Google Data Studio** to get a more graphical representation of the data.

#### Something good finally happened (*well maybe not good, but....*)
Our main company product is a web app which works along with a browser extension. While I was busy with this, we were at the point of releasing a new version of the browser extension. 
When we tried to publish the new extension on Firefox, the new version was not approved for some reasons. \
The **good** part was that they sent a thorough report of why they did not approve it and how to fix the problems. In the report there was a link pointing to an article titled [Using Google Analytics in extensions](https://blog.mozilla.org/addons/2016/05/31/using-google-analytics-in-extensions/)

**Following is an excerpt from that article**
*This blog post is meant to show the safer ways of using GA, not advocate its unrestricted use.

I created a branch of one of my add-ons to serve as a demo. The add-on is a WebExtension that injects a content script into some AMO pages to add links that are useful to admins and reviewers. The diff for the branch shouldn’t take much time to read and understand. It mostly comes down to this XHR:*
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

And then, I copied this whole thing into Firefox's console and *volla*; I got a successful **200 OK** Response. 

***But,***\
The event was not seen in google analytics. I thought that this might had been because google had applied some sort of filtering system for incoming request to avoid tracking *bogus requests* like these.
So, frustrated and tired after the day's effort I decided to sleep on it.

***But,***\
The next day, when I checked Google analytics **again** for the event (*with no hope whatsoever*) the event was there!!!

Finally!

So I implemented the changes in the firebase function and then tried to test it after deployment. It executed successfully and I got a proper response but again there was no such event in analytics.
Turns out that it takes time to track events sent directly from firebase functions. *Still don't know the reason for this delay*🤔 (_Why GOOGLE? **WHY?!!**_)

---

So, like every good story, I successfully committed the code and the program ran happily ever after.


## Links on the web that helped me get through this problem
1. [How to find `GA_CLIENT_ID`](https://www.owox.com/blog/use-cases/google-analytics-client-id/)
2. [StackOverflow question](https://stackoverflow.com/questions/63808048/add-custom-user-property-through-firebase-function) that I opened
3. [Docs](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#events) that were helpful
4. And of course, [***the lifesaver***](https://blog.mozilla.org/addons/2016/05/31/using-google-analytics-in-extensions/)
