import paramiko
import time

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

client.exec_command('kill -9 58957')
time.sleep(1)
client.exec_command('pm2 restart kekorea.id')
time.sleep(2)

stdin, stdout, stderr = client.exec_command('ss -tulpn | grep 3002')
print("SS 3002:\n", stdout.read().decode('utf-8', errors='ignore'))

client.close()
