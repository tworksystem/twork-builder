import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { name, role, accentColor } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mk-team-member',
		style: {
			'--mk-team-member-accent': accentColor || undefined,
		},
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="p"
				className="mk-team-member__name"
				value={ name }
			/>
			<RichText.Content
				tagName="span"
				className="mk-team-member__role"
				value={ role }
			/>
		</div>
	);
}

