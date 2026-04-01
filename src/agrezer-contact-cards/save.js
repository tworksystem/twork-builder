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
		className: 'twork-contact-cards',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
		},
	} );

	const containerStyle = {
		'--twork-contact-cols': columns,
		'--twork-contact-cols-md': columnsTablet,
		'--twork-contact-gap': `${ gap }px`,
		'--twork-icon-wrap-bg': iconWrapBgColor,
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	return (
		<section { ...blockProps }>
			<div
				className="twork-contact-cards__container"
				style={ containerStyle }
			>
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
