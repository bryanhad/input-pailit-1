const path = require('path');
const resolve = require('resolve');

module.exports = (request, options) => {
  // Resolve @auth/prisma-adapter to node_modules
  if (request.startsWith('@auth/prisma-adapter')) {
    // const newPath =  path.join(__dirname, 'node_modules/@auth/prisma-adapter')
    // console.log('yes this is da wae', `NEW: ${newPath}`)
    const newRequest = request.replace(
      '@auth/prisma-adapter',
      path.join(__dirname, 'node_modules/@auth/prisma-adapter')
    );
    return resolve.sync(newRequest, { ...options, basedir: path.join(__dirname) });
  }
  if (request.startsWith('next-auth')) {
    const newRequest = request.replace(
      'next-auth',
      path.join(__dirname, 'node_modules/next-auth')
    );
    return resolve.sync(newRequest, { ...options, basedir: path.join(__dirname) });
  }
  if (request.startsWith('@auth/core')) {
    const newRequest = request.replace(
      '@auth/core',
      path.join(__dirname, 'node_modules/@auth/core')
    );
    return resolve.sync(newRequest, { ...options, basedir: path.join(__dirname) });
  }

  // Fallback to default resolver
  return options.defaultResolver(request, options);
};