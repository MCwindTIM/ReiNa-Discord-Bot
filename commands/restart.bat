@ECHO OFF
taskkill /F /FI "WINDOWTITLE eq ReiNaBot" /T
:a
node bot.js
goto:a
