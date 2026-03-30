import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		gap,
		iconWrapBgColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'agrezer-contact-cards',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
		},
	} );

	const containerStyle = {
		'--agrezer-contact-cols': columns,
		'--agrezer-contact-cols-md': columnsTablet,
		'--agrezer-contact-gap': `${ gap }px`,
		'--agrezer-icon-wrap-bg': iconWrapBgColor,
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	return (
		<section { ...blockProps }>
			<div
				className="agrezer-contact-cards__container"
				style={ containerStyle }
			>
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
