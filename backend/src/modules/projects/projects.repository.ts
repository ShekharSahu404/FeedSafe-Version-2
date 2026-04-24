import pool from "../../config/db";



export const createProjectRepo = async (userId: string, projectName: string, description: string) => {
  const query = `
  INSERT INTO projects (user_id, name, description)
  VALUES ($1, $2, $3)
  RETURNING *;
`;
  console.log("createProjectRepo called")
  const values = [userId, projectName, description];

  const result = await pool.query(query, values);

  const project = result.rows[0];

  return project;
}

export const getAllProjectRepo = async (userId: string) => {
  const query = `
    SELECT id, name,description, is_active,is_archived
    FROM projects Where user_id = $1;
  `;

  const { rows } = await pool.query(query, [userId]);

  return rows;
}