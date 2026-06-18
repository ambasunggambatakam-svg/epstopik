import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)

# Fix kekorea.id nginx config to not include www
nginx_config = """
server {
    listen 80;
    server_name kekorea.id;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}
"""
client.exec_command('cat > /etc/nginx/sites-available/kekorea.id << "EOF"\n' + nginx_config + '\nEOF')

# Run certbot to obtain and install certificates for kekorea.id ONLY
stdin, stdout, stderr = client.exec_command('certbot --nginx -d kekorea.id --non-interactive --agree-tos -m admin@kekorea.com')
print("CERTBOT:\n", stdout.read().decode('utf-8', errors='ignore'))
print("CERTBOT ERR:\n", stderr.read().decode('utf-8', errors='ignore'))

# Reload nginx
client.exec_command('systemctl reload nginx')

client.close()
