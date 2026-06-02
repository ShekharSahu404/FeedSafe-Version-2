import pool from "../../config/db";


export const addFeedbackRepo = async (username: string, email: string, feedback: string, projectId: string) => {
    const query = `
  INSERT INTO feedback (username, email, feedback, project_id)
  VALUES ($1, $2, $3,$4)
  RETURNING *;
`;
    const values = [username, email, feedback, projectId];

    const result: any = await pool.query(query, values);


    if (!result) {
        throw "Something went wrong."
    }
    return result[0];
}

export const getFeedbackProjectWiseRepo = async (projectId: string | string[]) => {
    const query = `SELECT id, feedback, email, username FROM feedback where project_id = $1
ORDER BY id ASC`

    const { rows } = await pool.query(query, [projectId]);
    return rows;
}

export const getFeedbackCount = async (projectId: string) => {


    const query = `SELECT 
    p.id AS project_id,
    COUNT(f.id) AS current_feedback_count,
    pl.max_feedback_per_project
FROM projects p
JOIN subscriptions s 
    ON p.user_id = s.user_id
JOIN plans pl 
    ON s.plan_id = pl.id
LEFT JOIN feedback f 
    ON p.id = f.project_id
WHERE p.id = $1
GROUP BY p.id, pl.max_feedback_per_project;`

    const { rows }: any = await pool.query(query, [projectId]);
    return rows[0];

}

export const checkProjectIdExist = async (projectId: string) => {

    const project = await pool.query(
        "SELECT id FROM projects WHERE id = $1",
        [projectId]
    );

    if (project.rows.length === 0) {
        return {
            success: false,
            message: "Project not found"
        };
    }

    return {
        success: true,
        message: "Project found"
    }

}