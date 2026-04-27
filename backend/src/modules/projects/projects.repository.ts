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
  await getProjectCount(userId);

  const { rows } = await pool.query(query, [userId]);

  return rows;
}

export const deleteProjectRepo = async (projectId: string | string[]) => {
  const query = `DELETE FROM projects WHERE id = $1`;
  await pool.query(query, [projectId]);
};



export const getProjectCount = async (userId: string) => {
  const query = `
  SELECT 
  p.max_projects,
  COUNT(pr.id) AS used_projects
FROM subscriptions s
JOIN plans p ON p.id = s.plan_id
LEFT JOIN projects pr 
  ON pr.user_id = s.user_id 
  AND pr.is_archived = FALSE
WHERE s.user_id = $1
  AND s.status IN ('active', 'trialing')
GROUP BY p.max_projects;
  `;

  const { rows } = await pool.query(query, [userId]);

  return rows[0];

}