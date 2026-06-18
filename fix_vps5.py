import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

# Stop all PM2 apps
client.exec_command('pm2 delete all')

import time
time.sleep(2)

# Kill any stray node processes
client.exec_command('killall node')

time.sleep(2)

# Start kekorea.id
stdin, stdout, stderr = client.exec_command('cd /var/www/kekorea.id/apps/web && pm2 start npm --name "kekorea.id" -- run start -- -p 3002')
print("OUT:\n", stdout.read().decode('utf-8', errors='ignore'))

client.exec_command('pm2 save')

client.close()
