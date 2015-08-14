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

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  points INTEGER,
  start TIMESTAMP,
  backlog VARCHAR,
  progress VARCHAR,
  complete VARCHAR
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  username VARCHAR,
  password VARCHAR,
  github_id VARCHAR,
  team_id INTEGER references teams(id)
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  points INTEGER,
  status VARCHAR,
  team_id INTEGER references teams(id),
  user_id INTEGER DEFAULT null references users(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  posted TIMESTAMP,
  comment VARCHAR,
  feature_id INTEGER references features(id),
  user_id INTEGER references users(id)
);

-----------------------------------------------------------------------
----------------------------- TEST VALUES -----------------------------
-----------------------------------------------------------------------

INSERT INTO teams (name, backlog, progress, complete) VALUES ('Test Team', '[50]', '[5]', '[3]');
INSERT INTO users (username, github_id) VALUES ('JParis44', 11894565);
INSERT INTO features (name, description, points, status, team_id, user_id)
  VALUES ('This is a test!', 'This started complete.', 3, 'complete', 1, 1);
INSERT INTO features (name, description, points, status, team_id, user_id)
  VALUES ('This is another test!', 'This started in progress.', 5, 'progress', 1, 1);
INSERT INTO features (name, description, points, status, team_id, user_id)
  VALUES ('This is a trial!', 'This started in backlog.', 50, 'backlog', 1, 1);
