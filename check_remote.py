import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

stdin, stdout, stderr = client.exec_command('cd /var/www/kekorea.id && git remote -v')
print("kekorea.id remote:", stdout.read().decode('utf-8'))

stdin, stdout, stderr = client.exec_command('ls -l /var/www')
print("/var/www dirs:", stdout.read().decode('utf-8'))

client.close()
