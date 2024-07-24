// API Endpoints for /orphanagebranch
 
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
            console.error('Error inserting into orphanage_branch: ' + err.stack);
            res.status(500).send('Error inserting into orphanage_branch');
            return;
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
                console.error('Error inserting into orphanage_branch_capacity: ' + err.stack);
                res.status(500).send('Error inserting into orphanage_branch_capacity');
                return;
            }
            res.status(201).send('Orphanage branch and capacity created successfully');
        });
    });
  });

// GET /orphanagebranch/:Orphanage_id/:branch_id
app.get('/orphanagebranch/:Orphanage_id/:branch_id', (req, res) => {
    const { Orphanage_id, branch_id } = req.params;

    const sql = `
        SELECT * FROM orphanage_branch WHERE Orphanage_id = ? AND branch_id = ?
    `;

    db.query(sql, [Orphanage_id, branch_id], (err, results) => {
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
app.put('/orphanagebranch/:Orphanage_id/:branch_id', (req, res) => {
    const { Orphanage_id, branch_id } = req.params;
    const { Address, city, Capacity, N_room, No_washrooms, No_showers, No_hall, No_gates, size, no_of_stories } = req.body;

    const sql = `
        UPDATE orphanage_branch
        SET Address = ?, city = ?, Capacity = ?, N_room = ?, No_washrooms = ?, No_showers = ?, No_hall = ?, No_gates = ?, size = ?, no_of_stories = ?
        WHERE Orphanage_id = ? AND branch_id = ?
    `;

    db.query(sql, [Address, city, Capacity, N_room, No_washrooms, No_showers, No_hall, No_gates, size, no_of_stories, Orphanage_id, branch_id], (err, result) => {
        if (err) {
            console.error('Error updating orphanage_branch: ' + err.stack);
            res.status(500).send('Error updating orphanage_branch');
            return;
        }
        res.status(200).send('Orphanage branch updated successfully');
    });
});

// DELETE /orphanagebranch/:Orphanage_id/:branch_id
app.delete('/orphanagebranch/:Orphanage_id/:branch_id', (req, res) => {
    const { Orphanage_id, branch_id } = req.params;

    const sql = `
        DELETE FROM orphanage_branch
        WHERE Orphanage_id = ? AND branch_id = ?
    `;

    db.query(sql, [Orphanage_id, branch_id], (err, result) => {
        if (err) {
            console.error('Error deleting orphanage_branch: ' + err.stack);
            res.status(500).send('Error deleting orphanage_branch');
            return;
        }
        res.status(200).send('Orphanage branch deleted successfully');
    });
});

app.get('/orphanagebranch', (req, res) => {
    const sql = `
        SELECT * FROM orphanage_branch
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving orphanage branches: ' + err.stack);
            res.status(500).send('Error retrieving orphanage branches');
            return;
        }
        res.json(results);
    });
});