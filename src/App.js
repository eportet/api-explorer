import React, { Component } from 'react';
import {Container, Input, Button, InputGroup, InputGroupAddon, Label, Card, CardHeader, CardBody, CardSubtitle} from 'reactstrap';
import './App.css';

class ExplorerComponent extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {}
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.props.method === 'GET') {
			fetch(this.props.url)
			.then(response => response.json())
			.then(json => this.setState({responseBody: JSON.stringify(json, undefined, 4)}))
		} else {
			fetch(this.props.url, {
				method: this.props.method,
				body: JSON.stringify(this.getFormValues()),
				headers: { "Content-type": "application/json; charset=UTF-8"}
			}).then(response => response.json())
			.then(json => this.setState({responseBody: JSON.stringify(json, undefined, 4)}));
		}
	}

	renderForms() {
		if (this.props.body === undefined) {
			return null;
		}

		function createForms(body) {
			const FORMS = body.map((form) =>
				<div key={form.name}>
					<Label htmlFor={form.name}>{cleanText(form.name)}{insertRequiredStar(form.required)}</Label>
					<Input
						className="card-input"
						name={form.name}
						type={form.type}
						min={form.min}
						max={form.max}
						placeholder={form.placeholder}
						required={form.required}
						pattern={form.pattern}
					/>
				</div>
			);

			return (FORMS);
		}

		function insertRequiredStar(isRequired) {
			if (isRequired) {
				return (<span className="required-star">*</span>);
			}
		}

		function cleanText(textToClean) {
			if (textToClean.includes('-')) {
				let text = textToClean.split('-').join(' ');
				text = text.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
				return text;
			} else {
				return textToClean.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
			}
		}

		return (
			<div className={this.props.title.split(' ').join('')}>
				{createForms(this.props.body)}
			</div>
		);
	}

	getFormValues() {
		let values = {}
		// Get unique div containing all input fields and add each value to the values object
		const form = Array.from(document.querySelector('.' + this.props.title.split(' ').join('')).querySelectorAll('input'));
		form.forEach(input => {
				values[input.name] = input.value;
		});
		return values;
	}

	render() {
		return (
		<div>
			<Card className="card">
				<CardHeader>{this.props.title}</CardHeader>
				<CardBody>
					<CardSubtitle className={this.props.method.toLowerCase()}>{this.props.method}</CardSubtitle>
					<Label>URL: <span className="url-link">{this.props.url}</span></Label>
					<form onSubmit={this.handleSubmit}>
						{this.renderForms()}
						<Button className="card-button" color="success">Send Request</Button>
					</form>
					<CardSubtitle>Response</CardSubtitle>
					<form className="response-label">
						<Input value={this.state.responseBody} type="textarea" readOnly />
					</form>
				</CardBody>
			</Card>
		</div>
		);
	}
}

class APIExplorer extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			url: 'https://raw.githubusercontent.com/eportet/api-explorer/master/public/endpoints.json',
		}
	}

	// On page load, update page with the defaultJSON endpoints
	componentWillMount() {
		this.fetchJSON(this.state.url);
	}

	// Fetch the endpoints of given URL
	fetchJSON(url) {
		fetch(url)
		.then(res => {
			if (!res.ok) {
				throw Error(res.statusText);
			}
			return res.json();
		}).then(ep => {
			this.setState({endpoints: ep});
		}).catch(error => {
			console.log(error);
		});
	}

	// Updates the endpoints content to match the given URL
	handleSubmit(event) {
		event.preventDefault();
		this.fetchJSON(this.state.url);
	}

	// Keeps state.url updated to the value on the input bar
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	// Will iteratively render all the endpoints fetched from the url
	renderEndpoints() {
		if (this.state.endpoints === undefined) {
			return null;
		}

		function createEndpoints(endpoints) {
			const ENDPOINTS = endpoints.map((endpoint) =>
				<ExplorerComponent
					key={endpoint.title}
					title={endpoint.title}
					method={endpoint.method}
					url={endpoint.url}
					body={endpoint.body}
				/>
			);

			return (ENDPOINTS);
		}

		return (
			<div>
				{createEndpoints(this.state.endpoints)}
			</div>
		);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<InputGroup className="url-source">
						<InputGroupAddon addonType="prepend"><Button color="primary">Smartcar API Explorer:</Button></InputGroupAddon>
						{/* URL Input Source */}
						<Input name="url" defaultValue={this.state.url} onChange={this.handleChange}/>
						<InputGroupAddon addonType="append"><Button type="submit" color="secondary">Explore</Button></InputGroupAddon>
					</InputGroup>
				</form>
				<ErrorBoundary>
					{this.renderEndpoints()}
				</ErrorBoundary>
			</div>
		);
	}
}

class App extends Component {
	render() {
		return (
			<Container>
				<APIExplorer />
			</Container>
		);
	}
}

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(e, info) {
		// Display fallback UI
		this.setState({ hasError: true, error: e });
		// You can also log the error to an error reporting service
		console.log(e, info);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>{this.state.error}</h1>;
		}
		return this.props.children;
	}
}

export default App;
