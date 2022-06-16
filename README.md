# cloud-management-system
my own react /express /more controller for my raspberry pi network at my house. runs things like a rstp feed for security cameras, implimenting opencv and tensorflow lite soon, led controllers for espboards plugged into leds around the house, it also checks the local network for registered peoples phones to see if they are home and can be used incase something needs to be done at the house when I am not home to know if my room mate can do it for me.

I currently plan to containerize and submit docker images to dockerhub and re deploy in order to clean the setup and make it easier to re build/setup for others and myself.











====================== this is some basic guidance for self deploying this =======================

sudo apt update -y
sudo apt upgrade -y
sudo apt install nodejs -y
sudo apt install npm -y
sudo apt install build-essential git -y
sudo apt install libpcre3-dev libssl-dev zlib1g-dev -y
sudo apt install vsftpd -y
sudo apt install screen -y
sudo apt install ufw -y
sudo apt install etherwake -y
sudo apt install nmap -y
sudo apt install python3 -y

============ generate ssh-key with putty
cd
mkdir .ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
paste public key
chmod 600 ~/.ssh/authorized_keys
chown $USER:$USER ~/.ssh -R

nano /etc/ssh/sshd_config 
=========change contents to have/include

AuthorizedKeysFile %h/.ssh/authorized_keys
PasswordAuthentication no
ChallengeResponseAuthentication no
UsePAM no

=========

sudo service ssh restart


========= for some reason the nginx rtmp module fails if I don't install it as root, there is likely something wrong here if you catch it or know a better way please do raise a issue or notify me, this is the only way I got it to work but I would rather avoid this.
sudo su
cd
git clone https://github.com/arut/nginx-rtmp-module.git
git clone https://github.com/nginx/nginx.git
cd nginx
./auto/configure --add-module=../nginx-rtmp-module
make
make install
rm /usr/local/nginx/conf/nginx.conf
nano /usr/local/nginx/conf/nginx.conf

======================== COPY BELOW
user www-data;
worker_processes  auto;
pid /run/nginx.pid;

events {
worker_connections  1024;
}
rtmp { 
    server { 
        listen 1935; 
	chunk_size 4096;
        application live { 
            live on; 
            interleave on;
            hls on; 
            hls_path /tmp/hls; 
            hls_fragment 15s; 

            dash on; 
            dash_path /tmp/dash; 
            dash_fragment 15s; 
            #pull rtmp://live.example.for:pulling/fromApublicStream name=tv2 static;
        } 
    } 
} 
 
http { 
    default_type application/octet-stream;
 
    server { 
        listen 8080; 
        location / { 

            # Disable cache
            add_header 'Cache-Control' 'no-cache';

            # CORS setup
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Expose-Headers' 'Content-Length';

            # allow CORS preflight requests
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
            }

            types {
                application/dash+xml mpd;
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
                text/html html;
            }
            root /tmp;  
        } 
    }
 
    types {
        application/vnd.apple.mpegurl m3u8;
        video/mp2t ts;
        text/html html;
        application/dash+xml mpd;
    } 
}
========================END FOR COPY

/usr/local/nginx/sbin/nginx -s stop
/usr/local/nginx/sbin/nginx -t
/usr/local/nginx/sbin/nginx
cd /tmp/
chmod 777 dash
chmod 777 hls

chmod a+rx /usr/local/nginx/sbin/nginx
sudo ln -s /usr/local/nginx/sbin/nginx /usr/local/bin

nano /lib/systemd/system/nginx.service

======================== copy into
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/run/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
======================== end copy

chmod 644 /lib/systemd/system/nginx.service
systemctl daemon-reload
systemctl enable nginx.service

==now this will run on startup.
sudo su pi

=====next FTP setup

sudo nano /etc/vsftpd.conf
======================== 
add anywhere in this file the next line
pasv_enable=NO

uncomment the line with this on it
write_enable=YES
======================== info for pasv_enable : http://vsftpd.beasts.org/vsftpd_conf.html | ctrl+f pasv for it.

======== only enable root if you do not expose this outside your network, honestly only leaving this on here as I know people will do this anyway.
sudo nano /etc/ssh/sshd_config
======================== add this anywhere
PermitRootLogin yes
========================

sudo nano /etc/ftpusers
========================
put a # in front of root
========================

/etc/init.d/ssh restart

======================== change root password , but you will need to use your ssh key to connect if you setup sshkeys like the config at the start of this doc.

sudo passwd root

-------------firewall

sudo ufw allow 8080
sudo ufw allow 22
sudo ufw allow 21
sudo ufw allow ssh
sudo ufw allow 20
sudo ufw allow 3000
sudo ufw allow 9001
sudo ufw allow 445
sudo ufw allow 80
sudo ufw allow 1935
sudo ufw allow ftp
sudo ufw enable

