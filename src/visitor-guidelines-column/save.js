import { useBlockProps, RichText } from '@wordpress/block-editor';

const DOS_BG = '#e8f8f5';
const DOS_BORDER = '#d1f2eb';
const DONTS_BG = '#fdedec';
const DONTS_BORDER = '#fadbd8';
const DOS_COLOR = '#27ae60';
const DONTS_COLOR = '#c0392b';

export default function save( { attributes } ) {
	const {
		columnType,
		title,
		titleIcon,
		itemIcon,
		listItems,
		titleColor,
		iconColor,
		titleFontSize,
		titleFontWeight,
		listItemFontSize,
		listItemColor,
		backgroundColor,
		borderColor,
		columnPadding,
		columnPaddingMobile,
	} = attributes;

	const effectiveTitleColor =
		titleColor || ( columnType === 'dos' ? DOS_COLOR : DONTS_COLOR );
	const effectiveIconColor =
		iconColor || ( columnType === 'dos' ? DOS_COLOR : DONTS_COLOR );
	const effectiveBg =
		backgroundColor || ( columnType === 'dos' ? DOS_BG : DONTS_BG );
	const effectiveBorder =
		borderColor || ( columnType === 'dos' ? DOS_BORDER : DONTS_BORDER );

	const blockProps = useBlockProps.save( {
		className: `guide-col col-${ columnType } fade-up`,
		style: {
			padding: `${ columnPadding }px`,
			backgroundColor: effectiveBg,
			border: `1px solid ${ effectiveBorder }`,
			borderTop: `4px solid ${ effectiveTitleColor }`,
			borderRadius: '12px',
			'--col-accent': effectiveTitleColor,
			'--col-icon-color': effectiveIconColor,
			'--column-padding-mobile': `${ columnPaddingMobile }px`,
		},
	} );

	return (
		<div { ...blockProps }>
			<div
				className="guide-title"
				style={ {
					fontSize: `${ titleFontSize }rem`,
					fontWeight: titleFontWeight,
					color: effectiveTitleColor,
				} }
			>
				{ titleIcon && (
					<span className="guide-title-icon" aria-hidden="true">
						<i
							className={ titleIcon }
							style={ { color: effectiveIconColor } }
						/>
					</span>
				) }
				<RichText.Content
					tagName="span"
					value={ title }
					className="guide-title-text"
				/>
			</div>

			{ listItems && listItems.length > 0 && (
				<ul className="guide-list">
					{ listItems.map( ( item ) => (
						<li key={ item.id }>
							{ itemIcon && (
								<span
									className="guide-list-icon"
									aria-hidden="true"
								>
									<i
										className={ itemIcon }
										style={ { color: effectiveIconColor } }
									/>
								</span>
							) }
							<span
								className="guide-list-text"
								style={ {
									fontSize: `${ listItemFontSize }rem`,
									color: listItemColor || undefined,
								} }
							>
								{ item.text }
							</span>
						</li>
					) ) }
				</ul>
			) }
		</div>
	);
}
