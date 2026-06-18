import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

ecosystem = """module.exports = {
  apps : [{
    name   : "kekorea.id",
    cwd    : "/var/www/kekorea.id/apps/web",
    script : "node_modules/.bin/next",
    args   : "start -p 3002",
    env: {
      NODE_ENV: "production"
    }
  }]
}"""
stdin, stdout, stderr = client.exec_command('cat > /var/www/kekorea.id/ecosystem.config.js << "EOF"\n' + ecosystem + '\nEOF')
stdout.read()

stdin, stdout, stderr = client.exec_command('cd /var/www/kekorea.id && pm2 restart ecosystem.config.js')
stdout.read()

client.close()
