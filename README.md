logplayer
---------

Logplayer is a non real time web access log player. Why non real time? Because real time tools don't work when you want to 
analyze a problem past its occurence.

In conjunction with tools like apachetop and goaccess, this can come in handy - helps you figure out what was happening at 
a particular point in time when something went bad. 

usage
-----

Let's say you had a DOS attack at 11:40 PM on 22nd Feb.

Here's how you would use logtailer

npm install # one time

node index.js /var/log/nginx/access.log 22/Feb/2013:11:38:00 | tee /tmp/access.log

apachetop -f /tmp/access.log

This will start playing the logs to apachetop, as if things were happening now.

Make sure to remove /tmp/access.log after playing. It may be possible to use a fifo in place of real file, but not recommended
for high traffic sites.

