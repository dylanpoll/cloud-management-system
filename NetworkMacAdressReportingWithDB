import re
import subprocess
import time
import requests # importing the requests library
dylanStrike = 0
lewisStrike = 0
url = "http://***.***.*.***:9001/homereporting/" # express address for posting to the database I am using this with.
headers = {
  'Content-Type': 'application/json'
}
while True:
    dylan = 1
    lewis = 1
    postDylan = 'no'
    postLewis = 'no'
    adr = []
    # this runs commands in terminal that use nmap to print all terminal results into output.txt
    with open('output.txt', 'w') as f:
            p1 = subprocess.run(['sudo', 'nmap', '-sP', '***.***.*.1/24'], stdout=f, text=True) #i use stars to blank out my actual IP, replace with your own
            with open('output.txt', 'r') as searchFile:
                for line in searchFile:
                    if 'MAC' in line:
                        adr.append(line.rstrip('\n'))
            with open('macAddresses.txt', 'w') as macFile:
                    for mac in adr:
                        macFile.write('%s\n' %mac[:30])
    time.sleep(10)             
    with open('macAddresses.txt', 'r') as macFile:
                time.sleep(2)
    with open('macAddresses.txt', 'r') as macFile:
                print('checking who is home...')
                for line in macFile:
                    if '**:**:**:**:**:**' in line:  #i use **:**:**:**:**:** to replace a real MAC address, replace with you own
                        postDylan = "{\r\n    \"name\": \"Dylan\",\r\n    \"isHome\": \"Yes\"\r\n}"
                        #print('Dylan is here') #change this to whatever you want to happen or comment out to save on processing the print, I have done so at this point as I no longer need to monitor it as its working fine.
                        dylan = 0
                        dylanStrike = 0
                if dylan == 1 :
                    dylanStrike = dylanStrike + 1
                    #print('Dylan may not be here running check....') 
                    if dylanStrike == 10 :
                        #print('Dylan has not been detected for 10 minutes. Marking not here') 
                        postDylan = "{\r\n    \"name\": \"Dylan\",\r\n    \"isHome\": \"No\"\r\n}"
    r = requests.patch(url,headers=headers,data=postDylan)
    time.sleep(2)
    with open('macAddresses.txt', 'r') as macFile:
                for line in macFile:
                    if '**:**:**:**:**:**' in line:
                        postLewis = "{\r\n    \"name\": \"Lewis\",\r\n    \"isHome\": \"Yes\"\r\n}"
                        #print('Lewis is here')
                        lewis = 0
                        lewisStrike = 0
                if lewis == 1:
                    lewisStrike = lewisStrike + 1
                    #print('Lewis may not be here running check...')
                    if lewisStrike == 10 :
                        #print('Lewis has not been detected for 10 minutes. Marking not here')
                        postLewis ="{\r\n    \"name\": \"Lewis\",\r\n    \"isHome\": \"No\"\r\n}"
                    
    r = requests.patch(url,headers=headers,data=postLewis)
    time.sleep(2)
    #print('end of loop')
    time.sleep(5)
