/**
 * Endoscopy shared icon Inspector + attribute helpers.
 *
 * Import: import { … } from '@twork-builder/shared/endo-icon-picker';
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { FlexibleIcon } from '@twork-builder/shared/block-helpers';
import {
	ICON_TYPE_OPTIONS,
	ENDO_DASHICON_OPTIONS,
	ENDO_FA_OPTIONS,
} from '@twork-builder/shared/select-options';

export const DEFAULT_ICON_KEYS = {
	type: 'iconType',
	fa: 'iconClass',
	dashicon: 'iconDashicon',
	imageUrl: 'iconImageUrl',
	imageId: 'iconImageId',
	videoUrl: 'iconVideoUrl',
	videoId: 'iconVideoId',
};

export function eyebrowIconKeys() {
	return {
		type: 'eyebrowIconType',
		fa: 'eyebrowIcon',
		dashicon: 'eyebrowIconDashicon',
		imageUrl: 'eyebrowIconImageUrl',
		imageId: 'eyebrowIconImageId',
		videoUrl: 'eyebrowIconVideoUrl',
		videoId: 'eyebrowIconVideoId',
	};
}

export function asideButtonIconKeys() {
	return {
		type: 'asideButtonIconType',
		fa: 'asideButtonIcon',
		dashicon: 'asideButtonIconDashicon',
		imageUrl: 'asideButtonIconImageUrl',
		imageId: 'asideButtonIconImageId',
		videoUrl: 'asideButtonIconVideoUrl',
		videoId: 'asideButtonIconVideoId',
	};
}

export function mapIconAttrs( attributes = {}, keys = DEFAULT_ICON_KEYS ) {
	return {
		iconType: attributes[ keys.type ] || 'fontawesome',
		iconClass: attributes[ keys.fa ] || '',
		iconDashicon: attributes[ keys.dashicon ] || '',
		iconImageUrl: attributes[ keys.imageUrl ] || '',
		iconImageId: attributes[ keys.imageId ] || 0,
		iconVideoUrl: attributes[ keys.videoUrl ] || '',
		iconVideoId: attributes[ keys.videoId ] || 0,
	};
}

export function iconPatch( keys, logicalPatch ) {
	const out = {};
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconType' ) ) {
		out[ keys.type ] = logicalPatch.iconType;
	}
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconClass' ) ) {
		out[ keys.fa ] = logicalPatch.iconClass;
	}
	if (
		Object.prototype.hasOwnProperty.call( logicalPatch, 'iconDashicon' )
	) {
		out[ keys.dashicon ] = logicalPatch.iconDashicon;
	}
	if (
		Object.prototype.hasOwnProperty.call( logicalPatch, 'iconImageUrl' )
	) {
		out[ keys.imageUrl ] = logicalPatch.iconImageUrl;
	}
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconImageId' ) ) {
		out[ keys.imageId ] = logicalPatch.iconImageId;
	}
	if (
		Object.prototype.hasOwnProperty.call( logicalPatch, 'iconVideoUrl' )
	) {
		out[ keys.videoUrl ] = logicalPatch.iconVideoUrl;
	}
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconVideoId' ) ) {
		out[ keys.videoId ] = logicalPatch.iconVideoId;
	}
	return out;
}

export function hasIconValue( mapped ) {
	const type = mapped.iconType || 'fontawesome';
	if ( type === 'image' ) {
		return Boolean( mapped.iconImageUrl );
	}
	if ( type === 'video' ) {
		return Boolean( mapped.iconVideoUrl );
	}
	if ( type === 'dashicon' ) {
		return Boolean( mapped.iconDashicon );
	}
	return Boolean( mapped.iconClass );
}

export function EndoFlexibleIcon( {
	attributes,
	keys = DEFAULT_ICON_KEYS,
	className = '',
} ) {
	const mapped = mapIconAttrs( attributes, keys );
	if ( ! hasIconValue( mapped ) ) {
		return null;
	}
	return (
		<FlexibleIcon
			iconType={ mapped.iconType }
			iconClass={ mapped.iconClass }
			dashicon={ mapped.iconDashicon }
			imageUrl={ mapped.iconImageUrl }
			videoUrl={ mapped.iconVideoUrl }
			className={ className }
		/>
	);
}

function filterIconOptions( options, query ) {
	const normalized = query.trim().toLowerCase();
	if ( ! normalized ) {
		return options;
	}
	return options.filter(
		( opt ) =>
			opt.label.toLowerCase().includes( normalized ) ||
			opt.value.toLowerCase().includes( normalized )
	);
}

const GRID_STYLE = {
	display: 'grid',
	gridTemplateColumns: 'repeat(6, 1fr)',
	gap: 4,
	maxHeight: 220,
	overflowY: 'auto',
	marginTop: 8,
};

function tileStyle( selected ) {
	return {
		padding: 6,
		border: selected ? '2px solid #2271b1' : '1px solid #ddd',
		background: selected ? '#f0f6fc' : '#fff',
		cursor: 'pointer',
	};
}

function DashiconGrid( { value, onSelect } ) {
	const [ query, setQuery ] = useState( '' );
	const options = filterIconOptions( ENDO_DASHICON_OPTIONS, query );

	return (
		<div className="twork-endo-icon-picker__dashgrid">
			<TextControl
				label={ __( 'Search icons', 'twork-builder' ) }
				value={ query }
				onChange={ setQuery }
			/>
			<div
				role="listbox"
				aria-label={ __( 'WordPress icons', 'twork-builder' ) }
				style={ GRID_STYLE }
			>
				{ options.map( ( opt ) => {
					const selected = value === opt.value;
					return (
						<button
							key={ opt.value }
							type="button"
							role="option"
							aria-selected={ selected }
							title={ opt.label }
							onClick={ () => onSelect( opt.value ) }
							style={ tileStyle( selected ) }
						>
							<span
								className={ `dashicons ${ opt.value }` }
								aria-hidden="true"
							/>
							<span className="screen-reader-text">
								{ opt.label }
							</span>
						</button>
					);
				} ) }
			</div>
		</div>
	);
}

function FaIconGrid( { value, onSelect } ) {
	const [ query, setQuery ] = useState( '' );
	const options = filterIconOptions( ENDO_FA_OPTIONS, query );

	return (
		<div className="twork-endo-icon-picker__fagrid">
			<TextControl
				label={ __( 'Search icons', 'twork-builder' ) }
				value={ query }
				onChange={ setQuery }
			/>
			<div
				role="listbox"
				aria-label={ __( 'Font Awesome icons', 'twork-builder' ) }
				style={ GRID_STYLE }
			>
				{ options.map( ( opt ) => {
					const selected = value === opt.value;
					return (
						<button
							key={ opt.value }
							type="button"
							role="option"
							aria-selected={ selected }
							title={ opt.label }
							onClick={ () => onSelect( opt.value ) }
							style={ tileStyle( selected ) }
						>
							<i className={ opt.value } aria-hidden="true" />
							<span className="screen-reader-text">
								{ opt.label }
							</span>
						</button>
					);
				} ) }
			</div>
		</div>
	);
}

/**
 * @param {Object}   props
 * @param {string}   [props.label]
 * @param {string}   [props.help]
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {Object}   [props.keys]
 */
