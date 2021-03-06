-- Basic schema

-- Make sure Postgres.app is running
-- 'psql 'will enter the shell if mac
-- 'psql -U <username> <database name> < schema.sql' if windows

-- If you run 'psql <database-name> < schema.sql' it will run the schema file and drop/create tables.
-- Only do this if you want to start fresh with the below schema.

-- \l list all databases
-- \c <database-name> connects to database
-- \d <table-name> describes a certain table
-- \q to quit the shell

-- Users
--   ID
--   Email
--   Username
--   Password

-- Sprints
--   ID
--   Name

-- Features
--   ID
--   Title
--   Description
--   Points (value)
--   Status
--   *Sprint_ID
--   *User_ID

-- Comments
--   ID
--   posted (timestamp)
--   comment
--   *Feature_ID
--   *User_ID


DROP TABLE IF EXISTS users_teams CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS sprints CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  date_changed VARCHAR,
  backlog INTEGER,
  progress INTEGER,
  complete INTEGER
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  username VARCHAR,
  password VARCHAR,
  github_id VARCHAR,
  picture VARCHAR,
  current_team INTEGER
);

CREATE TABLE users_teams (
  user_id INTEGER references users(id) ON DELETE CASCADE,
  team_id INTEGER references teams(id) ON DELETE CASCADE,
  CONSTRAINT users_teams_pkey PRIMARY KEY (user_id, team_id)
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  points INTEGER,
  status VARCHAR,
  status_date TIMESTAMP,
  team_id INTEGER references teams(id) ON DELETE CASCADE,
  user_id INTEGER DEFAULT null references users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  posted TIMESTAMP,
  comment VARCHAR,
  feature_id INTEGER references features(id) ON DELETE CASCADE,
  user_id INTEGER references users(id) ON DELETE CASCADE
);

-- Possibly give users and features a sprint id.

CREATE TABLE sprints (
  id SERIAL PRIMARY KEY,
  team_id INTEGER references teams(id) ON DELETE CASCADE,
  name VARCHAR,
  sprintstart TIMESTAMP,
  sprintend TIMESTAMP,
  date_changed VARCHAR,
  backlog INTEGER,
  progress INTEGER,
  complete INTEGER
);

-----------------------------------------------------------------------
----------------------------- TEST VALUES -----------------------------
-----------------------------------------------------------------------

INSERT INTO teams (name, date_changed, backlog, progress, complete) VALUES ('Test Team', '8/27', 10, 15, 6);
INSERT INTO users (username, github_id) VALUES ('JParis44', 11894565);
INSERT INTO sprints (team_id, date_changed, sprintstart, sprintend, backlog, progress, complete) VALUES (1, '8/27', '2015-08-27 05:00:00', '2015-09-02 05:00:00', 80, 0, 0);
INSERT INTO sprints (team_id, date_changed, sprintstart, sprintend, backlog, progress, complete) VALUES (1, '8/28', '2015-08-27 05:00:00', '2015-09-02 05:00:00', 56, 12, 12);
INSERT INTO sprints (team_id, date_changed, sprintstart, sprintend, backlog, progress, complete) VALUES (1, '8/29', '2015-08-27 05:00:00', '2015-09-02 05:00:00', 44, 10, 26);
INSERT INTO sprints (team_id, date_changed, sprintstart, sprintend, backlog, progress, complete) VALUES (1, '8/30', '2015-08-27 05:00:00', '2015-09-02 05:00:00', 30, 15, 35);
INSERT INTO features (name, description, points, status, team_id)
  VALUES ('Save features', 'Store feature status in DB.', 27, 'backlog', 1);
INSERT INTO features (name, description, points, status, team_id)
  VALUES ('Set up Grunt', 'Add a Grunt build file.', 2, 'backlog', 1);
INSERT INTO features (name, description, points, status, team_id)
  VALUES ('Navigation bar', 'Placed to the left of 3 columns.', 1, 'backlog', 1);
INSERT INTO features (name, description, points, status, team_id)
  VALUES ('Login functionality', 'Using Github Oauth.', 7, 'progress', 1);
INSERT INTO features (name, description, points, status, team_id)
  VALUES ('Drag boxes', 'Be able to drag between columns.', 5, 'progress', 1);
INSERT INTO features (name, description, points, status, team_id)
  VALUES ('Add modals', 'For analytics and add feature.', 3, 'progress', 1);
INSERT INTO features (name, description, points, status, team_id)
  VALUES ('View deployed site', 'Set up heroku.', 2, 'complete', 1);
INSERT INTO features (name, description, points, status, team_id)
  VALUES ('Box view', 'View boxes inside columns', 3, 'complete', 1);
INSERT INTO features (name, description, points, status, team_id)
  VALUES ('Basic storyboard view', 'Set up basic html.', 29, 'complete', 1);

