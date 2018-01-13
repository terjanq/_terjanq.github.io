# Meltdown-JavaScript
This is a meltdown-checker found online: https://codepen.io/internweb/full/XVZmQW/

This one didn't work for me, because new Worker() refused to initialise inside coderpen.io domain.
So I 'forked' it here. You can check if your browser is vulnerable here.


https://terjanq.github.io/meltdown-checker/


To script work correctly with Google Chrome 63.0.3239.84 (64 bit) I had to enable SharedArrayBuffer. 
To do it go to chrome://flags/#shared-array-buffer and enable it.

Script worked fine with Firefox Quantum 57.0.1 (64-bit), but used more memory.

