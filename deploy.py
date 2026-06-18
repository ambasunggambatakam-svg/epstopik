import paramiko
import sys

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect('103.27.206.181', username='root', password='Kekorea&epstopik2026', port=22)
    except Exception as e:
        print(f"Connection failed: {e}")
        sys.exit(1)

    print("=== DEPLOYING TO KEKOREA.ID ===")
    
    target_path = '/var/www/kekorea.id'
    
    commands = [
        f'cd {target_path} && git pull origin main',
        f'cd {target_path} && npm install',
        f'cd {target_path} && npm run build',
        f'cd {target_path} && pm2 restart all'
    ]
    
    for cmd in commands:
        print(f"Running: {cmd}")
        stdin, stdout, stderr = client.exec_command(cmd)
        exit_status = stdout.channel.recv_exit_status()
        
        try:
            print(stdout.read().decode('utf-8'))
        except:
            pass
            
        try:
            err = stderr.read().decode('utf-8')
            if err:
                print(f"STDERR: {err}")
        except:
            pass
    
    client.close()

if __name__ == "__main__":
    main()
