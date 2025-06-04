
USE THE LEAGUE LEGENDS PAGE AS A MODEL 

misc. thoughts to keep in mind for design

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
- node js for backend (not express this time)
- react and next.js for front end


