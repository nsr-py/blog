---
title: "Facing the Dangling pointer problem"
date: "27/9/2020"
tags: [programming, function arguments, variables]
category: [internet]
published: true
---

> This problem helped me better understand variable referencing 
---

## Problem
Let's first look at the code to understand where I saw the problem.
For some context here is the part of the code and just to make it more clear, the `endSession` function is arbitrarily called, which then calls the `batchData` function, which; if condition satisfies; calls the `sendData` function.

```
let batch = [];

const sendData = (batch, batchTime) => {

  // Sending Data
  const data = {
    batch: batch,
    batchTime: batchTime
  }
  const url = "SERVER_ENDPOINT";
  fetch(url , { 
    method: "POST", 
    body: JSON.stringify(data), 
    headers: { 
        "Content-type": "application/json"
    } 
  })
  
  // emptying the batch
  batch = []
  console.log("Batch after sending data", batch)
  
}

const batchData = (data) => {
  if ( /* Checking condition as to whether or not to send data*/ ){
    sendData(batch, Date.now());
  }
  batch(data)
  console.log("Batch after batching", batch)
}

const endSession = (user, data, currentTime) => {
  tracking[user].data = data;
  trackingData[tabid].currentTime = currentTime;
  batchData({ userData: tracking[user] });
}
```

The people who are actual programmers can see the problem quite easily but beginners like me might still be in the blind.

The problem was that whenever the condition in the `batchData` function was met, the data in the`batch` array would be sent to the server by executing the `sendData` function and now the `batch` array; which I expected to become empty with the `batch = []`; did not become empty. 

This lead to **data from previous batches also being sent to the server.**

## Technical behaviour

To understand this, we have to revise a few things:
1. A variable is **a reference to a memory location**. 
2. There are two ways to pass varibables to a function, `call by reference` and `call by value`; and **arrays are passed as arguments to functions thorough call by reference**

The problem is only in the part where I call the `sendData` function.\
Throughout the code, `batch` array has been referenced as a _global variable_ but when I called the `sendData` function, I passed it as an argument.\
This created another reference to that memory location inside the `sendData` function.(_think of it as another pointer_) \
Thus, the line `batch = []`, does not change the content of the global `batch` array. Instead, it assigns a new memory location with an empty array value to the newly made `batch` reference that is inside the `sendData` function.

> This problem is called the [**Dangling pointer** problem](https://developerinsider.co/what-is-dangling-pointer-with-cause-and-how-to-avoid-it/)

## Solution
Just didn't send the variable as an argument to the function and referenced it directly as a global object.\
(_now that I look at it, maybe this confusion was all because of improper variable naming_)

---
