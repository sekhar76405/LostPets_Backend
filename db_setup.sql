CREATE TABLE users (
  u_id serial PRIMARY KEY,
  name VARCHAR(40),
  email VARCHAR(40),
  password VARCHAR(40),
  phonenumber BIGINT
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


CREATE TABLE requests (
  r_id serial PRIMARY KEY, 
  sender_id VARCHAR(10), 
  sender_name VARCHAR(40),
  receiver_id VARCHAR(10),
  receiver_name VARCHAR(40)
);

CREATE TABLE chats (
  c_id VARCHAR(10), 
  sender_id VARCHAR(10), 
  sender_name VARCHAR(40),
  receiver_id VARCHAR(10),
  receiver_name VARCHAR(40)
);

-- CREATE TABLE chat_history(
--   c_id PRIMARY KEY, 
--   history 
-- );
