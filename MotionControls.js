THREE.MotionControls = function ( object3D ) {
	this.object3D = object3D;
	this.object3D.rotation.order = "YXZ";
	this.orientation = new THREE.Euler( 0, 0, 0 );
	this.DEG2RAD = Math.PI / 180;
	
	var scope = this;
	
	this.onDeviceOrientation = function( event ) {
		if( event.alpha !== null && event.beta !== null && event.gamma !== null ) 
		{
			scope.orientation.set( ( event.beta - 90 ) * scope.DEG2RAD, event.alpha * scope.DEG2RAD, -event.gamma * scope.DEG2RAD );
		}
	};
	
	window.addEventListener( 'deviceorientation', this.onDeviceOrientation, false );
};

THREE.MotionControls.prototype.update = function() {
	this.object3D.rotation.set( this.orientation.x, this.orientation.y, this.orientation.z );
};