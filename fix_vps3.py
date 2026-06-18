import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

# delete old pm2 instances
client.exec_command('pm2 delete kekorea.id')

# start with simple CLI command inside the web app folder
stdin, stdout, stderr = client.exec_command('cd /var/www/kekorea.id/apps/web && pm2 start npm --name "kekorea.id" -- run start -- -p 3002')
print("OUT:\n", stdout.read().decode('utf-8', errors='ignore'))

# save pm2 list
client.exec_command('pm2 save')

client.close()
