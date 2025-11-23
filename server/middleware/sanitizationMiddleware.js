import { logger } from '../utils/logger.js';

// Basit HTML karakter escape
function escapeHtml(str){
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

// Body içindeki NoSQL operator anahtarlarını ($, .) blokla / kaldır
function stripNoSqlOperators(obj, parentPath=''){ 
  if(!obj || typeof obj !== 'object') return; 
  for(const key of Object.keys(obj)){
    if(key.includes('$') || key.includes('.')){ 
      delete obj[key];
      logger.warn({ field: key, path: parentPath }, 'nosql operator key removed');
      continue; 
    }
    const val = obj[key];
    if(typeof val === 'object') stripNoSqlOperators(val, parentPath ? parentPath + '.' + key : key);
  }
}

function sanitizeObject(obj, rootLabel){
  if(!obj || typeof obj !== 'object') return;
  stripNoSqlOperators(obj);
  for(const [k,v] of Object.entries(obj)){
    if(typeof v === 'string'){
      const cleaned = escapeHtml(v.replace(/\u0000/g,'').trim());
      if(cleaned !== v){
        logger.debug({ field: k, target: rootLabel }, 'sanitized field');
      }
      obj[k] = cleaned;
    }else if(typeof v === 'object'){
      sanitizeObject(v, rootLabel + '.' + k);
    }
  }
}

export function sanitizeRequest(req, _res, next){
  // Body
  if(req.body && typeof req.body === 'object'){
    sanitizeObject(req.body, 'body');
  }
  // Query parametreleri
  if(req.query && typeof req.query === 'object'){
    sanitizeObject(req.query, 'query');
  }
  // Belirli header'lar (X-Custom-*) sanitize edilebilir; örnek temel kullanım
  Object.keys(req.headers || {}).forEach(h => {
    if(h.toLowerCase().startsWith('x-custom-')){
      const val = req.headers[h];
      if(typeof val === 'string'){
        const cleaned = escapeHtml(val.replace(/\u0000/g,'').trim());
        if(cleaned !== val){
          logger.debug({ header: h }, 'sanitized header');
        }
        req.headers[h] = cleaned;
      }
    }
  });
  next();
}
