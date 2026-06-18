import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

stdin, stdout, stderr = client.exec_command('curl -s http://localhost:3002 | grep "epstopik.id"')
out = stdout.read().decode('utf-8', errors='ignore')
print("CURL:\n", out)

client.close()
