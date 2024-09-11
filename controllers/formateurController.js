const db = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;


// exports.getAllFormateurs = async (req, res) => {
//   const sqlQuery = "SELECT * FROM formateur WHERE deleted_at IS NULL";
//   db.query(sqlQuery, (err, results) => {
//     if (err) {
//       console.error("Error fetching formateurs:", err);
//       res.status(500).send("Server Error");
//     } else {
//       res.render("index", {
//         users: results,
//       });
//     }
//   });
// };


exports.createFormateur = async (req, res) => {

  const {
    name,
    prenom,
    birth,
    adress,
    specialite,
    email,
    password
  } = req.body;

  if (name  == ''|| prenom == '' || birth == '' || adress =='' || specialite  == ''|| email =='' || password =='') {

    return res.status(400).json({
      error: "All fields are required",
    });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+]{6,}$/;

  // check for email format if is it good
  if (!emailPattern.test(email)) {
    return res.status(400).json({
      error: "Invalid email format",
    });
  }

  // check for password format if is it good

  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      error: "Password must be at least 6 characters long and contain only valid characters",
    });
  }

  const checkEmailQuery = 'SELECT * FROM formateur WHERE email = ?';

  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Database query error'
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        message: 'Email already exists'
      });
    }





    const hashedPassword = bcrypt.hash(password, saltRounds);

    const insertFormateurQuery = `
    INSERT INTO formateur (name, prenom, birth, adress, specialite, email, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    const formateurClassQuery = `
    INSERT INTO class (formateur_id)
    VALUES (?)
  `;

    db.query(
      insertFormateurQuery,
      [name, prenom, birth, adress, specialite, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Database insert error:", err);
          return res.status(500).json({
            error: "Server Error",
            details: err.message,
          });
        }

        const formateurId = result.insertId;

        db.query(
          formateurClassQuery,
          [formateurId],
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
              formateurId: formateurId,
            });
          }
        );
      }
    );
  });
};


exports.updateFormateur = (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    prenom,
    birth,
    adress,
    specialite
  } = req.body;

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


exports.updateFormateur = (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    prenom,
    birth,
    adress,
    specialite
  } = req.body;

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
  const {
    id
  } = req.params;

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