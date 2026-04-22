import pool from "../../config/db";



export const getActivePlan = async () => {
    const query = `
    SELECT 
    id,
    name,
    code,
    max_projects,
    max_feedback_per_project,
    max_members,
    price_monthly,
    price_yearly,
    currency,
    trial_days,
    features
FROM plans
WHERE is_active = TRUE
  AND is_public = TRUE
ORDER BY price_monthly ASC;
  `;

    const { rows } = await pool.query(query);

    return rows;
}