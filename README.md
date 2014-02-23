motioncontrols
==============

A three.js control system using motion events.

Possibilities
=====

This control perform rotation on one object by using gyroscope data.

It only works on devices and browsers providing the deviceorientation event (smartphones, tablets).

It permits to control the 3D camera with a natural way, by moving the device around oneself. One application can be augmented reality.

Compatibility
=====

Test on some bowsers (23/02/14):

- Firefox stable : Wrong angles
- Firefox beta : OK, best experience (data are already filtered)
- Chrome beta : OK but many noise and unstable
- Opera beta : OK but many noise and unstable

Problems
=====

Each browser manage angles differently, so it currently can't work with on browsers.

The control works better in portait mode than in landscape mode. The management of this orientation can cause some errors. One future solution is to lock the screen orientation.

Soon, we can hope the Orientation API in browsers to lock it http://www.w3.org/TR/screen-orientation/ (first implementations with mozLockOrientation and msLockOrientation).
