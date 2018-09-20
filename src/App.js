import React, { Component } from 'react';
import {Container, Input, Button, InputGroup, InputGroupAddon, FormGroup, Label, Card, CardHeader, CardBody, CardSubtitle} from 'reactstrap';
import './App.css';

class ExplorerComponent extends Component {
	render() {
		return (
		<div>
			<Card>
				<CardHeader>{this.props.title}</CardHeader>
				<CardBody>
		  		<CardSubtitle>{this.props.method}</CardSubtitle>
		  		<Label>URL: <span>{this.props.url}</span></Label>
		  		<FormGroup>
		  			<Label>Email</Label>
		  			<Input />
		  			<Label>Full Name</Label>
		  			<Input />
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
		this.state = {
			endpoint: [],
		};
	}

	componentDidMount() {
		fetch('https://petstore.swagger.io/v2/swagger.json')
		.then(response => response.json())
		.then(json => console.log(json))
	}

	render() {
		return (
			<Container>
				<div className="download-url-wrapper">
					<InputGroup color="secondary">
	          <InputGroupAddon addonType="prepend"><Button color="primary">Smartcar API Explorer:</Button></InputGroupAddon>
	          <Input defaultValue="https://petstore.swagger.io/v2/swagger.json"/>
	          <InputGroupAddon addonType="append"><Button color="secondary">Explore</Button></InputGroupAddon>
	        </InputGroup>
        </div>
        <ExplorerComponent title={""} method={"Method"} url={"someurl.com"} />
			</Container>
		);
	}
}

export default App;
