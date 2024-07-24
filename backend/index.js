// app.js
const express = require('express');
const db = require('./db');
const port = 3000;
const cors = require("cors");
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '50mb' }));
// API Endpoints for /orphanagebranch
 


// GET all guardians
app.get('/guardian', (req, res) => {
  db.query('SELECT * FROM guardian', (err, results) => {
    if (err) {
      console.error('Error fetching guardians:', err);
      return res.status(500).json({ success: false, error: 'Failed to fetch guardians' });
    }
    res.status(200).json({ success: true, data: results });
  });
});

// GET a single guardian by ID
app.get('/guardian/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM guardian WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching guardian:', err);
      return res.status(500).json({ success: false, error: 'Failed to fetch guardian' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, error: 'Guardian not found' });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
});

// POST create a new guardian
app.post('/guardian', (req, res) => {
  const {
    child_id,
    gardian_name,
    gardian_cnic,
    address,
    contact,
    email,
    emergency_contact,
    image
  } = req.body;

  db.query(
    'INSERT INTO guardian (child_id, gardian_name, gardian_cnic, address, contact, email, emergency_contact, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [child_id, gardian_name, gardian_cnic, address, contact, email, emergency_contact, image],
    (err, result) => {
      if (err) {
        console.error('Error creating guardian:', err);
        return res.status(500).json({ success: false, error: 'Failed to create guardian' });
      }
      res.status(201).json({ success: true, message: 'Guardian created successfully', id: result.insertId });
    }
  );
});

// PUT update an existing guardian
app.put('/guardian/:id', (req, res) => {
  const { id } = req.params;
  const {
    child_id,
    gardian_name,
    gardian_cnic,
    address,
    contact,
    email,
    emergency_contact,
    image
  } = req.body;

  db.query(
    'UPDATE guardian SET child_id=?, gardian_name=?, gardian_cnic=?, address=?, contact=?, email=?, emergency_contact=?, image=? WHERE id=?',
    [child_id, gardian_name, gardian_cnic, address, contact, email, emergency_contact, image, id],
    (err, result) => {
      if (err) {
        console.error('Error updating guardian:', err);
        return res.status(500).json({ success: false, error: 'Failed to update guardian' });
      }
      res.status(200).json({ success: true, message: 'Guardian updated successfully' });
    }
  );
});

// DELETE delete a guardian by ID
app.delete('/guardian/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM guardian WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting guardian:', err);
      return res.status(500).json({ success: false, error: 'Failed to delete guardian' });
    }
    res.status(200).json({ success: true, message: 'Guardian deleted successfully' });
  });
});

// POST /orphanagebranch
app.post('/orphanagebranch', (req, res) => {

  const { Orphanage_id, Address, city, Capacity, N_room, No_washrooms, No_showers, No_hall, No_gates, size, no_of_stories, No_orphans, date_time, available_space } = req.body;

  // Insert into orphanage_branch table
  const insertBranchSql = `
      INSERT INTO orphanage_branch (Orphanage_id, Address, city, Capacity, N_room, No_washrooms, No_showers, No_hall, No_gates, size, no_of_stories)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(insertBranchSql, [Orphanage_id, Address, city, Capacity, N_room, No_washrooms, No_showers, No_hall, No_gates, size, no_of_stories], (err, result) => {
      if (err) {
          console.error('Error inserting into orphanage_branch:', err);
          return res.status(500).send('Error inserting into orphanage_branch');
      }

      // Assuming branch_id is auto-generated; retrieve the last inserted ID
      const branch_id = result.insertId;

      // Insert into orphanage_branch_capacity table
      const insertCapacitySql = `
          INSERT INTO orphanage_branch_capacity (branch_id, No_orphans, date_time, available_space)
          VALUES (?, ?, ?, ?)
      `;

      db.query(insertCapacitySql, [branch_id, No_orphans, date_time, available_space], (err, result) => {
          if (err) {
              console.error('Error inserting into orphanage_branch_capacity:', err);
              return res.status(500).send('Error inserting into orphanage_branch_capacity');
          }
          return res.status(201).send('Orphanage branch and capacity created successfully');
      });
  });
});


// GET /orphanagebranch/:Orphanage_id/:branch_id
app.get('/orphanagebranch/:branch_id', (req, res) => {
  const { Orphanage_id, branch_id } = req.params;

  const sql = `
      SELECT ob.*, obc.*
FROM orphanage_branch ob
JOIN orphanage_branch_capacity obc ON ob.branch_id = obc.branch_id
WHERE ob.branch_id = ?;
  `;

  db.query(sql, [branch_id], (err, results) => {
      if (err) {
          console.error('Error retrieving orphanage_branch: ' + err.stack);
          res.status(500).send('Error retrieving orphanage_branch');
          return;
      }
      if (results.length === 0) {
          res.status(404).send('Orphanage branch not found');
          return;
      }
      res.json(results[0]);
  });
});

// PUT /orphanagebranch/:Orphanage_id/:branch_id
app.put('/orphanagebranch/:branch_id', (req, res) => {
  const { branch_id } = req.params;
  const {  Orphanage_id, Address, city, Capacity, N_room, No_washrooms, No_showers, No_hall, No_gates, size, no_of_stories, No_orphans, date_time, available_space  } = req.body;

  const sql = `
      UPDATE orphanage_branch
      SET Orphanage_id = ?, Address = ?, city = ?, Capacity = ?, N_room = ?, No_washrooms = ?, No_showers = ?, No_hall = ?, No_gates = ?, size = ?, no_of_stories = ?
      WHERE branch_id = ?
  `;

  db.query(sql, [Orphanage_id, Address, city, Capacity, N_room, No_washrooms, No_showers, No_hall, No_gates, size, no_of_stories, branch_id], (err, result) => {
      if (err) {
          console.error('Error updating orphanage_branch: ' + err.stack);
          res.status(500).send('Error updating orphanage_branch');
          return;
      }
      const insertCapacitySql = 'UPDATE `orphanage_branch_capacity` SET `No_orphans`=?,`date_time`=?,`available_space`=? WHERE `branch_id`=?;'

      db.query(insertCapacitySql, [ No_orphans, date_time, available_space,branch_id], (err, result) => {
          if (err) {
              console.error('Error inserting into orphanage_branch_capacity:', err);
              return res.status(500).send('Error inserting into orphanage_branch_capacity');
          }
          return res.status(201).send('Orphanage branch and capacity Updated successfully');
      });
  });
});

// DELETE /orphanagebranch/:Orphanage_id/:branch_id
app.delete('/Orphanage_branches/:branch_id', (req, res) => {
  const { branch_id } = req.params;

  const sql = `
      DELETE FROM orphanage_branch
      WHERE branch_id = ?
  `;

  db.query(sql, [branch_id], (err, result) => {
      if (err) {
          console.error('Error deleting orphanage_branch: ' + err.stack);
          res.status(500).send('Error deleting orphanage_branch');
          return;
      }
      res.status(200).send('Orphanage branch deleted successfully');
  });
});

app.get('/orphanagebranch', (req, res) => {
  const sql = 'SELECT `branch_id` as id,`Orphanage_id`, `branch_id`, `Address`, `city`, `Capacity`, `N_room`, `No_washrooms`, `No_showers`, `No_hall`, `No_gates`, `size`, `no_of_stories` FROM orphanage_branch';

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error retrieving orphanage branches: ' + err.stack);
          res.status(500).send('Error retrieving orphanage branches');
          return;
      }
      res.json(results);
  });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
const bcrypt = require('bcryptjs');

const fs = require('fs');
const path = require('path');

// Redirect console output to a log file
const logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });
console.log = (...args) => logStream.write(`${new Date().toISOString()} - ${args.join(' ')}\n`);

app.get('/orphanages', (req, res) => {
  db.query('SELECT Orphanage_id as id,name,email,contact,city,image FROM orphanage', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving orphanages' });
    } else {
      res.send(results);
    }
  });
});

app.get('/orphanages/:id/branches', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM orphanage_branch WHERE Orphanage_id = ${id}`;
  db.query(sql, (err, result) => {
      if (err) {
          console.error(`Error fetching branches for orphanage with id ${id}:`, err);
          res.status(500).json({ error: `Failed to fetch branches for orphanage with id ${id}` });
      } else {
          res.json(result);
      }
  });
});



