module.exports = {
  apps : [{
    name: 'websit_node',
    script: './app.js',
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    interpreter: 'node_modules/babel-cli/bin/babel-node.js',
    env: {
      NODE_ENV: 'local'
    },
    env_dev: {
      NODE_ENV: 'development'
    },
    env_pred: {
      NODE_ENV: 'pred'
    },
    env_prod: {
      NODE_ENV: 'production'
    }
  }],
};