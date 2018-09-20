import React, { Component } from 'react';
import {Container, Input, Button, InputGroup, InputGroupAddon, FormGroup, Label, Card, CardHeader, CardBody, CardSubtitle} from 'reactstrap';
import './App.css';

class ExplorerComponent extends Component {
	constructor() {
    super();
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

class App extends Component {
	constructor() {
		super();
		this.valueJSON = 'https://raw.githubusercontent.com/eportet/api-explorer/master/public/endpoints.json';
		this.state = {}
	}

	componentDidMount() {
		fetch(this.valueJSON)
		.then(response => response.json())
		.then(json => {
			this.setState(json);
			console.log(this.state);
		})
	}

	render() {
		return (
			<Container>
				<div className="download-url-wrapper">
					<InputGroup color="secondary">
	          <InputGroupAddon addonType="prepend"><Button color="primary">Smartcar API Explorer:</Button></InputGroupAddon>
	          <Input defaultValue={this.valueJSON} />
	          <InputGroupAddon addonType="append"><Button color="secondary">Explore</Button></InputGroupAddon>
	        </InputGroup>
        </div>
        <ExplorerComponent title={this.state.title} method={this.state.method} url={this.state.url} />
			</Container>
		);
	}
}

export default App;
