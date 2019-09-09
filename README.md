 # Quiz Web app 
Quiz web app  - Google Sheets grid data source  

Google forms can be inflexime at times, with this script you can setup a multiple choice quiz with a countdown per question, the scrip sends an email with the score and also shows the score on the screen. 

## Easily create multiple choice quiz using a grid of questions in a google sheet. 

1. All you need is to make sure you set the questions on column A,
2. The multiple answers can be set from column B through anything you need but 3 would be ok (Recommneded to keep this short e.g 3 - 4 options maximum)
3. The right answer Must be specified right after the last optoin given e.g From B to D the right answer is in column C, you will write C on column E which is the following column, you do not need to outlin the row number
4. Setup a Results sheet and in Row 1 type Question1, Question2... Question10, you must match the number of questions in order to get the onsubmit even push the data properly and set the values on the Results sheet. 

[Click here to access the quiz google sheet example ](https://docs.google.com/spreadsheets/d/1MYjVNUJ0rDmaWYm4IFyEyrcqHLPycnLFat2S1QkIyLQ/edit#gid=0)
[Click here to access the Quiz web app](https://script.google.com/macros/s/AKfycbxyK53xcE9p4uesOTIKCeFs1fC2FBe1RgjlTIP35xghDi1ZaFY/exec)

The quiz has a countdown per Question and it also records using local storage how many times you have taken the quiz, and the first anwsers you selected so upon submitting the first attempt is submitted. 


## This script must be deployed as Web app 

### To publish a script as a web app, follow these steps:

1. Save a new version of the script by selecting File > Manage Versions, then Save New Version.
2. Select Publish > Deploy as web app.
3. Under Project version, select the version you just saved.
4. Under Execute the app as, select whose authorization the app should run with: your account (the developer's) or the account of the user who visits the app (see permissions).
5. Under Who has access to the app, select who should be allowed to visit it. The options differ depending on the type of account you have, but they can include "Only myself", any member of your domain, "Anyone" (with a Google account), or "Anyone, even anonymous".
6. Click Deploy.

This can be improved, it was a small project. If you have any questions feel free to reachout. 
