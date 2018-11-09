Get-ChildItem "./mino/mino.js" | Get-Content | Set-Content "out.js"
Get-ChildItem "./mino/*.js" -exclude "mino.js" | Get-Content | Add-Content "out.js"
Get-ChildItem "./*.js" -exclude "out.js", "app.js" | Get-Content | Add-Content "out.js"
