fx_version 'cerulean'
game 'gta5'
redesing 'Kurotodev'
description 'progressbar'
version '1.0.0'
ui_page('html/index.html')

client_scripts {'client/main.lua'}

files {
       'html/index.html', 
       'html/css/*.css', 
       'html/js/*.js', 
       'html/Font.otf', 
       'html/*.png'
}

exports {'checkStatus', 'Progress', 'ProgressWithStartEvent', 'ProgressWithTickEvent', 'ProgressWithStartAndTick'}
