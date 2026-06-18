import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

stdin, stdout, stderr = client.exec_command('tail -n 50 /var/log/nginx/error.log | grep kekorea.id')
out = stdout.read().decode('utf-8', errors='ignore')
if not out:
    stdin, stdout, stderr = client.exec_command('grep kekorea.id /var/log/nginx/error.log | tail -n 20')
    out = stdout.read().decode('utf-8', errors='ignore')

print("NGINX ERR KEKOREA.ID:\n", out)

client.close()
