# trmnl
## A terminal <sub><sup>*(not really)*</sup></sub> in the browser 
Made with [React](https://reactjs.org/). What a surprise, am i
right.  
---
  
### Why
I've been using Linux (*i use arch btw*) for like a year and a half now, and I kinda don't want to go back to Windows where I always, somehow, managed to have many problems when using it for developing.  
Had to go from a dev environment where I'd barely use the terminal (almost completely limited to using it for git and running vim), to a dev environment where if I want to do even the minimal operation (like CRUD operations with directories and files), I have to run some command.  

Basically, with this project, I wanted to **implement some of those minimal operations that I have used in a pseudo terminal usable from the browser**.

---

### Some screenshoots

![Running commands `tree` (at root directory), `help` and `history`](/docs/images/1.png)
Running commands `tree` (at root directory), `help` and `history`.

---

### Developing fun facts
- [Mon, Feb 20 2023]   

    Today I tried to make a commit with the following line in the terminal:
    ```
    git commit -m "feat: create `history` command for listing prev terminal inputs"
    ```
    After pressing enter, a huge bunch of text appeared on my console. Literally strings after strings of commands.  
    I ran `git status` to see what was set as the commit message and there was again that really long text.
    I didn't know why that happened and it didn't occurr to me that maybe reading one of those commands could have gave
    me a clue of what was happening. So I uncommited the last commit with `git reset --soft HEAD^` and re-did the
    commit and there it was again, just that now I took my time and read the commit message.   
    I started recognizing some of the commands, as commands that I have executed before
    in the terminal, and that's when I undestood it.   

    Executed the following in the terminal, just for confirming it:
    ```
    "`history`"
    ```

    That runs the [`history`](https://linuxcommand.org/lc3_man_pages/historyh.html) command in the terminal, where I had more than 500 lines,
    so the commit message took all of those lines, the output, as its content.   

    Fixed it by doing, instead:
    ```
    git commit -m "feat: create 'history' command for listing prev terminal inputs"
    ```

    Literally had an `history` command output as the message for the commit where I implemented the `history` command for this web terminal.
