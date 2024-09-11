const db = require("../config/database");









exports.createLevel = async (req, res) => {

    const {
        name,
        score
    } = req.body;

    if (!name || !score) {
        return res.status(400).json({
            error: "All fields are required",
        });
    }

    const scoreRanges = {
        facile: {
            min: 0,
            max: 30
        },
        moyenne: {
            min: 31,
            max: 70
        },
        difficile: {
            min: 71,
            max: 100
        }
    };

    if (!scoreRanges[name]) {
        return res.status(400).json({
            message: "Invalid level name provided."
        });
    }

    const {
        min,
        max
    } = scoreRanges[name];
    if (score < min || score > max) {
        return res.status(400).json({
            message: `Score must be between ${min} and ${max} for the ${name} level.`
        });
    }

    try {
        const levelQuery = `INSERT INTO niveau (name, score) VALUES (?, ?)`;
        db.query(levelQuery, [name, score]);

        return res.status(201).json({
            message: "Level created successfully."
        });
    } catch (error) {
        console.error("Error creating level:", error);
        return res.status(500).json({
            message: "Server error, could not create level."
        });
    }
};




