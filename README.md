# React Uptime Monitor

React Uptime Monitor was inspired by my current role in which if a competitor experiences downtime it can have a very dramatic effect on their client base and as a result may be enough to entice them to make a switch to another vendor. Being able to monitor key competitors and receive text alerts if they're experiencing downtime of over ~15 minutes is valuable intel.

I set out to create a very basic way of monitoring the uptime of a group of sites based on whether or not a particular site responds to a basic HTTP GET request with a 20* HTTP status code. There are some obvious limitations to this tool, but ulatimely it gets the job done for the majority of sites I'd like to monitor. The most obvious limitation being if a particular site cannot reach its CDN but it simply returns an error page stating that their CDN is down - ultimately the HTTP status code will still result in a 200 or 201.

## Built With
* [React JS](https://www.reactjs.org)
* [Material UI](https://material-ui.com/)
* [Express JS](http://expressjs.com/)
* [Twilio](https://www.twilio.com)
* [CORS Anywhere](https://github.com/Rob--W/cors-anywhere)

## Installation

Keep in mind you will need to create a Twilio account in order to be able to send SMS alerts when a site has been down for a prolonged period of time. You will also have to run your own [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) proxy in order to add CORS headers to proxied requests. 

```
git clone https://github.com/ChrisPhilbin/react-uptime-monitor.git
cd react-uptime-monitor
npm install
```

Afterwards, you will have to create your own .env file:

```
touch .env
```

Edit your .env file to have the following variables:

```
TWILIO_ACCOUNT_SID=YOUR TWILIO ACCOUNT SID
TWILIO_AUTH_TOKEN=YOUR TWILIO ACCOUNT TOKEN
TWILIO_PHONE_NUMBER=THE NUMBER ASSIGNED TO YOU FROM TWILIO
TWILIO_TO_PHONE_NUMBER=PREFERABLY YOUR REAL PHONE NUMBER
```

Once you've setup your Twilio account and have updated your .env, you can run the following to run a local instance of the React Uptime Monitor:

```
npm run dev
```