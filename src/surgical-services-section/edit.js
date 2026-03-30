import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/surgical-service-card' ];
const TEMPLATE = [
	[
		'twork/surgical-service-card',
		{
			title: 'GI Surgery',
			description:
				'Advanced treatment for stomach, liver, and colorectal conditions using modern protocols.',
			iconClass: 'fas fa-procedures',
			listItems: [ 'Gallbladder Stones', 'Appendicitis' ],
		},
	],

	[
		'twork/surgical-service-card',
		{
			title: 'Hernia Repair',
			description:
				'Minimally invasive mesh repair for inguinal, umbilical, and incisional hernias.',
			iconClass: 'fas fa-dot-circle',
			listItems: [ '3D Mesh Technology', 'Day-care Procedure' ],
		},
	],

	[
		'twork/surgical-service-card',
		{
			title: 'Trauma & Emergency',
			description:
				'24/7 readiness for accident victims and acute surgical emergencies.',
			iconClass: 'fas fa-crutch',
			listItems: [ 'Rapid Response', 'Multi-disciplinary Team' ],
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionId,
		sectionClass,
		label,
		title,
		description,
		gridMinItemWidth,
		gap,
		containerMaxWidth,
		containerPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-surgical-services-section-editor',
		} ),
		[]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	const headerStyle = {
		marginBottom: 60,
		maxWidth: 700,
		marginLeft: 'auto',
		marginRight: 'auto',
		textAlign: 'center',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fit, minmax(${ gridMinItemWidth }px, 1fr))`,
		gap: `${ gap }px`,
		'--surgical-min-width': `${ gridMinItemWidth }px`,
		'--surgical-gap': `${ gap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Section ID (anchor)',
								'twork-builder'
							) }
							value={ sectionId }
							onChange={ ( v ) =>
								setAttributes( { sectionId: v || 'services' } )
							}
							help={ __( 'e.g. #services', 'twork-builder' ) }
						/>

						<TextControl
							label={ __( 'Section class', 'twork-builder' ) }
							value={ sectionClass }
							onChange={ ( v ) =>
								setAttributes( {
									sectionClass: v || 'section-padding',
								} )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Grid min card width (px)',
								'twork-builder'
							) }
							value={ gridMinItemWidth }
							onChange={ ( v ) =>
								setAttributes( { gridMinItemWidth: v } )
							}
							min={ 280 }
							max={ 400 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gap }
							onChange={ ( v ) => setAttributes( { gap: v } ) }
							min={ 20 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max width (px)', 'twork-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Padding (px)', 'twork-builder' ) }
							value={ containerPadding }
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 80 }
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section
				{ ...blockProps }
				id={ sectionId }
				className={ sectionClass }
			>
				<div
					className="editor-label"
					style={ {
						textAlign: 'center',
						padding: '10px',
						background: '#2271b1',
						color: '#fff',
						fontWeight: '600',
						fontSize: '12px',
						textTransform: 'uppercase',
						marginBottom: '20px',
						borderRadius: '4px',
					} }
				>
					{ __(
						'Surgical Services Section (Editor View)',
						'twork-builder'
					) }
				</div>
				<div className="container" style={ containerStyle }>
					<div className="text-center fade-up" style={ headerStyle }>
						<RichText
							tagName="h4"
							value={ label }
							onChange={ ( v ) => setAttributes( { label: v } ) }
							placeholder={ __(
								'Our Expertise',
								'twork-builder'
							) }
							style={ {
								color: '#0093E9',
								textTransform: 'uppercase',
								letterSpacing: '1px',
								marginBottom: 8,
							} }
						/>

						<RichText
							tagName="h2"
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
							placeholder={ __(
								'Surgical Procedures',
								'twork-builder'
							) }
							style={ {
								fontSize: '2.5rem',
								marginTop: 0,
								marginBottom: 12,
							} }
						/>

						<RichText
							tagName="p"
							value={ description }
							onChange={ ( v ) =>
								setAttributes( { description: v } )
							}
							placeholder={ __(
								'Comprehensive surgical solutions…',
								'twork-builder'
							) }
							style={ { color: '#64748b', margin: 0 } }
						/>
					</div>
					<div
						className="doc-grid twork-surgical-doc-grid"
						style={ gridStyle }
						data-min-width={ gridMinItemWidth }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
