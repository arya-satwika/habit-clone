# HABIT KIT CLONE
## Backend
1. store blocks that are checked only
2. load 70ish blocks
3. render 7 blocks at a time
4. when page loads -> get the current date, render every block from first init to yesterday with each loop
5. block will be uploaded every 10 mins? 
6. have a users table with id
7. have a routines table that connects to user table via id
8. have a checked blocks table corresponding to the id of routine data
## Frontend (this shit done)
1. each row indicates a day (row 1 = monday ...)
2. render every block except the today block in a each loop
3. render the today block outside loop for easy manipulation
4. make dark mode

## **TO-DOS**
[X] how to get the date for block that are not stored i.e unchecked blocks

[X] make a schema and findout how to query

[X] figure out how to store to db

[ ] make the add routine menu preetier

[ ] make a delete button for routines

[ ] have icons and color options for routines

[ ] make the filled in blocks be dynamic according to size of container

[X] figure out how to store shit in cookies

[X] figure out how to get the user's cookies

[X] how to identify who is who with just cookies

[X] how to extract the day from the date and put it in a corresponding row

[X] how to store the data?? DB