app.post('/newOrphanage', (req, res) => {
  const { image, name, email, contact, city, web, address, licence_no, otherImages, bank_details_img, Licence_img } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).send({ message: 'Error starting transaction' });
    }

    db.query('INSERT INTO orphanage (name, address, city, contact, email, web, licence_no, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, contact, email, web, licence_no, image],
      (err, result) => {
        if (err) {
          console.error('Error inserting orphanage:', err);
          return db.rollback(() => {
            res.status(500).send({ message: 'Error creating orphanage' });
          });
        }

        const orphanageId = result.insertId;

        db.query('INSERT INTO orphanage_doc (Orphanage_id, Licence_img, bank_details_img) VALUES (?, ?, ?)',
          [orphanageId, Licence_img, bank_details_img],
          (err, result) => {
            if (err) {
              console.error('Error inserting orphanage documents:', err);
              return db.rollback(() => {
                res.status(500).send({ message: 'Error inserting orphanage documents' });
              });
            }

            const imagesInsertPromises = otherImages.map(image => {
              return new Promise((resolve, reject) => {
                db.query('INSERT INTO orphanage_images (orphanage_id, image) VALUES (?, ?)',
                  [orphanageId, image],
                  (err, result) => {
                    if (err) {
                      console.error('Error inserting orphanage image:', err);
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  });
              });
            });

            Promise.all(imagesInsertPromises)
              .then(() => {
                db.commit((err) => {
                  if (err) {
                    console.error('Error committing transaction:', err);
                    return db.rollback(() => {
                      res.status(500).send({ message: 'Error committing transaction' });
                    });
                  }
                  res.status(200).json({ message: 'Orphanage inserted successfully' });
                });
              })
              .catch((err) => {
                db.rollback(() => {
                  console.error('Error inserting orphanage images:', err);
                  res.status(500).send({ message: 'Error inserting orphanage images' });
                });
              });
          });
      });
  });
});



// Get an orphanage by ID
app.get('/orphanages/:id', (req, res) => {
  const id = req.params.id;
  db.query(`SELECT o.*, od.*
  FROM orphanage o
  LEFT JOIN orphanage_doc od ON o.Orphanage_id = od.Orphanage_id
  WHERE o.Orphanage_id = ?`, id, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving orphanage' });
    } else {
      res.send(results[0]);
    }
  });
});

app.get('/orphanages_img/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM `orphanage_images` where Orphanage_id = ?', id, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving orphanage' });
    } else {
      res.send(results);
    }
  });
});

// Update an orphanage
app.put('/orphanages/:id', (req, res) => {
  const id = req.params.id;
  const {
    name,
    address,
    city,
    contact,
    email,
    web,
    licence_no,
    image,
    otherImages, // Assuming this is an array of strings for other images
    bank_details_img,
    Licence_img
  } = req.body;
  
  // Start transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).send({ message: 'Error starting transaction' });
    }

    // Update main orphanage details
    db.query(
      'UPDATE orphanage SET name = ?, address = ?, city = ?, contact = ?, email = ?, web = ?, licence_no = ?, image = ? WHERE Orphanage_id = ?',
      [name, address, city, contact, email, web, licence_no, image, id], // Ensure correct order and number of parameters
      (err, result) => {
        if (err) {
          console.error('Error updating orphanage:', err);
          return db.rollback(() => {
            res.status(500).send({ message: 'Error updating orphanage' });
          });
        }

        // Delete existing images for the orphanage
        db.query('DELETE FROM orphanage_images WHERE orphanage_id = ?', [id], (err, result) => {
          if (err) {
            console.error('Error deleting existing images:', err);
            return db.rollback(() => {
              res.status(500).send({ message: 'Error deleting existing images' });
            });
          }
          db.query('DELETE FROM orphanage_doc WHERE orphanage_id = ?', [id], (err, result) => {
            if (err) {
              console.error('Error deleting existing images:', err);
              return db.rollback(() => {
                res.status(500).send({ message: 'Error deleting existing images' });
              });
            }
          // Insert new images for the orphanage
          // Assuming otherImages is an array of strings containing image URLs or paths
const imagesInsertPromises = otherImages.map(image => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO orphanage_images (orphanage_id, image) VALUES (?, ?)',
      [id, image.image], // Replace orphanageId with your actual variable holding orphanage ID
      (err, result) => {
        if (err) {
          console.error('Error inserting orphanage image:', err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
});

// Execute all image insert promises
Promise.all(imagesInsertPromises)
  .then(() => {
    // Insert or update orphanage documents
    db.query(
      'INSERT INTO orphanage_doc (Orphanage_id, Licence_img, bank_details_img) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Licence_img = VALUES(Licence_img), bank_details_img = VALUES(bank_details_img)',
      [id, Licence_img, bank_details_img],
      (err, result) => {
        if (err) {
          console.error('Error inserting or updating orphanage documents:', err);
          return db.rollback(() => {
            res.status(500).send({ message: 'Error inserting or updating orphanage documents' });
          });
        }

        // Commit transaction
        db.commit((err) => {
          if (err) {
            console.error('Error committing transaction:', err);
            return db.rollback(() => {
              res.status(500).send({ message: 'Error committing transaction' });
            });
          }
          res.status(200).json({ message: 'Orphanage updated successfully' });
        });
      }
    );
  })
  .catch((err) => {
    db.rollback(() => {
      console.error('Error inserting orphanage images:', err);
      res.status(500).send({ message: 'Error inserting orphanage images' });
    });
  });

        });
      }
    );
  });
});
});




