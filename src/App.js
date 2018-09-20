import React, { Component } from 'react';
import {Container, Input, Button, InputGroup, InputGroupAddon, Label, Card, CardHeader, CardBody, CardSubtitle} from 'reactstrap';
import './App.css';

class ExplorerComponent extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { responseBody: '' }
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);

		console.log('Trying my best');

		if (this.props.method.toUpperCase() === 'GET') {
			fetch(this.props.url).then(response => response.json()).then(json => this.setState({responseBody: JSON.stringify(json)}));
		} else {
			fetch(this.props.url, {
				method: this.props.method.toUpperCase(),
				body: data,
			}).then(response => response.json()).then(json => this.setState({responseBody: JSON.stringify(json)}));
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
        <Input name={form.name}
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
				return (<span>*</span>);
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
			<div>
				{createForms(this.props.body)}
			</div>
		);
	}

	render() {
		return (
		<div>
			<Card>
				<CardHeader>{this.props.title}</CardHeader>
				<CardBody>
					<CardSubtitle>{this.props.method}</CardSubtitle>
					<Label>URL: <span>{this.props.url}</span></Label>
					<form onSubmit={this.handleSubmit}>
						{this.renderForms()}
						<Button color="success">Send Request</Button>
					</form>
					<CardSubtitle>Response</CardSubtitle>
					<form>
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
		this.valueJSON = 'https://raw.githubusercontent.com/eportet/api-explorer/master/public/endpoints.json';
		this.state = {}
	}

	componentWillMount() {
		fetch(this.valueJSON)
		.then(res => res.json())
		.then(endpoints => {
			this.setState({endpoints});
		});
	}

	renderEndpoints() {
		if (this.state.endpoints === undefined) {
			return null;
		}

		function createEndpoints(endpoints) {
			const ENDPOINTS = endpoints.map((endpoint) =>
				<ExplorerComponent key={endpoint.title} title={endpoint.title} method={endpoint.method} url={endpoint.url} body={endpoint.body} />
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
				<InputGroup className="download-url-wrapper">
					<InputGroupAddon addonType="prepend"><Button color="primary">Smartcar API Explorer:</Button></InputGroupAddon>
					<Input defaultValue={this.valueJSON} />
					<InputGroupAddon addonType="append"><Button color="secondary">Explore</Button></InputGroupAddon>
				</InputGroup>
				{this.renderEndpoints()}
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

export default App;
