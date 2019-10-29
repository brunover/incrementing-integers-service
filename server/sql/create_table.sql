CREATE TABLE users (
  id SERIAL NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  int_value INTEGER NOT NULL DEFAULT 0,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