// Delete an orphanage
app.delete('/Orphanage/:id', (req, res) => {
  const id = req.params.id;

  // Delete from orphanage table
  db.query('DELETE FROM orphanage WHERE Orphanage_id = ?', id, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting orphanage' });
    } else {
      // Delete from orphanage_doc table
      db.query('DELETE FROM orphanage_doc WHERE Orphanage_id = ?', id, (err, results) => {
        if (err) {
          res.status(500).send({ message: 'Error deleting orphanage documents' });
        } else {
          // Delete from orphanage_branch_capacity table using branch_id from orphanage_branch table
          db.query('DELETE FROM orphanage_branch_capacity WHERE branch_id IN (SELECT branch_id FROM orphanage_branch WHERE Orphanage_id = ?)', id, (err, results) => {
            if (err) {
              res.status(500).send({ message: 'Error deleting orphanage branch capacities' });
            } else {
              // Delete from orphanage_branch table
              db.query('DELETE FROM orphanage_branch WHERE Orphanage_id = ?', id, (err, results) => {
                if (err) {
                  res.status(500).send({ message: 'Error deleting orphanage branches' });
                } else {
                  // Delete from orphanage_images table
                  db.query('DELETE FROM orphanage_images WHERE Orphanage_id = ?', id, (err, results) => {
                    if (err) {
                      res.status(500).send({ message: 'Error deleting orphanage images' });
                    } else {
                      res.send({ message: 'Orphanage and related data deleted successfully' });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});



app.get('/staff', (req, res) => {
  const query = `
    SELECT
      s.id,
      s.name,
      s.email,
      s.phone,
      s.country,
      s.city,
      s.state,
      s.Zip,
      s.address,
      s.password,
      s.salary,
      s.image,
      s.orphanage_id,
      s.Joinning_date,
      s.date_of_birth,
      s.staff_type,
      e.Department_id,
      e.Emp_no
    FROM
      staff s
    INNER JOIN
      employees e ON s.id = e.staff_id
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ message: 'Error retrieving staff' });
    } else {
      res.send(results);
    }
  });
});


app.get('/staff/:id', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT
      s.id,
      s.name,
      s.email,
      s.phone,
      s.country,
      s.city,
      s.state,
      s.Zip,
      s.address,
      s.password,
      s.salary,
      s.image,
      s.orphanage_id,
      s.Joinning_date,
      s.date_of_birth,
      s.staff_type,
      e.Department_id,
      e.Emp_no,
      d.vehicle_id
    FROM
      staff s
    INNER JOIN
      employees e ON s.id = e.staff_id
    LEFT JOIN
      driver d ON s.id = d.staff_id
    WHERE
      s.id = ?;
  `;
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ message: 'Error retrieving staff member' });
    } else {
      if (results.length === 0) {
        res.status(404).send({ message: 'Staff member not found' });
      } else {
        res.send(results[0]);
      }
    }
  });
});



// POST endpoint to allocate a vehicle
app.post('/allocation_vehicle/:id', (req, res) => {
  const { id } = req.params;
  const { vehicle_id } = req.body;

  db.query('DELETE FROM `driver` WHERE staff_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting existing allocation:', err);
      return res.status(500).json({ success: false, error: 'Failed to allocate vehicle' });
    }

    db.query('INSERT INTO driver (staff_id, vehicle_id) VALUES (?, ?)', [id, vehicle_id], (err, result) => {
      if (err) {
        console.error('Error inserting new allocation:', err);
        return res.status(500).json({ success: false, error: 'Failed to allocate vehicle' });
      }

      return res.status(200).json({ success: true, message: 'Vehicle allocated successfully' });
    });
  });
});


// Update a staff member
app.put('/staff/:id', (req, res) => {
  const id = req.params.id;
  const { name, address, image, phone, email, date_of_birth, orphanage_id, Joinning_date, Resigning_date, salary, country, city, State, Zip, staff_type,Department_id,Emp_no } = req.body;

  const values = [
    name,
    address,
    image,
    phone,
    email,
    date_of_birth,
    orphanage_id,
    Joinning_date,
    Resigning_date,
    salary,
    country,
    city,
    State,
    Zip,
    staff_type,
    id  // id should be the last parameter in the array for WHERE clause
  ];

  const query = `
    UPDATE staff 
    SET 
      name = ?, 
      address = ?, 
      image = ?, 
      phone = ?, 
      email = ?, 
      date_of_birth = ?, 
      orphanage_id = ?, 
      Joinning_date = ?, 
      Resigning_date = ?, 
      salary = ?, 
      country = ?, 
      City = ?, 
      State = ?, 
      Zip = ?, 
      staff_type = ? 
    WHERE 
      id = ?
  `;
  const query1 = 'UPDATE `employees` SET `Department_id`=?,`Staff_type`=?,`Emp_no`=? WHERE staff_id = ?'
  const values1 = [
    Department_id,
    staff_type,
    Emp_no,
    id
  ]
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating staff member:', err);
      res.status(500).send({ message: 'Error updating staff member' });
    } else {
      db.query(query1, values1, (err, results) => {
        if (err) {
          console.error('Error updating staff member:', err);
          res.status(500).send({ message: 'Error updating staff member' });
        } else {
      
      res.send({ message: 'Staff member updated successfully' });}
    })
    }
  });
});



app.post("/adminlogin", async (req, res) => {
  const sql = "SELECT id, first_name, last_name, image,username, password FROM `admins` WHERE username=?";
  const username = req.body.username;
  const password = req.body.password;
  db.query(sql, [username], async (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (data.length === 0) {
          return res.json({ success: false, error: 'Invalid username or password' });
      }
      const user = data[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
          return res.json({success: true, data});
      } else {
          return res.json({ success: false, error: 'Invalid username or password' });
      }
  });
});

// Delete a staff member
app.delete('/staff/:id', (req, res) => {
  const id = req.params.id;

  // Assuming you have a configured db object with proper connection settings
  const sql1 = 'DELETE FROM employees WHERE staff_id = ?';
  const sql2 = 'DELETE FROM staff WHERE id = ?';
  
  db.query(sql1, [id], (err1, results1) => {
    if (err1) {
      console.error('Error deleting from employees:', err1);
      return res.status(500).send({ message: 'Error deleting staff member' });
    }

    db.query(sql2, [id], (err2, results2) => {
      if (err2) {
        console.error('Error deleting from staff:', err2);
        return res.status(500).send({ message: 'Error deleting staff member' });
      }

      if (results2.affectedRows === 0) {
        return res.status(404).send({ message: 'Staff member not found' });
      }

      res.send({ message: 'Staff member deleted successfully' });
    });
  });
});




app.post('/signup', async (req, res) => {
  try {
      const sql = "INSERT INTO `staff`(`name`, `address`, `image`, `phone`, `email`, `date_of_birth`, `orphanage_id`, `Joinning_date`, `salary`, `password`, `country`, `City`, `State`, `Zip`, `staff_type`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // const escapeHashed = '\'+hashedPassword
      console.log("HashedPassword: ", hashedPassword)
      const values = [
          req.body.name,
          req.body.address,
          req.body.image,
          req.body.phone,
          req.body.email,
          req.body.date_of_birth,
          req.body.orphanage_id,
          req.body.Joinning_date,
          req.body.Salary,
          hashedPassword,
          req.body.country,
          req.body.city,
          req.body.state,
          req.body.zip_code,
          req.body.staff_type
      ];

      db.query(sql, values, (err, data) => {
          if (err) {
              console.error("Error occurred:", err);
              return res.status(500).json({ error: "Failed to create account" });
          }
          id = data.insertId;
          const query1 = 'INSERT INTO `employees`(`Department_id`, `Staff_type`, `staff_id`, `Emp_no`) VALUES (?,?,?,?)'
  const values1 = [
    req.body.Department_id,
    req.body.staff_type,
    id,
    req.body.Emp_no    
  ]
  db.query(query1, values1, (err, results) => {
    if (err) {
      console.error('Error adding staff member:', err);
      res.status(500).send({ message: 'Error Adding staff member' });
    } else {
      console.log("Account created successfully");
          return res.json(data);
    }}
  ) 
      });
  } catch (error) {
      console.error("Error occurred:", error);
      return res.status(500).json({ error: "Failed to create account" });
  }
});


// Get all volunteers
app.get('/volunteers', (req, res) => {
  db.query('SELECT * FROM volunteers', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving volunteers' });
    } else {
      res.send(results);
    }
  });
});

