# Combining XHR and Promises

## Learning Goals

- Combine what we've learned about XHR and `Promise`s
- Create our own approximation of `fetch()`

## Introduction

We've now seen how XHR can be used to retrieve remote data. We've also seen how
`fetch()` can provide a simpler API for handling this process. Ultimately,
though, underneath, `fetch()` is just XHR wrapped in a `Promise`!

To prove it, in this lab, we're going to build our own version of `fetch()`!

## Instructions

In `index.js`, write a function `myFetch()` that takes does the following:

- takes in a URL
- returns a `Promise`

Inside this function, write the necessary XHR code to handle retrieving data
with the provided URL. If the request is successful, use `resolve()`, passing
in the resulting response text. If unsuccessful, use `reject()`, passing in
the _status_ text.

Run `learn` to see your progress.

## Conclusion

If you've passed all the tests, you've just built your own version of `fetch()`!
Now, you may find yourself relying on `fetch()` a lot when developing, and that
is perfectly fine. It is an easy and concise way to get data we want. However,
you're not limited to using it alone. Behind the scenes, `fetch()` is simply
XHR wrapped in a Promise.
