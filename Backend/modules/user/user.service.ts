import { pool } from '../../config/database';
import {User} from './user.model';
/* 
create user 
get user
delete user 
*/

export const userService = {
	/**
	 * create user
	 *
	 * @async
	 * @param {user} User
	 * @returns {Promise<boolean>}
	 */
	async createUser(user: User): Promise<boolean> {

		try {
			const [result] = await pool.query(`INSERT INTO users (email, password, is_verified) VALUES (?, ?, ?)`, [
				user.email,
				user.password,
				user.is_verified ?? false,
			]);
			return (result as any).affectedRows > 0;
		} catch (error) {
			return false;
		}
	},

	/**
	 * find user by email or id
	 *
	 * @async
	 * @param {?number} [id]
	 * @param {?string} [email]
	 * @returns {Promise<user | null>}
	 */
	async getUser(id?: number, email?: string): Promise<User | null> {
		try {
			let query = '';
			let params: (number | string)[] = [];

			if (id) {
				query = `SELECT * FROM users WHERE id = ?`;
				params = [id];
			} else if (email) {
				query = `SELECT * FROM users WHERE email = ?`;
				params = [email];
			} else {
				throw new Error('id ou email requis');
			}

			const [rows] = await pool.query(query, params);
			const users = rows as User[];
			return users.length > 0 ? users[0] : null;
		} catch (error) {
			return null;
		}
	},

	/**
	 * delete user
	 *
	 * @async
	 * @param {?number} [id]
	 * @param {?string} [email]
	 * @returns {Promise<boolean>}
	 */
	async deleteUser(id?: number, email?: string): Promise<boolean> {
		try {
			let query = '';
			let params: (number | string)[] = [];

			if (id) {
				query = `DELETE from users WHERE id = ?`;
				params = [id];
			} else if (email) {
				query = `DELETE from users WHERE email = ?`;
				params = [email];
			} else {
				throw new Error('id ou email requis');
			}

			const [rows] = await pool.query(query, params);

			return (rows as any).affectedRows > 0;
		} catch (error) {
			return false;
		}
	},
};
