import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

print("=== SS 3002 ===")
stdin, stdout, stderr = client.exec_command('ss -tulpn | grep 3002')
print(stdout.read().decode('utf-8', errors='ignore'))

print("=== PM2 STATUS ===")
stdin, stdout, stderr = client.exec_command('pm2 list')
print(stdout.read().decode('utf-8', errors='ignore'))

print("=== PM2 LOGS ===")
stdin, stdout, stderr = client.exec_command('pm2 logs kekorea.id --lines 20 --nostream')
print(stdout.read().decode('utf-8', errors='ignore').encode('cp1252', errors='replace').decode('cp1252'))

print("=== NGINX LOGS ===")
stdin, stdout, stderr = client.exec_command('tail -n 20 /var/log/nginx/error.log')
print(stdout.read().decode('utf-8', errors='ignore').encode('cp1252', errors='replace').decode('cp1252'))

client.close()
