## Synopsis

Scrummage is a web application that allows a development team to create, modify, update feature/tasks for a created project.  A feature is created with a title, description and points(based on difficulty).  It is then added to the storyboard that displays the status of each feature - "Backlog" "Progress" or "Completed"
Scrummage keeps track of these points and visually represents the team's progress in a [Burndown chart](https://en.wikipedia.org/wiki/Burn_down_chart).
Abiding by the agile practices, Scrummage is a project management solution.  

## Motivation

In a work environment where communication is important and organization is vital, we wanted to create a real time app that can keep track of both, as well as visually measure progress.

## Team

  - __Product Owner__/__Scrum Master__: Daniel Jansen
  - __Development Team Members__: Paris Caldwell, John McGuirk, David Unkefer

## Installation

After forking the repo - install the dependencies in the root directory.
```sh
sudo npm install -g bower
npm install
bower install
```
### Creating the Database

To install Postgres:
```
brew install postgres
```
To check your version of Postgres:
```
brew info postgres
```
Once Postgres is running, create the database:
```
createdb dbName
```
To launch psql:
```
psql dbName
```
FROM the Postgres CLI Insert database schema and sample data:
```
\i /Scrummage/server/db/schema.sql
```
### Connecting the Database

Open file Scrummage > server > config > authStore.js
		and adjust your Postgres connection settings accordingly using exports.pgData object.  

### Starting the Server

From the command line:
```
nodemon server/server.js
```

## Contributors

We welcome any questions, concerns, contributions - please open an issue or submit a pull request.  
