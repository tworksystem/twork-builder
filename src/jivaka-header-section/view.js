import { bootJivakaHeaders } from './header-init';

function boot() {
	bootJivakaHeaders();
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', boot );
} else {
	boot();
}
