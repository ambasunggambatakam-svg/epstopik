import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

# Stop the pm2 process first to free the port just in case
client.exec_command('pm2 stop kekorea.id')

stdin, stdout, stderr = client.exec_command('cd /var/www/kekorea.id/apps/web && npm run start -- -p 3002')
import time
time.sleep(3)
# Read whatever it outputted in 3 seconds
print("OUT:\n", stdout.read().decode('utf-8', errors='ignore'))
print("ERR:\n", stderr.read().decode('utf-8', errors='ignore'))

client.exec_command('pm2 start kekorea.id')
client.close()
