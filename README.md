# Middleman-NPM

MiddleMan is an intuitive Express Performance Monitor that will measure performant properties middleware of applications in development mode and provide users with debugging tools to help you compare all your middleware within your routes, allowing you to fully optimize your application for production mode. MiddleMan will help provide you with the all enhancement tools you need for your middleware. 

## Requirements 
Middleman is currently only compatible with Node v8.5. 

## Installation 
Install the module with npm install middleman-NPM:

	npm install middleman-NPM
  
## Usage 
To initialize Middleman, simply require the npm module and insert Middleman to configure all your routes: 

	const middleman = require('middleman')
	app.use(middleman)

To view performance data analysis of all your routes, hit ctrl+c to end server: 
	`image of killing the server`

You will receive an API key to view your performance data analysis to visit Middleman site:
	`MiddleMan site`
	
## Contributors 
* Chris Saavedra | https://github.com/Cssaavedra
   
* Jung Shin | http://github.com/wjdgh329
   
* Mia Huynh | https://github.com/miahuynh
 
## License 

Middleman is licensed under the MIT License - please see [LICENSE.md](https://help.github.com/articles/licensing-a-repository/) for details

## Acknowledgments 

Special shoutout to [Clariz Mariano](https://github.com/havengoer) for Middleman's logo!


