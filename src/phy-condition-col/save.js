import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, heading, items = [] } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'phy-cond-col stagger-up',
	} );

	return (
		<div { ...blockProps }>
			<h3>
				{ iconClass && (
					<i className={ iconClass } aria-hidden="true" />
				) }{ ' ' }
				<RichText.Content
					tagName="span"
					value={ heading || 'Orthopedic' }
				/>
			</h3>
			<ul className="phy-cond-list">
				{ ( items && items.length
					? items
					: [
							'Back & Neck Pain',
							'Arthritis & Joint Pain',
							'Post-Fracture Stiffness',
							'Spondylosis',
					  ]
				).map( ( item, index ) => (
					<li key={ index }>
						<i className="fas fa-check" aria-hidden="true" />
						<span>{ item }</span>
					</li>
				) ) }
			</ul>
		</div>
	);
}