export function EndoIconPicker( {
	label = __( 'Icon', 'twork-builder' ),
	help,
	attributes,
	setAttributes,
	keys = DEFAULT_ICON_KEYS,
} ) {
	const mapped = mapIconAttrs( attributes, keys );
	const type = mapped.iconType || 'fontawesome';
	const apply = ( logicalPatch ) => {
		setAttributes( iconPatch( keys, logicalPatch ) );
	};

	const controlId = `twork-endo-icon-picker-${ keys.type }`;

	return (
		<BaseControl id={ controlId } label={ label } help={ help }>
			<SelectControl
				label={ __( 'Icon type', 'twork-builder' ) }
				value={ type }
				options={ ICON_TYPE_OPTIONS }
				onChange={ ( nextType ) => apply( { iconType: nextType } ) }
			/>
			{ type === 'fontawesome' && (
				<>
					<FaIconGrid
						value={ mapped.iconClass || 'fas fa-heart' }
						onSelect={ ( nextClass ) =>
							apply( {
								iconType: 'fontawesome',
								iconClass: nextClass,
							} )
						}
					/>
					<TextControl
						label={ __( 'Font Awesome class', 'twork-builder' ) }
						value={ mapped.iconClass }
						onChange={ ( nextClass ) =>
							apply( { iconClass: nextClass } )
						}
						help={ __(
							'Or type a class not in the list above.',
							'twork-builder'
						) }
					/>
				</>
			) }
			{ type === 'dashicon' && (
				<DashiconGrid
					value={ mapped.iconDashicon || 'dashicons-heart' }
					onSelect={ ( nextDashicon ) =>
						apply( {
							iconType: 'dashicon',
							iconDashicon: nextDashicon,
						} )
					}
				/>
			) }
			{ type === 'image' &&
				( ! mapped.iconImageUrl ? (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							apply( {
								iconType: 'image',
								iconImageUrl: media.url,
								iconImageId: media.id,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'Icon image / GIF', 'twork-builder' ),
						} }
					/>
				) : (
					<div>
						<img
							src={ mapped.iconImageUrl }
							alt=""
							style={ {
								maxWidth: '100%',
								height: 'auto',
								marginBottom: 8,
							} }
						/>
						<Button
							variant="secondary"
							isSmall
							onClick={ () =>
								apply( {
									iconImageUrl: '',
									iconImageId: 0,
								} )
							}
						>
							{ __( 'Remove', 'twork-builder' ) }
						</Button>
					</div>
				) ) }
			{ type === 'video' &&
				( ! mapped.iconVideoUrl ? (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							apply( {
								iconType: 'video',
								iconVideoUrl: media.url,
								iconVideoId: media.id,
							} )
						}
						allowedTypes={ [ 'video' ] }
						multiple={ false }
						labels={ {
							title: __( 'Icon video', 'twork-builder' ),
						} }
					/>
				) : (
					<div>
						<video
							src={ mapped.iconVideoUrl }
							muted
							loop
							playsInline
							style={ {
								maxWidth: '100%',
								marginBottom: 8,
							} }
						/>
						<Button
							variant="secondary"
							isSmall
							onClick={ () =>
								apply( {
									iconVideoUrl: '',
									iconVideoId: 0,
								} )
							}
						>
							{ __( 'Remove', 'twork-builder' ) }
						</Button>
					</div>
				) ) }
		</BaseControl>
	);
}
