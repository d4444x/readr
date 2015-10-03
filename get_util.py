import getwords
import sys

if len(sys.argv) != 3:
	print "Usage: python get_util.py <url> <fileout>"
	sys.exit(0)


words = getwords.get_words(sys.argv[1])
f = open(sys.argv[2], 'w')
f.write(words)
f.close()