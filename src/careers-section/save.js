import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const attrs = attributes;
	const blockProps = useBlockProps.save( {
		className: 'careers-section',
		'data-block': 'twork/careers-section',
		'data-version': '1',
	} );
	return (
		<section { ...blockProps }>
			<div className="careers-section__inner l-section">
				{ attrs.eyebrow && (
					<p className="section-head__eyebrow">{ attrs.eyebrow }</p>
				) }
				{ attrs.title && (
					<RichText.Content
						tagName="h2"
						className="section-head__title"
						value={ attrs.title }
					/>
				) }
				{ attrs.intro && <p>{ attrs.intro }</p> }
				{ Array.isArray( attrs.paragraphs ) &&
					attrs.paragraphs.map( ( p, i ) => <p key={ i }>{ p }</p> ) }
				{ attrs.lastUpdated && (
					<p className="legal-content__updated">
						Last updated: { attrs.lastUpdated }
					</p>
				) }
				{ attrs.formTitle && <h3>{ attrs.formTitle }</h3> }
			</div>
		</section>
	);
}
