CREATE TABLE users (
  u_id serial PRIMARY KEY,
  name VARCHAR(40),
  email VARCHAR(40),
  password VARCHAR(40),
  phonenumber INT
);

CREATE TABLE pets (
  p_id VARCHAR(8) PRIMARY KEY,
  o_id INT,
  name VARCHAR(40),
  breed VARCHAR(40),
  colour VARCHAR(40),
  gender VARCHAR(10),
  category VARCHAR(40),
  marks VARCHAR,
  license VARCHAR
);

