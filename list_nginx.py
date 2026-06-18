import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

stdin, stdout, stderr = client.exec_command('ls -la /etc/nginx/sites-available/')
print("Available:\n", stdout.read().decode('utf-8', errors='ignore'))

stdin, stdout, stderr = client.exec_command('ls -la /etc/nginx/sites-enabled/')
print("Enabled:\n", stdout.read().decode('utf-8', errors='ignore'))

client.close()
