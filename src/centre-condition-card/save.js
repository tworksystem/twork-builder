import { useBlockProps, RichText } from '@wordpress/block-editor';

function ConditionCardIconOutput( {
	iconType,
	faClass,
	dashicon,
	imageUrl,
	videoUrl,
	className = '',
} ) {
	const wrap = ( content ) => (
		<span
			className={ `centre-icon-wrap condition-card-icon ${ className }`.trim() }
			aria-hidden="true"
		>
			{ content }
		</span>
	);
	if ( iconType === 'image' && imageUrl )
		return wrap(
			<img src={ imageUrl } alt="" className="centre-icon-img" />
		);
	if ( iconType === 'video' && videoUrl )
		return wrap(
			<video
				src={ videoUrl }
				className="centre-icon-video"
				muted
				loop
				playsInline
				autoPlay
				aria-hidden="true"
			/>
		);
	if ( iconType === 'dashicon' && dashicon )
		return wrap( <span className={ `dashicons ${ dashicon }` } /> );
	if ( faClass ) return wrap( <i className={ faClass } /> );
	return null;
}

export default function save( { attributes } ) {
	const {
		iconClass,
		iconType,
		iconDashicon,
		iconImageUrl,
		iconVideoUrl,
		title,
	} = attributes;
	const blockProps = useBlockProps.save( { className: 'condition-card' } );

	return (
		<div { ...blockProps }>
			<ConditionCardIconOutput
				iconType={ iconType || 'fontawesome' }
				faClass={ iconClass || 'fas fa-heart-broken' }
				dashicon={ iconDashicon }
				imageUrl={ iconImageUrl }
				videoUrl={ iconVideoUrl }
			/>
			<RichText.Content tagName="h4" value={ title } />
		</div>
	);
}
