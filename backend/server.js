var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
const uuidv4 = require('uuid/v4');

app.use(bodyParser.json());

// Add headers if you have CORS issue with browser when testing locally
// This would be taken out or only used if node_env is dev 
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agent_tracker'
});
connection.connect((err) => {
  if (!err) {
    console.log('DB connection success');
  } else {
    console.log('DB connection failed', JSON.stringify(err));
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Agent Calls - Normally I would split this into its own route, but since this is the 
// only one for this small project I have kept it in the same file.

// Get all agents
app.get('/agents', function (req, res, next) {
  let query = 'SELECT BIN_TO_UUID(id) id, firstName, lastName, totalSales, totalHomes, grossCommission, status FROM agents';
  if (req.query.searchTerm && req.query.searchTerm.length > 0) {
    // Apply the search if there is a search term passed in
    let searchQuery = ` WHERE firstName LIKE '%${req.query.searchTerm}%' OR lastName LIKE '%${req.query.searchTerm}%'`
    query += searchQuery;
  }
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(result);
  })
})

// Get agent by id
app.get('/agents/:id', function (req, res, next) {
  connection.query(`SELECT * FROM agents WHERE id = UUID_TO_BIN('${req.params.id}')`, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(result);
  })
})

// Create an agent
app.post('/agents', function (req, res, next) {
  let agentId = uuidv4();
  const params = req.body.params;
  const values = `(UUID_TO_BIN('${agentId}'), '${params.firstName}', '${params.lastName}', ${params.totalSales}, ${params.grossCommission}, ${params.totalHomes}, '${params.status}')`
  let sql = `INSERT INTO agents(id, firstName, lastName, totalSales, grossCommission, totalHomes, status) VALUES${values}`
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    let response = {
      status: 200,
      id: agentId
    };
    res.send(response);
  })
});

// Update an agent
// Get agent by id
app.put('/agents/:id', function (req, res, next) {
  let query = `UPDATE agents SET firstName = ?, lastName = ?, totalSales = ?, grossCommission = ?, totalHomes = ?, status = ? WHERE id = UUID_TO_BIN('${req.params.id}')`
  let params = req.body.params;
  connection.query(query, [params.firstName, params.lastName, params.totalSales, params.grossCommission, params.totalHomes, params.status], (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(result);
  })
})

// Delete an agent
app.delete('/agents/:id', function (req, res, next) {
  connection.query(`DELETE FROM agents WHERE id = UUID_TO_BIN('${req.params.id}')`, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(result);
  })
});