var connectionString = '';

// new for heroku deployment
if(process.env.DATABASE_URL != undefined){
    connectionString = process.env.DATABASE_URL + '?ssl=true';
}else{
    connectionString='postgres://localhost:5432/vinna';
}

module.exports = connectionString;