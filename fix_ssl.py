import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

# Run certbot to obtain and install certificates for kekorea.id and www.kekorea.id
stdin, stdout, stderr = client.exec_command('certbot --nginx -d kekorea.id -d www.kekorea.id --non-interactive --agree-tos -m admin@kekorea.com')
print("CERTBOT:\n", stdout.read().decode('utf-8', errors='ignore'))
print("CERTBOT ERR:\n", stderr.read().decode('utf-8', errors='ignore'))

# After that, verify the configuration and reload nginx
stdin, stdout, stderr = client.exec_command('nginx -t && systemctl reload nginx')
print("NGINX:\n", stdout.read().decode('utf-8', errors='ignore'))
print("NGINX ERR:\n", stderr.read().decode('utf-8', errors='ignore'))

client.close()
