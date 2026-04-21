import pool from "../../config/db";


export const insertUser = async (username: string, email: string, password: string) => {
  const query = `
  INSERT INTO users (name, email, password_hash)
  VALUES ($1, $2, $3)
  RETURNING id, email;
`;
  const result = await pool.query(query, [username, email, password])
  return result.rows[0];
}



export const isEmailExist = async (email: string) => {
  const query = `
  INSERT INTO users (name, email, password_hash)
  VALUES ($1, $2, $3)
  RETURNING id, email;
`;
}


export const findUserByEmail = async (email: string) => {
  const query = `
    SELECT id, name,email, password_hash
    FROM users
    WHERE email = $1
    LIMIT 1
  `;

  const { rows } = await pool.query(query, [email]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};


export const getUsers = async () => {
  const query = `
    SELECT id, name,email, is_active, plan_id
    FROM users;
  `;

  const { rows } = await pool.query(query);

  return rows;
}



export const deleteUserService = async (id: string) => {
  const query = `DELETE FROM users WHERE id = $1`;
  await pool.query(query, [id]);
};