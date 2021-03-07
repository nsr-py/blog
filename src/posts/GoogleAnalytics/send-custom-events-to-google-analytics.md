---
title: "Send custom events to Google Analytics using AJAX"
date: "2020-09-11"
tags: [Google Analytics, AJAX]
category: [web-dev]
published: true
---
***This information is for educational purposes only.***

This method is used by browser add-ons to track user events as they are not allowed to have third party scripts in their source code.

The code for doing so is follows:

```
let hitGA = () => {
  const GA_TRACKING_ID = "your GA tracking ID"
  const GA_CLIENT_ID = "A valid Client Id to which the event will be associated"

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

*Now let's understand what this is doing.*

We see that in the second last line we are sending a `POST` request to the endpoint `google-analytics.com/collect`.

The most important thing here is the `message` and the object `event`

`event` specifies the event you want to track in analytics. If you read the [official documentation](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#events)  you will see that every event requires a `category` and `action`, the `label` and `value` are optional 

`message` is the actual  data that send to the endpoint.
<!--  -->
Here, `message` consists of many attributes. A few important ones are:
1. `tid`  is analytics tracking Id You can get the `GA_TRACKING_ID` from your google analytics admin settings panel.

2. `cid` is the customer id. This is used to recognize the user to whom the event is associated. For testing purposes, to get a valid `cid` follow the steps given in [this article](https://www.owox.com/blog/use-cases/google-analytics-client-id/)

3. All the attributes starting with *e* are used to define the event. We pass its values from the object that we created.

>**Note**: *The event value, though optional, must be an integer. everything else can be a string*

To test this you can copy the above code to your browser's console.

This should probably give a `200 OK` Response but you might still not be able to see the event in google analytics. This is because analytics takes considerable time to show tracked events.

Also, if you want to execute this in a `Node` environment you will have to install `XMLHttpRequest` module. This is because `XMLHttpRequest` is a built-in object in web browsers. You can do so with 
```
npm install xmlhttprequest
```
And there you go!

>This does point out that anyone with your `GA_TRACKING_ID` can raise _bogus events_ and spoil your analytics.
>
>But, as I said, *this article is for educational purposes only.*

---

If you are curious, check out [how I was able to learn about this](/how-to-add-custom-KPI-tracking-in-Google-analytics). 