// Create a new volunteer
app.post('/volunteers', (req, res) => {
  const { name, email, phone, orphanage_id } = req.body;
  db.query('INSERT INTO volunteers SET?', { name, email, phone, orphanage_id }, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error creating volunteer' });
    } else {
      res.send({ message: 'Volunteer created successfully' });
    }
  });
});

// Get a volunteer by ID
app.get('/volunteers/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM volunteers WHERE id =?', id, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving volunteer' });
    } else {
      res.send(results[0]);
    }
  });
});

// Update a volunteer
app.put('/volunteers/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, phone, orphanage_id } = req.body;
  db.query('UPDATE volunteers SET name =?, email =?, phone =?, orphanage_id =? WHERE id =?', [name, email, phone, orphanage_id, id], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error updating volunteer' });
    } else {
      res.send({ message: 'Volunteer updated successfully' });
    }
  });
});

// Delete a volunteer
app.delete('/volunteers/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM volunteers WHERE id =?', id, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting volunteer' });
    } else {
      res.send({ message: 'Volunteer deleted successfully' });
    }
  });
});

// Get all events
app.get('/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving events' });
    } else {
      res.send(results);
    }
  });
});

// Create a new event
app.post('/events', (req, res) => {
  const { title, date, description, orphanage_id } = req.body;
  db.query('INSERT INTO events SET?', { title, date, description, orphanage_id }, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error creating event' });
    } else {
      res.send({ message: 'Event created successfully' });
    }
  });
});

// Get an event by ID
app.get('/events/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM events WHERE id =?', id, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving event' });
    } else {
      res.send(results[0]);
    }
  });
});

// Update an event
app.put('/events/:id', (req, res) => {
  const id = req.params.id;
  const { title, date, description, orphanage_id } = req.body;
  db.query('UPDATE events SET title =?, date =?, description =?, orphanage_id =? WHERE id =?', [title, date, description, orphanage_id, id], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error updating event' });
    } else {
      res.send({ message: 'Event updated successfully' });
    }
  });
});

// Delete an event
app.delete('/events/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM events WHERE id =?', id, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting event' });
    } else {
      res.send({ message: 'Event deleted successfully' });
    }
  });
});

// Get all gallery items
app.get('/gallery', (req, res) => {
  db.query('SELECT * FROM gallery', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving gallery items' });
    } else {
      res.send(results);
    }
  });
});

// Create a new gallery item
app.post('/gallery', (req, res) => {
  const { image, description, orphanage_id } = req.body;
  db.query('INSERT INTO gallery SET?', { image, description, orphanage_id }, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error creating gallery item' });
    } else {
      res.send({ message: 'Gallery item created successfully' });
    }
  });
});

// Get a gallery item by ID
app.get('/gallery/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM gallery WHERE id =?', id, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving gallery item' });
    } else {
      res.send(results[0]);
    }
  });
});

// Update a gallery item
app.put('/gallery/:id', (req, res) => {
  const id = req.params.id;
  const { image, description, orphanage_id } = req.body;
  db.query('UPDATE gallery SET image =?, description =?, orphanage_id =? WHERE id =?', [image, description, orphanage_id, id], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error updating gallery item' });
    } else {
      res.send({ message: 'Gallery item updated successfully' });
    }
  });
});

// Delete a gallery item
app.delete('/gallery/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM gallery WHERE id =?', id, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting gallery item' });
    } else {
      res.send({ message: 'Gallery item deleted successfully' });
    }
  });
});



// Create a room accommodation
app.post('/rooms', (req, res) => {
  const { capacity, branch_id, type } = req.body;
  const insertSql = `INSERT INTO room_accommodation (capacity, branch_id, type) VALUES ( ?, ?, ?)`;
  db.query(insertSql, [capacity, branch_id, type], (err, result) => {
    if (err) {
      console.error('Error inserting room accommodation:', err);
      res.status(500).send('Error inserting room accommodation');
      return;
    }
    res.status(201).send('Room accommodation created successfully');
  });
});

// Read all room accommodations
app.get('/rooms', (req, res) => {
  const selectSql = 'SELECT `Room_id` as id, `capacity`, `branch_id`, `type` FROM room_accommodation';
  db.query(selectSql, (err, results) => {
    if (err) {
      console.error('Error fetching room accommodations:', err);
      res.status(500).send('Error fetching room accommodations');
      return;
    }
    res.status(200).json(results);
  });
});

app.get('/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  const selectSql = 'SELECT `Room_id` as id, `capacity`, `branch_id`, `type` FROM room_accommodation WHERE `Room_id` = ?';
  db.query(selectSql, [roomId], (err, results) => {
    if (err) {
      console.error('Error fetching room by ID:', err);
      res.status(500).send('Error fetching room by ID');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Room not found');
      return;
    }
    res.status(200).json(results[0]);
  });
});

// Update a room accommodation
app.put('/rooms/:Room_id', (req, res) => {
  const { Room_id } = req.params;
  const { capacity, branch_id, type } = req.body;
  const updateSql = `UPDATE room_accommodation SET capacity = ?, branch_id = ?, type = ? WHERE Room_id = ?`;
  db.query(updateSql, [capacity, branch_id, type, Room_id], (err, result) => {
    if (err) {
      console.error('Error updating room accommodation:', err);
      res.status(500).send('Error updating room accommodation');
      return;
    }
    res.status(200).send('Room accommodation updated successfully');
  });
});

// Delete a room accommodation
app.delete('/rooms/:Room_id', (req, res) => {
  const { Room_id } = req.params;
  const deleteSql = `DELETE FROM room_accommodation WHERE Room_id = ?`;
  db.query(deleteSql, [Room_id], (err, result) => {
    if (err) {
      console.error('Error deleting room accommodation:', err);
      res.status(500).send('Error deleting room accommodation');
      return;
    }
    const deleteHostelSql = 'DELETE FROM office_room WHERE Room_id = ?';
    db.query(deleteHostelSql, [Room_id], (err, result) => {
      if (err) {console.error('Error deleting room accommodation:', err);
        res.status(500).send('Error deleting room accommodation');
        return;
      }
      const deleteHostelSql1 = 'DELETE FROM hostel WHERE Room_id = ?';
      db.query(deleteHostelSql1, [Room_id], (err, result) => {
        if (err) {console.error('Error deleting room accommodation:', err);
          res.status(500).send('Error deleting room accommodation');
          return;
        }
      });
      res.status(200).send('Room accommodation deleted successfully');
    });
  });
});

// Route to fetch bed allocations based on room type and room ID
app.get('/bedallocations/:type/:roomId', (req, res) => {
  const { type, roomId } = req.params;

  let sql = '';
  let params = [];

  if (type === 'hostel') {
    sql = 'SELECT * FROM hostel WHERE room_id = ?';
    params = [roomId];
  } else if (type === 'office') {
    sql = 'SELECT * FROM office_room WHERE Room_id = ?';
    params = [roomId];
  } else {
    return res.status(400).json({ error: 'Invalid room type' });
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error fetching bed allocations:', err);
      return res.status(500).json({ error: 'Error fetching bed allocations' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No bed allocations found' });
    }

    res.json(results);
  });
});



