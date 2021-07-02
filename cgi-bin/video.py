#!/usr/bin/python3

import cgi
import subprocess
print("content-type: text/html")
print()

f = cgi.FieldStorage()

cmd = f.getvalue("x")

output = subprocess.getstatusoutput("sudo " + cmd)
if output[0] == 0:
    print(output[1])
else:
    print(cmd, ": Command not Found")