# API Explorer
This is a very simple dynamic API explorer. It is able to read a list of API endpoints from a given URL and dyanmically create said endpoints with functionality to send calls and view responses. 

## Endpoints URL
The given URL should be a `json` file with the following format:
```
[
	{
		"title": "Title",
		"url": "URL to send request",
		"method": "Type of Request",
		"body": [
			{
				"key": "value",
				"...": "..."
			},
			{
				...
			}
		]
	},
	{
		...
	}
]
```
###### Note: The encolsing `[]` are needed, and the `body` section is optional depending on the method type.

## Setup
This project was built using React.js and Reacstrap, to install this locally follow the next steps (make sure you have [NPM](https://www.npmjs.com/get-npm) installed on your machine):
```
git clone https://github.com/eportet/api-explorer.git
cd api-explorer
npm install
npm start
[Open localhost:3000]
```

## Flexible Explorer
You can use your own API Endpoints to view by supplying a link of said file. The file should follow the specifications stated above. The webapp will then dynamically create all Endpoints and their respective inputs.
I uploaded two JSON files with some test APIs, feel free to use these.
```
https://raw.githubusercontent.com/eportet/api-explorer/master/public/endpoint.json
https://raw.githubusercontent.com/eportet/api-explorer/master/public/endpoints.json
```

## Notes
This is my first project using React.js! I've had some experience with Node.js, but only for backend processes. It was fun tackling the challenge and learning how to use React. I thoroughly enjoyed the framework, and I am looking forward to mastering it and learning how to properly use its features.
