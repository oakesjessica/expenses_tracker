CREATE TABLE users (
	id serial PRIMARY KEY,
	first_name varchar,
	last_name varchar,
	email varchar
);

CREATE TABLE transaction_type (
	id serial PRIMARY KEY,
	transaction_type varchar
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
	wherewhat varchar,
	amount NUMERIC,
	user_id INT REFERENCES users(id),
	category_id INT REFERENCES user_categories(id),
	transaction_id INT REFERENCES transaction_type(id)
);
