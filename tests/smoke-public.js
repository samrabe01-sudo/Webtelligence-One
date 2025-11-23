import fetch from 'node-fetch';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

function getArg(name, def){
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i+1] : def;
}

const base = getArg('base', 'http://localhost:4000');
const email = getArg('email');
const password = getArg('password');
const name = getArg('name', 'Test User');

async function main(){
  console.log('Base:', base);
  if(!email || !password){
    const rl = readline.createInterface({ input, output });
    const e = await rl.question('Email: ');
    const p = await rl.question('Password: ');
    rl.close();
    return run(e, p);
  }
  return run(email, password);
}

async function run(e, p){
  // Try login first; if fails, register then login
  let token;
  try{
    let res = await fetch(base + '/api/public/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: e, password: p })
    });
    let data = await res.json();
    if(res.ok){
      token = data.token; console.log('Login OK');
    } else {
      console.log('Login failed:', data.message);
      console.log('Trying register...');
      res = await fetch(base + '/api/public/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: e, password: p, username: name })
      });
      data = await res.json();
      if(!res.ok) throw new Error('Register failed: ' + (data.message||''));
      token = data.token; console.log('Register OK');
    }
  }catch(err){
    console.error('Error:', err.message); process.exit(1);
  }

  // Health
  const health = await fetch(base + '/api/health');
  console.log('Health:', health.status);

  // Log activity
  const activity = await fetch(base + '/api/public/log-activity', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ action: 'SmokeTest', details: '/tests/smoke-public.js' })
  });
  console.log('Activity:', activity.status);

  // Purchase
  const purchase = await fetch(base + '/api/public/purchase-package', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ packageName: 'Pro' })
  });
  const pr = await purchase.json();
  console.log('Purchase:', purchase.status, pr);

  console.log('Done');
}

main();
