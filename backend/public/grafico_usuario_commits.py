import os
import matplotlib as mpl
if os.environ.get('DISPLAY','') == '':
    mpl.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
import sys
import json

data = json.loads(sys.argv[1])

plt.xticks(data['unix_weeks'], data['weeks'], rotation='vertical')
plt.plot(data['unix_weeks'], data['commits'], label = 'Commits', linewidth=5, color='b')
plt.stackplot(data['unix_weeks'],data['commits'],colors=['b'])
plt.xlabel('Semana')
# Tweak spacing to prevent clipping of tick-labels
plt.subplots_adjust(bottom=0.25)
#plt.show()
my_stringIObytes = io.BytesIO()
plt.legend()
plt.savefig(my_stringIObytes)
my_stringIObytes.seek(0)
my_base64_jpgData = base64.b64encode(my_stringIObytes.read())

print(my_base64_jpgData)
