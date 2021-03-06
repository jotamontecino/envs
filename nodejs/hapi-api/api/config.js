export default {
  env: process.env.NODE_ENV || 'development',
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOSTNAME || '0.0.0.0',
    listen: {
      $filter: 'env',
      test: false,
      $default: true,
    },
    publicUrl: {
      $filter: 'env',
      production: process.env.PUBLIC_URL,
      $default: process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 3000}`,
    },
  },
  modules: {
    good: {
      $filter: 'env',
      test: false,
      $default: true,
    },
    redis: {
      namespace: {
        $filter: 'env',
        test: 'crevid::demo::test',
        development: 'crevid::demo::dev',
        $default: 'crevid::demo',
      },
      client: {
        $filter: 'env',
        production: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        },
        $default: {
          host: '127.0.0.1',
          port: '6379',
        },
      },
    },
    mongo: {
      client: {
        production: {},
        default: {
          url: 'mongodb://mongodb:27017/file-manager',
          settings: {
              poolSize: 10
          },
          decorate: true
        }
      }
    }
  },
};
