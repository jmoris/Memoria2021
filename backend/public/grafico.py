import os
import matplotlib as mpl
if os.environ.get('DISPLAY','') == '':
    mpl.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
import sys

arr_x = map(int, sys.argv[1].split(','))
arr_y = map(int, sys.argv[2].split(','))

plt.plot(arr_x, arr_y)
plt.xticks(rotation=90)
plt.xlabel('Revisiones')
plt.ylabel('Complejidad')
#plt.show()
my_stringIObytes = io.BytesIO()
plt.savefig(my_stringIObytes)
my_stringIObytes.seek(0)
my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
print(my_base64_jpgData)
