import React, { Component } from "react";
import { Table, Header, Segment } from "semantic-ui-react";

class RepositoryTable extends Component {
  renderRow = repo => {
    return (
      <Table.Row>
        <Table.Cell>{repo.name}</Table.Cell>
        <Table.Cell>{repo.description}</Table.Cell>
        <Table.Cell>{repo.language}</Table.Cell>
        <Table.Cell>{repo.url}</Table.Cell>
        <Table.Cell>{repo.updated_at}</Table.Cell>
      </Table.Row>
    );
  };

  render() {
    const { userName, repositories } = this.props;
    return (
      <Segment>
        <Header as="h2" color="blue" textAlign="center">
          {userName}'s Repositories
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>URL</Table.HeaderCell>
              <Table.HeaderCell>Last Updated</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {repositories.map(repo => this.renderRow(repo))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default RepositoryTable;
