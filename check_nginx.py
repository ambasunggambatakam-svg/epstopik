import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

stdin, stdout, stderr = client.exec_command('cat /etc/nginx/sites-enabled/kekorea.id')
print("kekorea.id nginx config:\n", stdout.read().decode('utf-8'))

stdin, stdout, stderr = client.exec_command('pm2 list')
print("\npm2 list:\n", stdout.read().decode('utf-8'))

client.close()
