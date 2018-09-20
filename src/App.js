import React, { Component } from 'react';
import {Container, Input, Button, InputGroup, InputGroupAddon, FormGroup, Label, Card, CardHeader, CardBody, CardSubtitle} from 'reactstrap';
import './App.css';

class ExplorerComponent extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);

		fetch('/api/form-submit-url', {
			method: 'POST',
			body: data,
		});
	}

	render() {
		return (
		<div>
			<Card>
				<CardHeader>{this.props.title}</CardHeader>
				<CardBody>
					<CardSubtitle>{this.props.method}</CardSubtitle>
					<Label>URL: <span>{this.props.url}</span></Label>
					<FormGroup onSubmit={this.handleSubmit}>
						<Label htmlFor="email">Email</Label>
						<Input name="email" type="email" />
						<Label >Full Name</Label>
						<Input htmlFor="email"/>
						<Label>Phone</Label>
						<Input />
					</FormGroup>
					<Button color="success">Send Request</Button>
					<CardSubtitle>Response</CardSubtitle>
					<FormGroup>
						<Input type="textarea" readOnly />
					</FormGroup>
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
				<ExplorerComponent key={endpoint.title} title={endpoint.title} method={endpoint.method} url={endpoint.url} />
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
