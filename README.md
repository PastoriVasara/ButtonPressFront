# Current Versions
Working Version available currently at : http://88.112.106.194:3000/
The repository for the node back-end: https://github.com/PastoriVasara/ButtonPressApi

## Information

If the user hasn't used the site before, the site prompts user to name themselves.
After that the information is stored on localstorage and post request is made to the API to store the information on the serverside
Now you have the ability to either register the username which adds safety feature for the user if some reason the localstorage gets deleted or the user can log-in to an existing account.

The main idea is to simply press a button. Each time someone presses the button secret number is incremented once and if the number is divisible by 10 you gain 5 points. If it's divisible by 100 you gain 40 and if it's divisible by 500 you gain 250 points.
When the user presses the button they will be greeted with visual cue that either they gained points or lost points. Also below the button there is information field which shows how many clicks is required for the next prize.

User can also check the leaderboards to see where they are currently placed with the amount of points they have.

## Challenges

One of the biggest challenging firstly was organizing the code. I had such a flow state that i accidentally coded everything into a single file so it took some time refactoring the whole codebase.