app.post('/bedallocation', async (req, res) => {
  const bedsData = req.body; // Array of bed allocation objects

  try {
    // Start a transaction
    await db.beginTransaction();

    for (const bed of bedsData) {
      const { room_id, bed_no, std_id, date_time, type } = bed;
      const roomType = type;

      // Check if the record exists and delete it if it does
      if (roomType === 'hostel') {
        const deleteHostelSql = 'DELETE FROM hostel WHERE room_id = ? AND bed_no = ?';
        await db.query(deleteHostelSql, [room_id, bed_no]);

        // Insert new allocation for hostel
        const insertHostelSql = 'INSERT INTO hostel (room_id, bed_no, std_id, date_time) VALUES (?, ?, ?, ?)';
        await db.query(insertHostelSql, [room_id, bed_no, std_id, date_time]);
      } else if (roomType === 'office') {
        // Check if the record exists for this staff member and room in office_room table
        const deleteHostelSql = 'DELETE FROM office_room WHERE Room_id = ? AND tables = ?';
        await db.query(deleteHostelSql, [room_id, bed_no]);

        // Insert new allocation for office
        const insertOfficeSql = 'INSERT INTO office_room (Room_id, staff_id, tables) VALUES (?, ?, ?)';
        await db.query(insertOfficeSql, [room_id, std_id, bed_no]);
      } else {
        throw new Error('Invalid room type');
      }
    }

    // Commit the transaction
    await db.commit();

    res.status(201).send('Bed allocation successful');
  } catch (error) {
    // Rollback the transaction in case of error
    await db.rollback();
    console.error('Error inserting bed allocation:', error);
    res.status(500).send('Error inserting bed allocation');
  }
});



app.get('/child', (req, res) => {
  const sql = 'SELECT `child_id` as id,`child_id`, `branch_id`, `DOB`, `register_time`, `Name`, `f_name`, `M_name`, `Siblings`, `F_cnic`, `M_cnic`, `cnic`, `mailing_address`, `emergency_contact`, `image` FROM child';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching child records:', err);
      return res.status(500).json({ error: 'Error fetching child records' });
    }

    res.json(results); // Send JSON response with child records
  });
});

app.post('/donor', (req, res) => {
  const { name, country, city, cnic, passport, contact, email, address, street_1, street_2, region, postal_code } = req.body;

  const sql = 'INSERT INTO donor (name, country, city, cnic, passport, contact, email, address, street_1, street_2, region, posatal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, country, city, cnic, passport, contact, email, address, street_1, street_2, region, postal_code], (err, result) => {
    if (err) {
      console.error('Error adding donor:', err);
      return res.status(500).json({ error: 'Error adding donor' });
    }

    res.status(201).json({ donorId: result.insertId });
  });
});

app.get('/api/children', (req, res) => {
  const query = `
    SELECT c.child_id, c.Name, c.image
    FROM child c
    LEFT JOIN child_adoption ca ON c.child_id = ca.child_id
    WHERE ca.child_id IS NULL OR ca.ExpiryDate < CURDATE()
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching children: ', err);
      res.status(500).send('Error fetching children');
    } else {
      res.json(results);
    }
  });
});


// Define the endpoint for fetching adopted children
app.get('/adopted-children', (req, res) => {
  const query = `
SELECT 
  c.child_id AS child_id, 
  c.branch_id, 
  c.DOB, 
  c.register_time, 
  c.Name, 
  c.f_name, 
  c.M_name, 
  c.Siblings, 
  c.F_cnic, 
  c.M_cnic, 
  c.cnic, 
  c.mailing_address, 
  c.emergency_contact, 
  c.image, 
  ca.id AS id, 
  ca.Date AS adoption_date, 
  ca.time AS adoption_time, 
  ca.ExpiryDate AS adoption_expiry_date, 
  ca.donation_id, 
  d.name AS donor_name,
  d.donor_id AS donor_id
FROM 
  child c 
JOIN 
  child_adoption ca 
ON 
  c.child_id = ca.child_id
JOIN 
  donation dn 
ON 
  ca.donation_id = dn.donation_id
JOIN 
  donor d 
ON 
  dn.donor_id = d.donor_id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});


app.get('/api/summary', (req, res) => {
  const queries = {
    orphanages: 'SELECT COUNT(*) as count FROM orphanage',
    branches: 'SELECT COUNT(*) as count FROM orphanage_branch',
    children: 'SELECT COUNT(*) as count FROM child',
    staff: 'SELECT COUNT(*) as count FROM staff',
    totalDonations: 'SELECT SUM(amount) as total FROM donation',
    totalExpenses: 'SELECT SUM(Amount) as total FROM expenses'
  };

  const promises = Object.keys(queries).map(key => {
    return new Promise((resolve, reject) => {
      db.query(queries[key], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ [key]: results[0].count || results[0].total });
        }
      });
    });
  });

  Promise.all(promises)
    .then(results => {
      const summary = results.reduce((acc, result) => ({ ...acc, ...result }), {});
      res.json(summary);
    })
    .catch(error => {
      console.error('Error fetching summary data:', error);
      res.status(500).json({ error: 'Error fetching summary data' });
    });
});

app.get('/api/donations', (req, res) => {
  // SQL query to fetch last 6 days' donation records
  const sql = `
    SELECT date AS name, SUM(amount) AS Total
    FROM donation
    WHERE date >= CURDATE() - INTERVAL 6 DAY
    GROUP BY DATE(date)
    ORDER BY DATE(date) DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching donations:', err);
      res.status(500).json({ error: 'Error fetching donations' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to handle donation submission
app.post('/donation', (req, res) => {
  const donation = req.body;

  const donationQuery = `
    INSERT INTO donation (donor_id, branch_id, amount, date, time, method, transaction_id, purpose)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(donationQuery, [
    donation.donor_id,
    donation.branch_id,
    donation.amount,
    donation.date,
    donation.time,
    donation.method,
    donation.transaction_id,
    donation.purpose
  ], (err, results) => {
    if (err) {
      console.error('Error inserting donation: ', err);
      res.status(500).send('Error inserting donation');
    } else {
      const donationId = results.insertId;
      if (donation.purpose === 'adoption' && donation.child_id) {
        const adoptionQuery = `
          INSERT INTO child_adoption (Date, time, ExpiryDate, donation_id, child_id)
          VALUES (?, ?, DATE_ADD(?, INTERVAL FLOOR(? / 7000) MONTH), ?, ?)
        `;
        const donationDate = new Date(donation.date);
        const expiryDate = new Date(donationDate);
        expiryDate.setMonth(donationDate.getMonth() + Math.floor(donation.amount / 7000));

        db.query(adoptionQuery, [
          donation.date,
          donation.time,
          donation.date,
          donation.amount,
          donationId,
          donation.child_id
        ], (err) => {
          if (err) {
            console.error('Error inserting adoption: ', err);
            res.status(500).send('Error inserting adoption');
          } else {
            res.send('Donation with adoption submitted successfully');
          }
        });
      } else {
        res.send('Donation submitted successfully');
      }
    }
  });
});

// GET endpoint to fetch a single child by ID
app.get('/child/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT `child_id` as id,`child_id`, `branch_id`, `DOB`, `register_time`, `Name`, `f_name`, `M_name`, `Siblings`, `F_cnic`, `M_cnic`, `cnic`, `mailing_address`, `emergency_contact`, `image` FROM child WHERE child_id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(`Error fetching child with id ${id}:`, err);
      return res.status(500).json({ error: `Error fetching child with id ${id}` });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: `Child with id ${id} not found` });
    }

    res.json(results[0]); // Send JSON response with the child record
  });
});

