/**
 * @interface user
 * @typedef {user}
 */
export interface  User {
    id? : number;
    email : string;
    password : string;
    is_verified? : boolean;
}