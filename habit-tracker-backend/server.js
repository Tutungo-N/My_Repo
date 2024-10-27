const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '1995', 
    database: 'sign_up'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// GraphQL schema
const schema = buildSchema(`
    type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    }
    
    type Query {
        getUser(email: String!, password: String!): User
    }
    
    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): String
    }
`);

// GraphQL root resolver
const root = {
    getUser: ({email, password}) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
            db.query(query, [email, password], (err, results) => {
                if (err) {
                    reject(new Error('Database error'));
                } else if (results.length > 0) {
                    const user = results[0];
                    resolve({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    });
                } else {
                    reject(new Error('Invalid Email or Password'));
                }
            });
        });
    },
    createUser: ({ firstName, lastName, email, password }) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
            db.query(query, [firstName, lastName, email, password], (err, result) => {
                if (err) {
                    reject(new Error('Database error'));
                } else {
                    resolve('User created successfully');
                }
            });
        });
    }
};

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //Enable GraphQL for testing
}));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
