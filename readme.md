### fun facts
- [Mon, Feb 20 2023]
Today I tried to make a commit with the following line in the terminal:
```
git commit -m "feat: create `history` command for listing prev terminal inputs"
```
After pressing enter a huge bunch of text appeared on my console, literally strings after strings of commands.
I ran `git status` to see what was set as the commit message and there was again that really long text.
I didn't know why that happened and it didn't occurr to me that maybe reading one of those commands could have gave
me a clue of what was happening. 
So I uncommited the last commit with `git reset --soft HEAD^` and re-did the commit and there it was again, just that now
I took my time and read the commit message. I started recognizing some of the commands, as commands that I have executed before
in the terminal, and that's when it undestood it. 
Executed the following in the terminal, just for confirming it:
```
"`history`"
```
That runs the `history` command in the terminal, where I had more than 500 lines, so the commit message tooks all of those lines
as the its content. Nice.

Fix it by doing, instead:
```
git commit -m "feat: create 'history' command for listing prev terminal inputs"
```

Literally had an `history` command output as the message for the commit where I implemented the `history` command on my web terminal.


