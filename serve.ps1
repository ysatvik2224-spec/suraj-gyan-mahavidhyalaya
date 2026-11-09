# serve.ps1 — tiny static server for local preview (no Python/Node needed).
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
$root = $PSScriptRoot
$port = 8787

$types = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'text/javascript; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.webp' = 'image/webp'
  '.gif'  = 'image/gif'
  '.mp4'  = 'video/mp4'
  '.webm' = 'video/webm'
  '.ico'  = 'image/x-icon'
  '.json' = 'application/json'
  '.pdf'  = 'application/pdf'
}

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $port)
$listener.Start()
Write-Host "Serving $root at http://localhost:$port"

function Send-File($client, $rel, $headOnly) {
  $file = Join-Path $root $rel
  if ($rel -match '\.\.') { $client.Close(); return }
  if (Test-Path $file -PathType Leaf) {
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    $mime = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
    $head = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($bytes.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
    $s = $client.GetStream()
    $s.Write([System.Text.Encoding]::ASCII.GetBytes($head), 0, $head.Length)
    if (-not $headOnly) { $s.Write($bytes, 0, $bytes.Length) }
  } else {
    $body = "404 Not Found"
    $head = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n$body"
    $s = $client.GetStream()
    $s.Write([System.Text.Encoding]::ASCII.GetBytes($head), 0, $head.Length)
  }
  try { $client.Close() } catch {}
}

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    # Stop an idle/preconnect socket from blocking the single-threaded loop forever.
    $client.ReceiveTimeout = 3000
    $reader = New-Object System.IO.StreamReader($client.GetStream())
    $line = $reader.ReadLine()
    if ($line) {
      $parts = $line.Split(' ')
      if ($parts.Length -ge 2 -and ($parts[0] -eq 'GET' -or $parts[0] -eq 'HEAD')) {
        $path = ($parts[1].Split('?'))[0]
        if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }
        $rel = $path.Replace('/', [System.IO.Path]::DirectorySeparatorChar).TrimStart([System.IO.Path]::DirectorySeparatorChar)
        Send-File $client $rel ($parts[0] -eq 'HEAD')
      } else { try { $client.Close() } catch {} }
    } else { try { $client.Close() } catch {} }
  } catch { try { $client.Close() } catch {} }
}
