#!/usr/bin/env node
const crypto = require('crypto');

const password = process.argv[2] || process.env.AUTH_PASSWORD;
if (!password) {
  console.log('Usage: npm run auth:hash -- <password>');
  console.log('   or: AUTH_PASSWORD=yourpass npm run auth:hash');
  process.exit(1);
}

const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log('SHA-256 hash:', hash);
console.log('\nPaste this into components/AuthGate.tsx as PASSWORD_HASH');
