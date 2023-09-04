const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// connect to db file inside the appdata folder
let db;

const crypto = require("crypto")

require('dotenv').config('./.env');


const server = express();

server.use(express.json());
server.use(cors())

// Table Handeling

server.get("/tables", async (req, res) => {
    db.all('SELECT * FROM TABLES', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

server.post("/add/table", async (req, res) => {
    const { label } = req.body
    db.run(`INSERT INTO TABLES (name) VALUES (?)`, [label], function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    }
    );

})

// get order of table by id
server.get("/orders/:id", async (req, res) => {
    const id = req.params.id
    db.all(`SELECT OrderItems.order_item_id, Items.id AS 'item_id', Items.name, Items.category, Items.price, OrderItems.quantity
    FROM OrderItems
    JOIN Orders ON OrderItems.order_id = Orders.order_id
    JOIN Items ON OrderItems.item_id = Items.id
    WHERE Orders.table_id = (?);
    `, [id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Add an item to table
server.patch('/order', async(req, res) => {

    const { tableId, item_id } = req.body; // Assuming you send tableId and items in the request body

    // Step 1: Insert a new order into the Orders table
    db.run('INSERT INTO Orders (table_id) VALUES (?)', [tableId], function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error creating order.' });
        return;
      }
  
      // Step 2: Retrieve the ID of the newly created order
      const orderId = this.lastID;
  
      console.log(`Created order with ID ${orderId}`);
  
      // Step 3: Insert the order items into the OrderItems table
      const insertItemStmt = db.prepare('INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (?, ?, ?)');
  
        insertItemStmt.run([orderId, item_id, 1], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Error inserting orderitems.' });
                return;
            }
            console.log(`Created order item with ID ${this.lastID}`);
        });
  
        db.run(`UPDATE Tables SET busy = 1 WHERE id = ?`, [tableId], function (err) {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err.message });
            }
            // res.json({ id: this.lastID });
        }
        );

        
      res.status(200).json({ message: 'Order placed successfully.', orderId });
      
    });
  });



// Pay a.k.a clear all orders from table

server.patch('/pay', (req, res) => {
  const { table_id } = req.body; // Assuming you send the table ID in the request body

  // Begin a transaction
  db.serialize(() => {
    db.run('BEGIN TRANSACTION', function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error starting a transaction.' });
        return;
      }

      // Step 1: Delete corresponding order items
      db.all('SELECT item_id, quantity FROM OrderItems WHERE order_id IN (SELECT order_id FROM Orders WHERE table_id = ?)', [table_id], function (err, orderItems) {
        if (err) {
          console.error(err.message);
          db.run('ROLLBACK'); // Rollback the transaction in case of an error
          res.status(500).json({ error: 'Error retrieving order items.' });
          return;
        }

        // Step 2: Update the quantity of items in the Items table
        orderItems.forEach((orderItem) => {
          const { item_id, quantity } = orderItem;

          // Update the Items table to subtract the order item quantity
          db.run('UPDATE Items SET quantity = quantity - ? WHERE id = ?', [quantity, item_id], function (err) {
            if (err) {
              console.error(err.message);
              db.run('ROLLBACK'); // Rollback the transaction in case of an error
              res.status(500).json({ error: 'Error updating item quantities.' });
              return;
            }
          });
        });

        // Step 3: Delete orders with the specified table ID
        db.run('DELETE FROM Orders WHERE table_id = ?', [table_id], function (err) {
          if (err) {
            console.error(err.message);
            db.run('ROLLBACK'); // Rollback the transaction in case of an error
            res.status(500).json({ error: 'Error deleting orders.' });
            return;
          }

          // Step 4: Delete corresponding order items
          db.run('DELETE FROM OrderItems WHERE order_id IN (SELECT order_id FROM Orders WHERE table_id = ?)', [table_id], function (err) {
            if (err) {
              console.error(err.message);
              db.run('ROLLBACK'); // Rollback the transaction in case of an error
              res.status(500).json({ error: 'Error deleting order items.' });
              return;
            }

            // Step 5: Update table status to "not busy"
            db.run('UPDATE Tables SET busy = 0 WHERE id = ?', [table_id], function (err) {
              if (err) {
                console.error(err.message);
                db.run('ROLLBACK'); // Rollback the transaction in case of an error
                res.status(500).json({ error: 'Error updating table status.' });
                return;
              }

              // Commit the transaction if all steps are successful
              db.run('COMMIT', function (err) {
                if (err) {
                  console.error(err.message);
                  res.status(500).json({ error: 'Error committing the transaction.' });
                  return;
                }

                res.status(200).json({ message: 'Payment processed successfully.' });
              });
            });
          });
        });
      });
    });
  });
});



server.patch('/delete/order', async (req, res) => {
    const { order_id, item_id } = req.body;
    
    // Make sure to use proper SQL syntax and JOIN condition
    const sql = `DELETE FROM OrderItems WHERE order_id = ? AND item_id = ?`;
  
    db.run(sql, [order_id, item_id], function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
  
      // Check if a row was affected to determine if the deletion was successful
      if (this.changes === 0) {
        res.status(404).json({ error: 'Order item not found.' });
        console.log(req.body)
        return;
      }
      
      // update table bust status
        
  
      res.json({ message: 'Order item deleted successfully' });
    });

  });


// Items Handeling

server.get("/items", async (req, res) => {
    db.all('SELECT * FROM ITEMS', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

server.post("/add/item", async (req, res) => {
    const { category, image, name, price } = req.body

    db.run(`INSERT INTO ITEMS (category, image, name, price) VALUES (?, ?, ?, ?)`, [category, image, name, price], function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    }
    );
})



const PORT = process.env.PORT || 5000;

// connect to db

server.listen(PORT, () => {
    db = new sqlite3.Database(path.join(process.env.APPDATA, './restaurantdb/restaurant.db'));
    console.log(`Server is running on PORT: ${PORT} \nDataBase Connected`);
    
});
