export function generateOtp6(): string {
	return Math.floor(100000 + Math.random() * 900000).toString(); // 6 chiffres
}

export function generateOtp(): string {
	return Math.floor(1000 + Math.random() * 9000).toString(); // 4 chiffres
}
