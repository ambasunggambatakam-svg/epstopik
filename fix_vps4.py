import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

# kill all node processes except pm2 daemon
client.exec_command('pkill -f "next start"')

client.close()
