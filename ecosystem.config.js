module.exports = {
  apps : [
    {
      name: "app",
      script: './app.js',
      cwd: "./",
      max_memory_restart:'50M',
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      watch:true,
      autorestart:true,
      instances:2,
      ignore_watch:['node_modules','logs','*.log'],
      log_date_format:'YYYY-MM-DD HH:mm Z',
      error_file:'./logs/error.log',
      out_file:'./logs/app-out.log'
    },
    {
      name: "server",
      script: './server.js',
      cwd: "./",
      watch: ['./service.js','./backend/*'],
      autorestart:true,
      instances:2,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }
  ]
};
