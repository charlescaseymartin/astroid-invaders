import jwt, { SignOptions } from 'jsonwebtoken';
import { InvalidTokenError } from './errors';


const secret = process.env.JWT_SECRET || '';

export const signToken = (payload: object, options?: SignOptions) => (
    jwt.sign(payload, secret, {
        expiresIn: '1h',
        ...options,
    })
)

export const verifyToken = (token: string): { [key: string]: any } => {
    try {
        if (!secret) throw new Error('Invalid secret.');
        const payload = jwt.verify(token, secret);
        const payloadIsPlainObj = !!payload && Object.getPrototypeOf(payload) === Object.prototype;
        if (payloadIsPlainObj) return payload as {[key:string]: any};
        throw new InvalidTokenError();
    } catch (err) {
        throw new InvalidTokenError();
    }
}
