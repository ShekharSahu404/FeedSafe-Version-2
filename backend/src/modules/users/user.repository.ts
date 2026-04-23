import pool from "../../config/db";


export const insertUser = async (username: string, email: string, password: string) => {

  const freePanIdQuery = `SELECT id FROM plans WHERE code = 'free';`
  const freePanId = await pool.query(freePanIdQuery);



  const query = `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, email;
  `;
  const userData = await pool.query(query, [username, email, password])

  const subscriptionQuery = `INSERT INTO subscriptions (
    user_id,
    plan_id,
    status,
    billing_interval,
    price,
    current_period_start,
    current_period_end
)
VALUES (
    $1,
    (SELECT id FROM plans WHERE code = 'free' LIMIT 1),
    'active',
    'monthly',
    0.00,
    NOW(),
    NOW() + INTERVAL '1 month'
);`

  const subsData = await pool.query(subscriptionQuery, [userData.rows[0].id])
  console.log("subscription data", subsData.rows[0])

  return userData.rows[0];
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