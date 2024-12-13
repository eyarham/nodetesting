# Node Testing

hello and welcome to this repo

my intention is to create a prototype web application architecture using two nodejs servers, one for the client and one for a server-side api, and nginx as a reverse proxy.

## Starting the servers

in order to run this in development mode, you'll want to use the command:

```
    npm install
    npm run dev
```

npm run dev will start both the client.js and server.js nodejs servers, and you should be able to access the ui by opening a browser and navigating to <http://localhost:8000>

## Nginx

note: this will not work on windows, so use wsl if you're on windows (this is what i do)

in order to run nginx you'll want to use the following command, substituting in the absolute path of your repository:

```
npm install
sudo nginx -c [absolute path]/nginx.conf
```

you can then run `npm run dev` and it'll start both servers, as specified in section "Starting the servers"

this will allow you to access either server by using the address 

<http://localhost:8888> (for the ui server (client.js))
and
<http://localhost:8888/api> (for the api server (server.js))

## Thanks for checking this out

Send a pull request if you want to contribute
