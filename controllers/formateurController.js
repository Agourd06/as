const db = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
exports.getAllFormateurs = (req, res) => {
  const sqlQuery = "SELECT * FROM formateur WHERE deleted_at IS NULL";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching formateurs:", err);
      res.status(500).send("Server Error");
    } else {
      res.render("index", {
        users: results,
      });
    }
  });
};

exports.createFormateur = async (req, res) => {
  const { name, prenom, birth, adress, specialite, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const insertStudentQuery = `
            INSERT INTO formateur (name, prenom, birth, adress, specialite, email, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

  db.query(
    insertStudentQuery,
    [name, prenom, birth, adress, specialite, email, hashedPassword],
    (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({
          error: "Server Error",
          details: err.message,
        });
      }

      return res.status(201).json({
        message: "Formateur created successfully",
        studentId: result.insertId,
      });
    }
  );
};

exports.updateFormateur = (req, res) => {
  const { id } = req.params;
  const { name, prenom, birth, adress, specialite } = req.body;

  const sqlQuery = `
            UPDATE formateur 
            SET name = ?, prenom = ?, birth = ?, adress = ?, specialite = ?
            WHERE id = ?
        `;

  db.query(
    sqlQuery,
    [name, prenom, birth, adress, specialite, id],
    (err, result) => {
      if (err) {
        console.error("Error updating Formateur:", err);
        return res.status(500).json({
          error: "Server Error",
          details: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Formateur not found",
        });
      }

      res.status(200).json({
        message: "Formateur updated successfully",
        id,
        name,
        prenom,
        birth,
        adress,
        specialite,
      });
    }
  );
};

exports.deleteFormateur = (req, res) => {
  const { id } = req.params;

  const sqlQuery = "UPDATE formateur SET deleted_at = NOW() WHERE id = ?";

  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error("Error soft deleting student:", err);
      return res.status(500).json({
        error: "Server Error",
        details: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student soft deleted successfully",
      id,
    });
  });
};
