import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

stdin, stdout, stderr = client.exec_command('cat /var/www/kekorea.id/package.json')
print("package.json:\n", stdout.read().decode('utf-8', errors='ignore'))

client.close()
