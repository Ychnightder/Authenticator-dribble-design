import { FastifyReply, FastifyRequest } from 'fastify';
import { userService } from './user.service';
import bcrypt from 'bcrypt';

export const userController = {
	async register(request: FastifyRequest, reply: FastifyReply) {
		const { email, password } = request.body as {
			email: string;
			password: string;
		};

		const existing = await userService.getUser(undefined, email);
		if (existing) {
			return reply.status(400).send({ message: 'Utilisateur déjà existant' });
		}

		const success = await userService.createUser({
			id: 0, // sera auto-incrémenté
			email,
			password,
			is_verified: false,
		});

		if (!success) {
			return reply.status(500).send({ message: 'Erreur création utilisateur', success: false });
		}

		return reply.send({ message: 'Utilisateur créé !', success: true });
	},

	async login(request: FastifyRequest, reply: FastifyReply) {
		const { email, password } = request.body as {
			email: string;
			password: string;
		};

		const user = await userService.getUser(undefined, email);
		if (!user) {
			return reply.status(404).send({ message: 'Utilisateur introuvable' });
		}

		// Vérifie le password
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return reply.status(401).send({ message: 'Mot de passe incorrect' });
		}

		// Génère le JWT
		const token = (reply as any).jwtSign({ id: user.id, email: user.email }, { expiresIn: '1h' });

		return reply.send({ token });
	},

    

  // ROUTE PROTÉGÉE
  async profile(request: any, reply: FastifyReply) {
    return reply.send({ user: request.user });
  },
};
