# Level Up

Let's level up some skills!

Level Up is aimed at improving the interaction between those who aim to pass on knowledge and those needing the
knowledge through the use of our live class sessions.

- ### [Level Up](https://level-up-v2-eight.vercel.app/)

## Resources

- #### [Demo Video](https://youtu.be/L0agAS5J0rg)

## What it does

It enables Teachers/people who wish to share some form of knowledge to create a class, which is just a video call room created with huddle where only the host (teacher in this case) can display his video and pass across whatever it is they wish to share.
There is also the option of rooms that are only accesible to people with some certain token which can be an NFT. The usecase for this is communities e.g. a school being able to give their members a token that identifies them as a member and then uploading their content on our platform so only their members can view them.

## Inspiration

I'm a self taught developer, or lets say aspiring to be one and i know how much of my knowledge i owe to those
who share knowledge. This project aims to improve that interaction between those who share knowledge and people
like me who need that knowledge.

## How I built it

- Huddlle is the pillar of my site. Making use of their sdk and api's i was able to create a live video call room from scratch. Their events mmade performing interactions and reacting to situations a breeze.
- I built the Frontend using Next.js, and For smart contract integration I used ethers.js.
- I used firebase for the database and lighthouse for storing data and generating a URL for uploaded files to save with the NFT.
- redux helped me control the state of my app.
- I also used several different libraries like moment.js, react-spring, react date-time, react-loader

## Challenges I ran into

At the beginning I found it very hard to get started due to a lack of a design to follow and working on this myself.
I had to make considerations on the database schema and how best to store files while ensuring security and making retrieving data easier.
getting started with huddle was a bit tough for me at the start as it seems i was working with an older version all along but this was quickly resolved thanks to the readily avalible mentors on huddle's discord server.

## What I learned

This was a solo project and I had to work on everything myself, I learnt so much about design, the right places to get inspiration from and even a thing or two about the basics of UI design with Figma.
This was my first video app so i really learnt about managing media on the frontend thank to this hackathon. I feel like i now have a solid grasp on the usage of the huddle sdk.

## What's next for Level Up

There are major updates coming up for Prime Books, There will be a lot of UI changes as i'm not so confident of my artistic eye so will be bringing in an actual UI/UX designer.
I also aim to improve the general experience and add features that may greatly increase the comfort of the users.