app.post('/child', async (req, res) => {
  const {
    branch_id,
    DOB,
    register_time,
    Name,
    f_name,
    M_name,
    Siblings,
    F_cnic,
    M_cnic,
    cnic,
    mailing_address,
    emergency_contact,
    image
  } = req.body;
  try {
    const sql = `
      INSERT INTO child (
        branch_id, DOB, register_time, Name, f_name, M_name, 
        Siblings, F_cnic, M_cnic, cnic, mailing_address, emergency_contact, image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await db.query(sql, [
      branch_id,
      DOB,
      register_time,
      Name,
      f_name,
      M_name,
      Siblings,
      F_cnic,
      M_cnic,
      cnic,
      mailing_address,
      emergency_contact,
      image
    ]);

    const newChildId = result.insertId;
    try {
      const sql1 = 'UPDATE `orphanage_branch_capacity` SET `available_space`= `available_space`+1 WHERE branch_id = ?';
      const result = await db.query(sql1, [
        branch_id
      ]);
    res.status(201).json({ message: 'Child added successfully', child_id: newChildId });
  } catch (error) {
    console.error('Error adding child:', error.message);
    res.status(500).json({ error: 'Error adding child' });
  }
  }
  
  catch (error) {
    console.error('Error adding child:', error.message);
    res.status(500).json({ error: 'Error adding child' });
  }
});

app.put('/child/:childId', async (req, res) => {
  const { childId } = req.params;
  const {
    branch_id,
    DOB,
    register_time,
    Name,
    f_name,
    M_name,
    Siblings,
    F_cnic,
    M_cnic,
    cnic,
    mailing_address,
    emergency_contact,
    image
  } = req.body;

  try {
    const sql = `
      UPDATE child
      SET 
        branch_id = ?, DOB = ?, register_time = ?, Name = ?, f_name = ?, M_name = ?, 
        Siblings = ?, F_cnic = ?, M_cnic = ?, cnic = ?, mailing_address = ?, emergency_contact = ?, image = ?
      WHERE 
        child_id = ?
    `;
    await db.query(sql, [
      branch_id,
      DOB,
      register_time,
      Name,
      f_name,
      M_name,
      Siblings,
      F_cnic,
      M_cnic,
      cnic,
      mailing_address,
      emergency_contact,
      image,
      childId
    ]);
    res.json({ message: 'Child updated successfully' });
  } catch (error) {
    console.error('Error updating child:', error.message);
    res.status(500).json({ error: 'Error updating child' });
  }
});

// DELETE: DELETE endpoint to delete a child record
app.delete('/child/:childId', async (req, res) => {
  const { childId } = req.params;
  try {
    const sql = `
      DELETE FROM child
      WHERE child_id = ?
    `;
    await db.query(sql, [childId]);

    res.json({ message: 'Child deleted successfully' });
  } catch (error) {
    console.error('Error deleting child:', error.message);
    res.status(500).json({ error: 'Error deleting child' });
  }
});


// Create a new vehicle
app.post('/vehicles', (req, res) => {
  const vehicleData = req.body;
  const query = `
    INSERT INTO vehicle (Model, year, number, engin_no, chasses_no, color, type, no_passanger, loadweight, fuel_capacity, top_speed, location, fuel_type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    vehicleData.Model,
    vehicleData.year,
    vehicleData.number,
    vehicleData.engin_no,
    vehicleData.chasses_no,
    vehicleData.color,
    vehicleData.type,
    vehicleData.no_passanger,
    vehicleData.loadweight,
    vehicleData.fuel_capacity,
    vehicleData.top_speed,
    vehicleData.location,
    vehicleData.fuel_type,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting vehicle:', err);
      res.status(500).send('Error inserting vehicle');
      return;
    }
    res.send('Vehicle inserted successfully');
  });
});



// Get all vehicles
app.get('/vehicles', (req, res) => {
  const query = 'SELECT `Vehicle_id` as id,`Vehicle_id`, `Model`, `year`, `number`, `engin_no` FROM vehicle';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving vehicles:', err);
      res.status(500).send('Error retrieving vehicles');
      return;
    }
    res.send(results);
  });
});

app.get('/donor', (req, res) => {
  const query = 'SELECT `donor_id` as id, `name`, `country`, `city`, `cnic`, `passport`, `contact`, `email`, `Address`, `street_1`, `street_2`, `region`, `posatal_code` FROM `donor` WHERE 1';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving vehicles:', err);
      res.status(500).send('Error retrieving vehicles');
      return;
    }
    res.send(results);
  });
});

// Get a vehicle by ID
app.get('/vehicles/:id', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT * FROM vehicle WHERE Vehicle_id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving vehicle:', err);
      res.status(500).send('Error retrieving vehicle');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Vehicle not found');
      return;
    }
    res.send(results[0]);
  });
});

// Update a vehicle by ID
app.put('/vehicles/:id', (req, res) => {
  const id = req.params.id;
  const vehicleData = req.body;
  const query = `
    UPDATE vehicle
    SET Model = ?, year = ?, number = ?, engin_no = ?, chasses_no = ?, color = ?, type = ?, no_passanger = ?, loadweight = ?, fuel_capacity = ?, top_speed = ?, location = ?, fuel_type = ?
    WHERE Vehicle_id = ?
  `;
  const values = [
    vehicleData.Model,
    vehicleData.year,
    vehicleData.number,
    vehicleData.engin_no,
    vehicleData.chasses_no,
    vehicleData.color,
    vehicleData.type,
    vehicleData.no_passanger,
    vehicleData.loadweight,
    vehicleData.fuel_capacity,
    vehicleData.top_speed,
    vehicleData.location,
    vehicleData.fuel_type,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating vehicle:', err);
      res.status(500).send('Error updating vehicle');
      return;
    }
    res.send('Vehicle updated successfully');
  });
});

