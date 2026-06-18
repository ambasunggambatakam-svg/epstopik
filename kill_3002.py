import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

client.exec_command('kill -9 $(lsof -t -i:3002)')

# restart pm2 app
client.exec_command('pm2 restart kekorea.id')

client.close()
