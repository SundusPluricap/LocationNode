// import fs from 'fs';

// export default (req, res, next) => {
//   const originalDownload = res.download;

//   res.download = function (path, filename, callback) {
//     originalDownload.call(this, path, filename, (err) => {
//       if (callback) {
//         callback(err);
//       }

//       if (!res.headersSent && !err) {
//         fs.unlinkSync(path);
//       }

//       res.redirect('/');
//     });
//   };

//   next();
// };
