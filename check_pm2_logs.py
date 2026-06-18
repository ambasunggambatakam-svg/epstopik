import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

stdin, stdout, stderr = client.exec_command('pm2 logs kekorea.id --lines 50 --nostream')
out = stdout.read().decode('utf-8', errors='ignore')
print("logs:\n", out.encode('cp1252', errors='replace').decode('cp1252'))

client.close()
