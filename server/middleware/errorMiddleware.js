// 404 yakalama middleware'i (route'larin sonuna eklenir)
export function notFound(req, res, next){
  console.log(`⚠️  404 Not Found: ${req.method} ${req.originalUrl}`);
  return res.status(404).json({ message: 'Bulunamadı' });
}

// Genel hata işleyicisi
export function errorHandler(err, req, res, next){ // eslint-disable-line
  const status = err.status && Number.isInteger(err.status) ? err.status : 500;
  // Standart hata gövdesi; hassas ayrıntıları logla, kullanıcıya genel mesaj ver.
  if(status >= 500){
    console.error(`❌ Internal Error: ${req.method} ${req.originalUrl}`, err);
  }else{
    console.log(`⚠️  Handled Error: ${req.method} ${req.originalUrl}`, err.message);
  }
  const body = {
    message: status === 401 ? 'Geçersiz kimlik bilgileri' : (status === 404 ? 'Bulunamadı' : 'İşlem gerçekleştirilemedi'),
    status
  };
  return res.status(status).json(body);
}