======================== note, you can and may want to -ufw allow port# IPALLOWED- as that will prevent unwanted users from accessing your services, be aware of potential issues if you change your IP address in the future.
!setting up website for cloud manager!


==== cd into the same folder this is in, PiCloud, and do the following
==== CHANGE/UPDATE THE .ENV FILE, BUT LEAVE THE EXAMPLES ALONE. the values should make sense.
==== while in the same folder
======================== make website run on startup
sudo npm install -g pm2
pm2 startup systemd
===COPY THE LINE PM2 PRODUCES IN THE TERMINAL AFTER THE ABOVE COMMAND, paste it in.

npm install

====run this inside the folder containing this
pm2 start --name iotcloud npm -- start
pm2 start --name express node -- express.js
pm2 save

https://medium.com/@devesu/how-to-start-reactjs-application-with-pm2-as-a-service-linux-macos-854d5df3fcf1  -> more info on pm2

=== to start the website without pm2 :
screen
npm start
== go to browser page, a url will be shown.
== press ctrl a, let go, press d (this detatches this so you can do other things and leave it running.)


============= to get home reporting to work first cd into the main project folder for the iot manager
============= edit the file with the correct urls and mac addresses.
python3 NetworkMacAdressReportingWithDB.py
============= this is temporarily not working due to swapping from mongodb to postgres. I will finish that part soon.

========temporiraly exposing your controller if ever needed, should only be done rarely if ever.
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | \
      sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
      echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | \
      sudo tee /etc/apt/sources.list.d/ngrok.list && \
      sudo apt update && sudo apt install ngrok
ngrok http 3000
==== see https://ngrok.com/docs/getting-started

=== you can also install a piHole, but this can impact your pi's ability to see other devices if not fully setup.
curl -sSL https://install.pi-hole.net | bash

======= TODO: elaborate on DB deployment and change connections from mongoDB to postgres
cover deploying security systems engagement setup.
add in the tensorflow and openCV install as it is tedius for the pi.
--------------------------------- End of Commander Pi setup



===configuring the pi's that will stream webcams to the main server pi
sudo apt update -y
sudo apt upgrade -y
sudo raspi-config 

==enable interface for camera and others and increase gpu mem etc

sudo apt install screen -y
====enable interface options, join wireless if needed etc.

==setup ftp again as above.

sudo apt install ffmpeg -y
nano startstream.sh
======================== IF USING WEBCAM BY USB copy below into and save, if so ignore next version.
#!/bin/bash
ffmpeg -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /dev/zero -f v4l2 -thread_queue_size 10240 -codec:v h264 -s 1920x1080 -i /dev/video0 -codec:v copy -codec:a copy -f flv rtmp://192.168.2.230/live/cam
========================end copy

============ ONLY if it is using the ribbon cable camera copy as it will need a lower resultion.
#!/bin/bash
ffmpeg -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /dev/zero -f v4l2 -thread_queue_size 10240 -codec:v h264 -s 640x480 -i /dev/video0 -codec:v copy -codec:a copy -f flv rtmp://192.168.2.230/live/cam
==============

chmod a+rx /home/pi/startstream.sh
sudo ln -s /home/pi/startstream.sh /usr/local/bin
sudo nano /lib/systemd/system/startstream.service

======================== copy below and save
[Unit]
Description=Converting RTSP to MJPEG
[Service]
ExecStart=/usr/bin/startstream.sh
User=root
[Install]
WantedBy=multi-user.target
======================== end copy

sudo chmod 644 /lib/systemd/system/startstream.service
sudo systemctl daemon-reload
sudo systemctl enable startstream.service
sudo nano /etc/init.d/startstream

======================== copy content
#! /bin/sh
# /etc/init.d/startstream
### BEGIN INIT INFO
# Provides:          startstream
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Simple script to start a program at boot
# Description:       A simple script from www.stuffaboutcode.com which will start / stop a program a boot / shutdown.
### END INIT INFO
# If you want a command to always run, put it here
# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting stream"
    # run application you want to start
    sleep 4m
    /usr/local/bin/startstream.sh
    ;;
  stop)
    echo "Stopping stream"
    # kill application you want to stop
    killall ffmpeg
    ;;
  *)
    echo "Usage: /etc/init.d/startstream {start|stop}"
    exit 1
    ;;
esac
exit 0 
======================== END COPY

chmod 755 /etc/init.d/startstream
update-rc.d startstream defaults

now on boot it should run
========================
info : https://raspberrypi.stackexchange.com/questions/8734/execute-script-on-start-up
and : https://www.stuffaboutcode.com/2012/06/raspberry-pi-run-program-at-start-up.html
the webcam will now run on startup so long as it is plugged in.
******************************** 