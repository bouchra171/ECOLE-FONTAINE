import pool from "../config/database.js";

export const createRole = (roleData, callback) => {
  const { name } = roleData;
  const query = 'INSERT INTO roles (name) VALUES (?)';
  pool.query(query, [name], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      const roleId = result.insertId;
      callback(null, roleId);
    }
  });
};

export const getAllRoles = (callback) => {
  const query = 'SELECT * FROM roles';
  pool.query(query, (error, roles) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, roles);
    }
  });
};

export const getRoleById = (id, callback) => {
  const query = 'SELECT * FROM roles WHERE id = ?';
  pool.query(query, [id], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      const role = rows[0];
      callback(null, role);
    }
  });
};

export const updateRole = (roleId, roleData, callback) => {
  const { name } = roleData;
  getRoleById(roleId, (error, roleToUpdate) => {
    if (error) {
      callback(error, null);
    } else {
      if (roleToUpdate) {
        const query = 'UPDATE roles SET name = ? WHERE id = ?';
        pool.query(query, [name, roleId], (error, result) => {
          if (error) {
            callback(error, null);
          } else {
            const affectedRows = result.affectedRows > 0;
            callback(null, affectedRows);
          }
        });
      } else {
        callback(null, false);
      }
    }
  });
};

export const deleteRole = (id, callback) => {
  const query = 'DELETE FROM roles WHERE id = ?';
  pool.query(query, [id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      const affectedRows = result.affectedRows > 0;
      callback(null, affectedRows);
    }
  });
};