// Delete a vehicle by ID
app.delete('/vehicles/:id', (req, res) => {
  const id = req.params.id;
  const query = `
    DELETE FROM vehicle WHERE Vehicle_id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting vehicle:', err);
      res.status(500).send('Error deleting vehicle');
      return;
    }
    res.send('Vehicle deleted successfully');
  });
});


app.post('/addFuel/:vehicle_id', (req, res) => {
  const { vehicle_id } = req.params;
  const { time, date, pump, pump_location, liters, rate, total_price } = req.body;

  const sql = 'INSERT INTO vehicle_fueling (vehicle_id, time, date, pump, pump_location, liters, rate, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [vehicle_id, time, date, pump, pump_location, liters, rate, total_price];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting fuel record:', err);
      res.status(500).send({ message: 'Error inserting fuel record' });
    } else {
      res.status(201).send({ message: 'Fuel record added successfully' });
    }
  });
});

// Read all fuel records
app.get('/fuelRecords/:vehicle_id', (req, res) => {
  const sql = 'SELECT * FROM vehicle_fueling where vehicle_id= ?';
  const { vehicle_id } = req.params;
  db.query(sql, vehicle_id , (err, results) => {
    if (err) {
      console.error('Error retrieving fuel records:', err);
      res.status(500).send({ message: 'Error retrieving fuel records' });
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/vehicle_roster', (req, res) => {
  const query = 'SELECT `id`,`Vehicle_id`, `time_in`, `time_out`, `off_days` FROM `vehicle_roster`';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ message: 'Error retrieving vehicle roster entries' });
    } else {
      res.send(results);
    }
  });
});

app.put('/vehicle_roster/:id', (req, res) => {
  const id = req.params.id;
  const { Vehicle_id, time_in, time_out, off_days } = req.body;
  const sql = `UPDATE vehicle_roster SET Vehicle_id = ?, time_in = ?, time_out = ?, off_days = ? WHERE id = ?`;
  db.query(sql, [Vehicle_id, time_in, time_out, off_days, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send({ message: 'Failed to update vehicle roster entry' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send({ message: `Updated vehicle roster entry with ID ${id}` });
      } else {
        res.status(404).send({ message: `Vehicle roster entry with ID ${id} not found` });
      }
    }
  });
});


// Route to get a specific vehicle roster entry by ID
app.get('/vehicle_roster/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT `id`,`Vehicle_id`, `time_in`, `time_out`, `off_days` FROM `vehicle_roster` WHERE `Vehicle_id` = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ message: `Error retrieving vehicle roster entry with ID ${id}` });
    } else {
      if (results.length === 0) {
        res.status(404).send({ message: `Vehicle roster entry with ID ${id} not found` });
      } else {
        res.send(results);
      }
    }
  });
});

// Route to create a new vehicle roster entry
app.post('/vehicle_roster', (req, res) => {
  const { Vehicle_id, time_in, time_out, off_days } = req.body;
  const query = 'INSERT INTO `vehicle_roster` (`Vehicle_id`, `time_in`, `time_out`, `off_days`) VALUES (?, ?, ?, ?)';
  db.query(query, [Vehicle_id, time_in, time_out, off_days], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ message: 'Error adding new vehicle roster entry' });
    } else {
      res.status(201).send({ message: 'Vehicle roster entry added successfully', id: result.insertId });
    }
  });
});


// DELETE endpoint to delete a vehicle roster entry by ID
app.delete('/vehicle_roster/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM vehicle_roster WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send({ message: 'Failed to delete vehicle roster entry' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send({ message: `Deleted vehicle roster entry with ID ${id}` });
      } else {
        res.status(404).send({ message: `Vehicle roster entry with ID ${id} not found` });
      }
    }
  });
});



// Route to get all vehicle routes
app.get('/vehicle_routes', (req, res) => {
  const query = 'SELECT `Vehicle_id`, `pick_up`, `drop_off`, `pick_up_time`, `drop_time` FROM `vehicle_route`';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ message: 'Error retrieving vehicle routes' });
    } else {
      res.send(results);
    }
  });
});

// Route to get a specific vehicle route by ID
app.get('/vehicle_routes/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT `id`,`Vehicle_id`, `pick_up`, `drop_off`, `pick_up_time`, `drop_time` FROM `vehicle_route` WHERE `Vehicle_id` = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ message: `Error retrieving vehicle route with ID ${id}` });
    } else {
      if (results.length === 0) {
        res.status(404).send({ message: `Vehicle route with ID ${id} not found` });
      } else {
        res.send(results);
      }
    }
  });
});

// Route to create a new vehicle route
app.post('/vehicle_routes', (req, res) => {
  const { Vehicle_id, pick_up, drop_off, pick_up_time, drop_time } = req.body;
  const query = 'INSERT INTO `vehicle_route` (`Vehicle_id`, `pick_up`, `drop_off`, `pick_up_time`, `drop_time`) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [Vehicle_id, pick_up, drop_off, pick_up_time, drop_time], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ message: 'Error adding new vehicle route' });
    } else {
      res.status(201).send({ message: 'Vehicle route added successfully', id: result.insertId });
    }
  });
});


// POST endpoint to add vehicle time in/out
app.post('/vehicle_time_in_out', (req, res) => {
  const { Vehicle_id, time_in, time_out } = req.body;
  const sql = `INSERT INTO vehicle_time_in_out (Vehicle_id, time_in, time_out) VALUES (?, ?, ?)`;
  db.query(sql, [Vehicle_id, time_in, time_out], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send({ message: 'Failed to add vehicle time in/out' });
    } else {
      res.status(200).send({ message: 'Vehicle time in/out added successfully' });
    }
  });
});

// GET endpoint to retrieve all vehicle time in/out entriesf
app.get('/vehicle_time_in_out/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT id,Vehicle_id, time_in, time_out FROM vehicle_time_in_out where Vehicle_id = ?`;
  db.query(sql,id, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send({ message: 'Failed to retrieve vehicle time in/out entries' });
    } else {
      res.status(200).send(results);
    }
  });
});



app.post('/expenses', (req, res) => {
  const { expense_type, date, amount, staff_id, recorder_name } = req.body;
  const sql = 'INSERT INTO `expenses` (`Expens_type`, `Date`, `Amount`, `Staff_id`, `Recorder_name`) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [expense_type, date, amount, staff_id, recorder_name], (err, result) => {
      if (err) {
          console.error('Database error:', err);
          res.status(400).send('Error creating expense.');
          return;
      }
      res.status(201).json({ id: result.insertId, expense_type, date, amount, staff_id, recorder_name });
  });
});

// Read all expenses
app.get('/expenses', (req, res) => {
  const sql = 'SELECT `Id` as id, `Expens_type` as expense_type, `Date`, `Amount`, `Staff_id`, `Recorder_name` FROM `expenses`';
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching expenses.');
          return;
      }
      res.json(results);
  });
});

// Read a single expense by ID
app.get('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT `Id`, `Expens_type` as expense_type, DATE_FORMAT(`Date`, "%Y-%m-%d") as Date, `Amount`, `Staff_id`, `Recorder_name` FROM `expenses` WHERE `Id` = ?';
  db.query(sql, [id], (err, results) => {
      if (err) {
          res.status(500).send('Error fetching expense.');
          return;
      }
      if (results.length === 0) {
          res.status(404).send('Expense not found.');
          return;
      }
      res.json(results[0]);
  });
});

// Update an expense
app.put('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { expense_type, Date, Amount, Staff_id, Recorder_name } = req.body;
  const sql = 'UPDATE `expenses` SET `Expens_type` = ?, `Date` = ?, `Amount` = ?, `Staff_id` = ?, `Recorder_name` = ? WHERE `Id` = ?';
  db.query(sql, [expense_type, Date, Amount, Staff_id, Recorder_name, id], (err, result) => {
      if (err) {
          res.status(500).send('Error updating expense.');
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).send('Expense not found.');
          return;
      }
      res.json({ id, expense_type, Date, Amount, Staff_id, Recorder_name });
  });
});

// Delete an expense
app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM `expenses` WHERE `Id` = ?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          res.status(500).send('Error deleting expense.');
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).send('Expense not found.');
          return;
      }
      res.status(200).json({ message: 'Expense deleted.' });
  });
});

// Endpoint to fetch all donations
app.get('/donations', (req, res) => {
  // Query to fetch all donations with donor details
  const query = `
      SELECT d.donor_id, d.name, d.country, d.city, d.cnic, d.passport, 
             d.contact, d.email, d.Address, d.street_1, d.street_2, d.region, d.posatal_code, 
             n.donation_id as id, n.amount, n.date, n.time, n.method, n.transaction_id, n.purpose 
      FROM donor d 
      JOIN donation n ON d.donor_id = n.donor_id`;

  // Execute the query
  db.query(query, (err, results) => {
      if (err) {
          console.log('Error fetching donations:', err);
          return res.status(500).json({ error: 'Error fetching donations' });
      }

      res.json(results);
  });
});

