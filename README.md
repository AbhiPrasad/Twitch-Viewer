# Twitch Viewer

Provides a list of twitch.tv streamers and an according link to their stream. The the custom list of streamers is saved on your page. 

<a href="url"><img src="https://raw.githubusercontent.com/AbhiPrasad/Twitch-Viewer/master/screenshot.png" width="auto" height="300" ></a>

## Uses
* Twitch.tv api
* [bootswatch](https://bootswatch.com) cosmo theme
* J Q U E R Y

## Features
* Add and remove streamers
* View streamer game and title
* Bootstrapped for responsive view 
* Uses localstorage for data storage

### Todo:
* Chrome extension port? (new tab stuff maybe)
* Sign into your own account
* node backend so I can finally use my own api key (please)

## Shoutouts

Thanks to [bootswatch](https://bootswatch.com) and [twitch.tv](https://twitch.tv)

## Branches?

* **master** contains the main web app
* **electron-test** contains an ported desktop version of the web app (STILL UNDER WORK)
* **chromeExtension** contains the chrome extension version of the web app
	** the chrome extension replaces the new tab page with twitch viewer web app

---

### Note:
If the functions seem like their repeated a lot, it was because trying to avoid asynchronous stuff. I made some adjustments to avoid using timers or Javascript promises, but if promises are implemented the code will be much cleaner and faster. 

--- 

MIT License
