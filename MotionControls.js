/**
 * @author jbouny / http://github.com/jbouny
 */

// This control perform rotation on one object by using gyroscope data.
// It only works on devices and browsers providing the deviceorientation event (smartphones, tablets).
// It permits to control the 3D camera with a natural way, by moving the device around oneself.
// One application can be augmented reality.

THREE.MotionControls = function ( object3D ) {

	this.object3D = object3D;
	this.object3D.rotation.order = "YXZ";
	this.orientation = new THREE.Euler( 0, 0, 0 );
	this.DEG2RAD = Math.PI / 180;
	this.anglesOrder = [];
	this.anglesOffset = [];
	this.anglesCoef = [];
	
	var scope = this;
	
	this.onDeviceOrientation = function( event ) {
		if( event.alpha !== null && event.beta !== null && event.gamma !== null ) 
		{
			var rotation = [
				event.beta,
				event.alpha,
				event.gamma
			];
			
			for( var i = 0; i < 3; ++i )
				rotation[i] = ( rotation[scope.anglesOrder[i]] * scope.anglesCoef[i] + scope.anglesOffset[i] ) * scope.DEG2RAD;
			
			scope.orientation.set( rotation[0], rotation[1], rotation[2] );
		}
	};
	
	this.onOrientationChange = function( event ) {	
		/* Here, manage angles by taking care about the screen orientation
		 * Soon, we can hope the Orientation API in browsers to lock it:
		 * http://www.w3.org/TR/screen-orientation/
		 *
		 * Moreover, each browser manage angles differently, so these parameters don't work with every browsers
		 * Parameters tested (23/02/2014) on browsers: 23/02/2014
		 * - Firefox stable : Wrong angles
		 * - Firefox beta : OK, best experience (data are already filtered)
		 * - Chrome beta : OK but many noise and unstable
		 * - Opera beta : OK but many noise and unstable
		 */
	
		switch( window.orientation )
		{
			case 0:
				scope.anglesOrder = [ 0, 1, 2 ];
				scope.anglesOffset = [ -90, 0, 0 ]; // [ -90, 0, 180 ] Values for Firefox stable
				scope.anglesCoef = [ 1, 1, -1 ]; // [ 1, -1, -1 ]
				break;
			
			case 90:
				scope.anglesOrder = [ 2, 1, 0 ];
				scope.anglesOffset = [ 90, -90, 0 ];
				scope.anglesCoef = [ 1, 1, -1 ];
				break;
			
			case -90:
				scope.anglesOrder = [ 2, 1, 0 ];
				scope.anglesOffset = [ 90, 90, 0 ];
				scope.anglesCoef = [ -1, 1, 1 ];
				break;
				
			default:
				break;
		}
	};
	
	window.addEventListener( 'deviceorientation', this.onDeviceOrientation, false );
	window.addEventListener( 'orientationchange', this.onOrientationChange, false );
	
	window.orientation = 0;
	this.onOrientationChange();
	
	if(window.screen.mozLockOrientation ) { 
		window.screen.mozLockOrientation( 'portrait-primary' );
   
		window.screen.onorientationchange = function () {
			window.screen.mozUnlockOrientation();
			window.screen.mozLockOrientation( 'portrait-primary' );
		};
	   
		document.addEventListener( 'visibilityChange', function (e) {
			if( !document.hidden ) {
				window.screen.mozUnlockOrientation();
				window.screen.mozLockOrientation( 'portrait-primary' );
			}
		});
	}
};

THREE.MotionControls.prototype.update = function() {
	this.object3D.rotation.set( this.orientation.x, this.orientation.y, this.orientation.z );
};