// Endpoint to fetch donor and donation info by donation ID
app.get('/donation/:donation_id', (req, res) => {
  const donation_id = req.params.donation_id;

  // Query to fetch donor and donation details by donation ID
  const query = `
      SELECT d.donor_id, d.name, d.country, d.city, d.cnic, d.passport, 
             d.contact, d.email, d.Address, d.street_1, d.street_2, d.region, d.posatal_code, 
             n.donation_id, n.amount, n.date, n.time, n.method, n.transaction_id, n.purpose 
      FROM donor d 
      JOIN donation n ON d.donor_id = n.donor_id 
      WHERE n.donation_id = ?`;

  // Execute the query
  db.query(query, [donation_id], (err, results) => {
      if (err) {
          console.error('Error fetching donation info:', err);
          return res.status(500).json({ error: 'Error fetching donation info' });
      }

      if (results.length > 0) {
          const donationInfo = {
              donor: {
                  donor_id: results[0].donor_id,
                  name: results[0].name,
                  country: results[0].country,
                  city: results[0].city,
                  cnic: results[0].cnic,
                  passport: results[0].passport,
                  contact: results[0].contact,
                  email: results[0].email,
                  Address: results[0].Address,
                  street_1: results[0].street_1,
                  street_2: results[0].street_2,
                  region: results[0].region,
                  posatal_code: results[0].posatal_code,
              },
              donation: {
                  donation_id: results[0].donation_id,
                  amount: results[0].amount,
                  date: results[0].date,
                  time: results[0].time,
                  method: results[0].method,
                  transaction_id: results[0].transaction_id,
                  purpose: results[0].purpose,
              }
          };
          res.json(donationInfo);
      } else {
          res.status(404).json({ error: 'Donation ID not found' });
      }
  });
});

// Endpoint to update donation info by donation ID
app.put('/donation/:donation_id', (req, res) => {
  const donation_id = req.params.donation_id;
  const { donor_id, branch_id, amount, date, time, method, transaction_id, purpose } = req.body;

  // Update donation in the database
  const query = `
      UPDATE donation 
      SET donor_id = ?, branch_id = ?, amount = ?, date = ?, time = ?, method = ?, transaction_id = ?, purpose = ?
      WHERE donation_id = ?`;

  db.query(query, [donor_id, branch_id, amount, date, time, method, transaction_id, purpose, donation_id], (err, result) => {
      if (err) {
          console.error('Error updating donation:', err);
          return res.status(500).json({ error: 'Error updating donation' });
      }

      if (result.affectedRows > 0) {
          res.json({ message: `Donation ${donation_id} updated successfully` });
      } else {
          res.status(404).json({ error: 'Donation ID not found' });
      }
  });
});

// Endpoint to delete donation by donation ID
app.delete('/donation/:donation_id', (req, res) => {
  const donation_id = req.params.donation_id;

  // Delete donation from the database
  const query = 'DELETE FROM donation WHERE donation_id = ?';
  db.query(query, [donation_id], (err, result) => {
      if (err) {
          console.error('Error deleting donation:', err);
          return res.status(500).json({ error: 'Error deleting donation' });
      }

      if (result.affectedRows > 0) {
          res.json({ message: `Donation ${donation_id} deleted successfully` });
      } else {
          res.status(404).json({ error: 'Donation ID not found' });
      }
  });
});

// Get all campaigns
app.get('/campaign', (req, res) => {
  const query = 'SELECT ID as id, image, title, amount, Description, date_created, status FROM campaign WHERE 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching campaigns:', err);
      return res.status(500).json({ error: 'Error fetching campaigns' });
    }
    res.json(results);
  });
});

// Get a single campaign by ID
app.get('/campaign/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT ID, image, title, amount, Description, date_created, status FROM campaign WHERE ID = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching campaign:', err);
      return res.status(500).json({ error: 'Error fetching campaign' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(results[0]);
  });
});

// Create a new campaign
app.post('/campaign', (req, res) => {
  const { image, title, amount, Description, date_created, status } = req.body;
  const query = 'INSERT INTO campaign (image, title, amount, Description, date_created, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [image, title, amount, Description, date_created, status], (err, results) => {
    if (err) {
      console.error('Error creating campaign:', err);
      return res.status(500).json({ error: 'Error creating campaign' });
    }
    res.status(201).json({ message: 'Campaign created', campaignId: results.insertId });
  });
});

// Update an existing campaign
app.put('/campaign/:id', (req, res) => {
  const id = req.params.id;
  const { image, title, amount, Description, date_created, status } = req.body;
  const query = 'UPDATE campaign SET image = ?, title = ?, amount = ?, Description = ?, date_created = ?, status = ? WHERE ID = ?';
  db.query(query, [image, title, amount, Description, date_created, status, id], (err, results) => {
    if (err) {
      console.log(err);
      console.error('Error updating campaign:', err);
      return res.status(500).json({ error: 'Error updating campaign' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json({ message: 'Campaign updated' });
  });
});

// Delete a campaign
app.delete('/campaign/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM campaign WHERE ID = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting campaign:', err);
      return res.status(500).json({ error: 'Error deleting campaign' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted' });
  });
});



app.get('/api/departments', (req, res) => {
  const sql = 'SELECT `id`, `D_name` as name FROM `department` WHERE 1';

  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching data from the database.');
          return;
      }
      res.json(results);
  });
});

app.get('/api/Orphanage', (req, res) => {
  const sql = 'SELECT `Orphanage_id` as id, `name` FROM `orphanage` WHERE 1';
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching data from the database.');
          return;
      }
      res.json(results);
  });
});

app.get('/api/staff_type', (req, res) => {
  const sql = 'SELECT `id`, `name` FROM `staff_type` WHERE 1';
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching data from the database.');
          return;
      }
      res.json(results);
  });
});

app.get('/api/branchname_id', (req, res) => {
  const sql = `SELECT ob.branch_id as id, ob.Address as name
FROM orphanage_branch ob
JOIN orphanage_branch_capacity obc ON ob.branch_id = obc.branch_id
WHERE obc.available_space > 0;
`;
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching data from the database.');
          return;
      }
      res.json(results);
  });
});

app.get('/api/child_id', (req, res) => {
  const sql = 'Select `child_id` as id, `Name` as name,`image` from  `child` where 1';
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching data from the database.');
          return;
      }
      res.json(results);
  });
});

app.get('/api/staff_id', (req, res) => {
  const sql = 'SELECT `id`, `name`,  `image` FROM `staff` WHERE 1';
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching data from the database.');
          return;
      }
      res.json(results);
  });
});

app.get('/api/orphanage_id', (req, res) => {
  const sql = 'SELECT `Orphanage_id` as id, `name`, `image` FROM `orphanage` WHERE 1';
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching data from the database.');
          return;
      }
      res.json(results);
  });
});



app.get('/api/allocations/office/:roomId', (req, res) => {
  const { roomId } = req.params;
  const sql = 'SELECT * FROM `office_room` WHERE `Room_id` = ?';
  db.query(sql, [roomId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data from the database.');
      return;
    }
    res.json(results);
  });
});

app.get('/api/allocations/hostel/:roomId', (req, res) => {
  const { roomId } = req.params;
  const sql = 'SELECT * FROM `hostel` WHERE `room_id` = ?';
  db.query(sql, [roomId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data from the database.');
      return;
    }
    res.json(results);
  });
});
app.get('/',()=>{
  return ('Running!')
})

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});