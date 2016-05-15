var connectionString = '';

// new for heroku deployment
if(process.env.DATABASE_URL != undefined){
    connectionString = process.env.DATABASE_URL;
}else{
    connectionString='postgres://localhost:5000/expense_tracker';
}

module.exports = connectionString;