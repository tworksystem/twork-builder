import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

function FeatureIcon( { variant = 'leaf' } ) {
	if ( variant === 'drop' ) {
		return (
			<svg
				viewBox="0 0 24 24"
				width="30"
				height="30"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 21c4.5-2 7-5.2 7-9.4C19 7.4 15.8 5 12 5 8.2 5 5 7.4 5 11.6c0 4.2 2.5 7.4 7 9.4Z"
					stroke="#fff"
					strokeWidth="1.8"
				/>

				<path
					d="M12 8.3v6.2"
					stroke="#fff"
					strokeWidth="1.8"
					strokeLinecap="round"
				/>

				<path
					d="M9.8 11.1 12 13.4l2.2-2.3"
					stroke="#fff"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}

	if ( variant === 'sprout' ) {
		return (
			<svg
				viewBox="0 0 24 24"
				width="30"
				height="30"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 3c5 5.5 5.5 9 0 18C6.5 12 7 8.5 12 3Z"
					stroke="#fff"
					strokeWidth="1.8"
					strokeLinejoin="round"
				/>

				<path
					d="M9 12.2c1-.7 2-.9 3-.9s2 .2 3 .9"
					stroke="#fff"
					strokeWidth="1.8"
					strokeLinecap="round"
				/>
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 24 24"
			width="30"
			height="30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 21V10"
				stroke="#fff"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>

			<path
				d="M12 10c-3.8 0-7-1.5-8-5 3.8.2 6.6 1 8 3.2"
				stroke="#fff"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>

			<path
				d="M12 10c3.8 0 7-1.5 8-5-3.8.2-6.6 1-8 3.2"
				stroke="#fff"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { title, iconVariant } = attributes;
	const blockProps = useStableBlockProps(
		() => ( { className: 'agrezer-hero-feature' } ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Feature Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon Variant', 'twork-builder' ) }
							value={ iconVariant }
							options={ [
								{
									label: __( 'Leaf', 'twork-builder' ),
									value: 'leaf',
								},
								{
									label: __( 'Drop', 'twork-builder' ),
									value: 'drop',
								},
								{
									label: __( 'Sprout', 'twork-builder' ),
									value: 'sprout',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { iconVariant: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<div className="agrezer-hero-feature__badge" aria-hidden="true">
					<FeatureIcon variant={ iconVariant } />
				</div>
				<RichText
					tagName="h3"
					className="agrezer-hero-feature__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Feature title...', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
