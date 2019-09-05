@ECHO OFF
taskkill /F /FI "WINDOWTITLE eq ReiNaBot" /T
start node bot.js
exit
