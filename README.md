# Angular Agent Tracker

## Getting Started

### Setting up the Database

```
CREATE DATABASE agent_tracker
USE agent_tracker
CREATE TABLE agents
(
  id              BINARY(16),                           # Unique ID for the record
  status          VARCHAR(150) NOT NULL,                # License Status
  firstName       VARCHAR(150) NOT NULL,                # First name of agent
  lastName        VARCHAR(150) NOT NULL,                # Last name of agent
  totalSales      DECIMAL(13, 4) NOT NULL,              # Total sales from homes sold
  grossCommission DECIMAL(13, 4) NOT NULL,              # Commission earned
  totalHomes      SMALLINT unsigned NOT NULL,           # Number of homes sold
  PRIMARY KEY     (id)
);
```

### Start the Server
Run the server before starting up the client
```
npm install
node server.js
```

### Start the Client 
Once the server is running, start the client
```
npm install
npm start
```
