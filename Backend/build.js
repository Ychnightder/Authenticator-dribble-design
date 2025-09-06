// build.js
require('esbuild')
	.build({
		entryPoints: ['app.ts'], // ton point d'entrée
		bundle: true, // 🔥 bundle tout en un fichier
		platform: 'node', // backend Node.js
		target: ['node22'], // version Node ciblée
		outfile: 'dist/bundle.js', // fichier final
		sourcemap: true, // optionnel
		external: ['bcrypt'],
	})
	.catch(() => process.exit(1));
