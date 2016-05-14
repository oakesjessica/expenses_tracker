var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/expenses_tracker';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('models/database.js');
query.on('end', function() { client.end(); });
