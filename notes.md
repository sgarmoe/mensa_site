
USE THE LEAGUE LEGENDS PAGE AS A MODEL 

set up code to automatically update the MongoDB once per day to have current sleeper info

misc. thoughts to keep in mind for design

- use YT, next docs, react docs to get project moving
- helper functions need meticulate design
- many help fns (ex: leagueDrafts) use data produced by other functions (ex: drafts use current rosters)

TO DO BEFORE STARTING PROGRAM
1. Complete basic directory redesign
 - global info (???) under utils -> leagueInfo (and other files)
 - UNSURE what to do with api file (break up into components and put in appropriate place?)
 - come up with roadmap starting with call to API - >>>> rendering live data on web page
 - figure out where to put the index file 
 - header and footer 

 client 
 - do I need a static/global file? (images/misc needed by all pages)
2. Choose 5 pages (including home) to implement
    - rosters
    - trades and waivers
    - home (includes trades and waivers)
    - Records (all time & playoffs)
    - trophy room (summary of each year's results)

3. Design full-stacked implementation of ONE page, giving model for rest of pages

STRUCTURE OF FULL STACK

node vs next: 
https://medium.com/@sophiasmith791/nextjs-vs-nodejs-which-backend-framework-to-choose-in-2025-f1fa4f2df6cb
- next.js for backend (preferred over node due to site being a simple project from backend perspective) 
- react and next.js for front end


