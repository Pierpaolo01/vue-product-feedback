# Product feedback app

This application is a forumn for users to post feedback / request features / warn of existing bugs.

Here is a live link to view the project live - [live-project](http://www.product-feedback.xyz)
Here you can view the original Figma design file - [View-files](https://www.figma.com/file/cy4IKjAszW5IJaeLMbx0Z4/product-feedback-app?node-id=0%3A1)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- **Bonus**: Keep track of any changes, even after refreshing the browser (I used Firebase Cloud DB)

### Screenshot

![](./preview.jpg)

## My process

### Built with

- [VueJs 3](https://vuejs.org/) - JS library
- [Router](https://router.vuejs.org/) - Routing for Vue
- [VueX](https://vuex.vuejs.org/) - For Statemanagement
- [VueX](https://firebase.com) - Backend
- Mobile-first workflow
- CSS Grid
- Flexbox
- Semantic HTML5 markup

### What I learned

This is my favourite project because it best encompases a full stack application which might be served to the public. It uses the full VueJS stack (Vuex & Router) and the Firebase Cloud DB for data storage. The biggest thing I learned on this project was working indepently and handeling everything from skracht.

A challenge I faced when dealing the profile pictures in the comments sections taught me alot about WebPack and how it compiles the code from a framework to a browser readable JS. 

Here is some code I'm proud of:

With this CSS snippet I used Grid View to position the content within the main feedback-item component, which made it significantly more simple to style when dealing with responsivenes as flexbox was more difficult to negotiate in this instance.

```css
.router-link {
  ... display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "heading heading"
    "description description"
    "category ."
    "upvotes comments";
  ....
}

@media screen and (min-width: 700px) {
  .feedback-container {
    grid-template-columns: 4rem auto 2.5rem;
    grid-template-areas:
      "upvotes heading comments"
      "upvotes description comments"
      ". category comments";
  }
}
```
I'm also quite happy how I handled the C.R.U.D (create, read, update, delete) requests to firebase, but it feels a little clunky using the fetch function in JS so in the future I will look to implement client like AXIOS to handle the HTTP requests.

### Continued development

Considering this application is a online forum it only makes sense for there to be a user authentication functionality, therefore that will be my main goal to further develop a log in system, Firebase already supports user authentication so I'm really excited to dive into it!

## Author

- Website - [My portfolio website](http://www.pierpaolo-portfolio.xyz)