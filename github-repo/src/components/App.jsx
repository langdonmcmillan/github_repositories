import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Container
} from "semantic-ui-react";
import axios from "axios";

import RepositoryTable from "./RepositoryTable";

class App extends Component {
  state = {
    userName: "",
    repositories: [],
    touched: false,
    loading: false,
    error: false,
    errorMessage: null
  };
  handleSearch = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.github.com/users/${this.state.userName}/repos`,
        headers: {
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        }
      });
      this.setState({ repositories: response.data });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response.status === 404
          ? "No repositories were found for that user."
          : "An error occurred while retrieving the user's repositories.";
      this.setState({
        error: true,
        errorMessage,
        repositories: []
      });
    }
  };

  updateUserName = e => {
    const userName = e.target.value;
    const error = this.state.touched && !userName;
    const errorMessage = error ? "User Name is required." : null;
    this.setState({ userName, touched: true, errorMessage, error });
  };

  render() {
    return (
      <Container>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              Github Repo Search
            </Header>
            <Form
              error={this.state.error}
              loading={this.state.loading}
              size="large"
            >
              <Segment stacked>
                <Message error content={this.state.errorMessage} />
                <Form.Input
                  fluid
                  label="User Name"
                  name="userName"
                  type="text"
                  placeholder="User Name"
                  icon="user"
                  onChange={this.updateUserName}
                  value={this.state.userName}
                />
                <Button
                  primary
                  fluid
                  size="large"
                  onClick={this.handleSearch}
                  disabled={this.state.touched && !this.state.userName}
                >
                  Search
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        {this.state.repositories.length > 0 && (
          <RepositoryTable
            repositories={this.state.repositories}
            userName={this.state.userName}
          />
        )}
      </Container>
    );
  }
}

export default App;
