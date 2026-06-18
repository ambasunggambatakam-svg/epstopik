import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

stdin, stdout, stderr = client.exec_command('cd /var/www/kekorea.id && npm run build')
out = stdout.read().decode('utf-8', errors='ignore')
err = stderr.read().decode('utf-8', errors='ignore')

print("OUT:\n", out.encode('cp1252', errors='replace').decode('cp1252'))
print("ERR:\n", err.encode('cp1252', errors='replace').decode('cp1252'))

client.close()
