import { useBlockProps, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
	iconType: 'icon',
	icon: 'fas fa-brain',
	imageUrl: '',
	imageId: null,
	title: '',
	text: '',
};

export default function save( { attributes = {} } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const { iconType, icon, imageUrl, title, text } = attrs;
	const blockProps = useBlockProps.save( {
		className: 'treatment-card stagger-card',
	} );

	const showImage = iconType === 'image' && imageUrl;

	return (
		<div { ...blockProps }>
			{ showImage ? (
				<img src={ imageUrl } alt="" className="treatment-media" />
			) : (
				<i
					className={ icon || DEFAULT_ATTRS.icon }
					aria-hidden="true"
				/>
			) }
			{ title && <RichText.Content tagName="h4" value={ title } /> }
			{ text && <RichText.Content tagName="p" value={ text } /> }
		</div>
	);
}
