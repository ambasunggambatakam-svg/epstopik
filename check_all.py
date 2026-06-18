import paramiko
import time

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

time.sleep(2)

stdin, stdout, stderr = client.exec_command('ss -tulpn | grep 3002')
print("SS 3002:\n", stdout.read().decode('utf-8', errors='ignore'))

stdin, stdout, stderr = client.exec_command('pm2 logs kekorea.id --lines 10 --nostream')
print("PM2:\n", stdout.read().decode('utf-8', errors='ignore').encode('cp1252', errors='replace').decode('cp1252'))

client.close()
