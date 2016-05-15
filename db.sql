CREATE TABLE users (
	id serial PRIMARY KEY,
	first_name varchar,
	last_name varchar,
	email varchar
);

CREATE TABLE transaction_type (
	id serial PRIMARY KEY,
	type_name varchar
);

CREATE TABLE user_categories (
	id serial PRIMARY KEY,
	category varchar,
	user_id INT REFERENCES users(id)
);

CREATE TABLE savings (
	id serial PRIMARY KEY,
	savings NUMERIC,
	user_id INT REFERENCES users(id)
);

CREATE TABLE checking (
	id serial PRIMARY KEY,
	checking NUMERIC,
	user_id INT REFERENCES users(id)
);

CREATE TABLE cash (
	id serial PRIMARY KEY,
	cash NUMERIC,
	user_id INT REFERENCES users(id)
);

CREATE TABLE debt (
	id serial PRIMARY KEY,
	total NUMERIC,
	monthly NUMERIC,
	user_id INT REFERENCES users(id)
);

CREATE TABLE loans (
	id serial PRIMARY KEY,
	total NUMERIC,
	monthly NUMERIC,
	user_id INT REFERENCES users(id)
);

CREATE TABLE credit (
	id serial PRIMARY KEY,
	total NUMERIC,
	monthly NUMERIC,
	user_id INT REFERENCES users(id)
);

CREATE TABLE transactions (
	id serial PRIMARY KEY,
	dates date,
	wherewhat varchar,
	amount NUMERIC,
	user_id INT REFERENCES users(id),
	category_id INT REFERENCES user_categories(id),
	t_type_id INT REFERENCES transaction_type(id)
);

INSERT INTO transaction_type (type_name) VALUES
('income'),
('cash gift (income)'),
('checking gift (income)'),
('cash expense'),
('credit expense'),
('debit expense'),
('loans'),
('bill payment (cc)'),
('bill payment (checking)'),
('loan payment (cc)'),
('loan payment (cash)'),
('loan payment (checking)'),
('cc payment (checking)'),
('savings to checking transfer'),
('checking to savings transfer'),
('checking - cash deposit'),
('checking withdrawl from checking'),
('cash check'),
('bill');
