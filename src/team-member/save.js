import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { name, role, accentColor } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-team-member',
		style: {
			'--twork-team-member-accent': accentColor || undefined,
		},
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="p"
				className="twork-team-member__name"
				value={ name }
			/>
			<RichText.Content
				tagName="span"
				className="twork-team-member__role"
				value={ role }
			/>
		</div>
	);
}

