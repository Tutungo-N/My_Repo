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
    
    type Habit {
    id: ID!
    name: String
    date: String
    isGood: Boolean
    }

    type Query {
        getUser(email: String!, password: String!): User
        getHabits: [Habit]
        getHabit(id: ID!): Habit
    }
    
    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): String
        addHabit(name: String!, date: String!, isGood: Boolean): Habit
        updateHabit(id: ID!, name: String, isGood: Boolean): String
        deleteHabit(id: ID!): String
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
    },


    // Resolvers for habit management
    getHabits: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM myhabits';
            db.query(query, (err, results) => {
                if (err) {
                    reject(new Error('Error Fetching habits'));
                } else {
                    //Return the habits with the correct field names
                    resolve(results.map(habit =>({
                        id: habit.id,
                        name: habit.name,
                        date: habit.date ? new Date(habit.date).toISOString().split('T')[0]:"", //Format date to YYYY-MM-DD
                        isGood: !!habit.isGood
                    })));
                }
            });
        });
    },
    getHabit: ({ id }) => {
        return new Promise((resolve, reject) =>{
            const query = 'SELECT * FROM myhabits WHERE id = ?';
            db.query(query, [id], (err, results) =>{
                if (err) {
                    reject(new Error('Error fetching habit'));
                } else if (results.length > 0){
                    resolve(results[0]);
                } else {
                    reject(new Error('Habit not found'));
                }
            });
        });
    },
    addHabit: ({ name, date, isGood }) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO myhabits (name, date, isGood) VALUES (?, ?, ?)';
            db.query(query, [name, date, isGood || true], (err, result) => {
                if (err) {
                    reject(new Error('Error adding habit'));
                } else {
                    resolve({ id: result.insertId, name, date, isGood });
                }
            });
        });
    },
    updateHabit: ({ id, name, isGood }) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE myhabits SET name = ?, isGood = ? WHERE id = ?';
            db.query(query, [name, isGood, id], (err) => {
                if (err) {
                    reject(new Error('Error updating habit'));
                } else {
                    resolve('Habit updated successfully');
                }
            });
        });
    },
    deleteHabit: ({ id }) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM myhabits WHERE id = ?';
            db.query(query, [id], (err) => {
                if (err) {
                    reject(new Error('Error deleting habit'));
                } else {
                    resolve('Habit deleted successfully');
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
