import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from '@wordpress/element';
import { setEndoPrepActivePanel } from '@twork-builder/shared/endo-prep-ui';
import EndoPrepTabsInspector from '@twork-builder/shared/endo-prep-tabs-inspector';
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	eyebrowIconKeys,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const EYEBROW_KEYS = eyebrowIconKeys();

const ALLOWED_BLOCKS = [ 'twork/endo-prep-tab' ];

const TEMPLATE = [
	[
		'twork/endo-prep-tab',
		{
			tabLabel: 'Before',
			panelKey: 'before',
			isDefaultActive: true,
		},
		[
			[
				'twork/endo-prep-group',
				{
					iconClass: 'fas fa-calendar-day',
					groupTitle: '7 days before',
					items: [
						{
							showItem: true,
							text: 'Tell us about blood thinners, insulin or iron tablets — some must be paused.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Arrange an adult to accompany you home if you choose sedation.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Stop iron supplements; they stain the bowel lining.',
							listStyle: 'check',
						},
					],
				},
			],
			[
				'twork/endo-prep-group',
				{
					iconClass: 'fas fa-mug-hot',
					groupTitle: '24 hours before',
					items: [
						{
							showItem: true,
							text: 'Switch to a low-fibre diet — no seeds, nuts or raw vegetables.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Start bowel prep at the time printed on your letter.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Keep drinking clear fluids — water, black tea, clear broth.',
							listStyle: 'check',
						},
					],
				},
			],
			[
				'twork/endo-prep-group',
				{
					iconClass: 'fas fa-ban',
					groupTitle: '6 hours before',
					variant: 'warn',
					items: [
						{
							showItem: true,
							text: 'Nothing to eat. Clear fluids only up to 2 hours before.',
							listStyle: 'xmark',
						},
						{
							showItem: true,
							text: 'No chewing gum, sweets or milky drinks.',
							listStyle: 'xmark',
						},
						{
							showItem: true,
							text: 'Leave jewellery, contact lenses and nail polish at home.',
							listStyle: 'xmark',
						},
					],
				},
			],
		],
	],
	[
		'twork/endo-prep-tab',
		{ tabLabel: 'During', panelKey: 'during', isDefaultActive: false },
		[
			[
				'twork/endo-prep-group',
				{
					iconClass: 'fas fa-clipboard-user',
					groupTitle: 'Admission',
					items: [
						{
							showItem: true,
							text: 'Consent is taken by the consultant performing your procedure.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'A cannula is placed and observations recorded.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'You change into a gown; valuables go in a locked drawer.',
							listStyle: 'check',
						},
					],
				},
			],
			[
				'twork/endo-prep-group',
				{
					iconClass: 'fas fa-syringe',
					groupTitle: 'Sedation',
					items: [
						{
							showItem: true,
							text: 'Light sedation keeps you relaxed and mostly unaware.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Throat spray is offered for gastroscopy without sedation.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Oxygen levels and heart rate are monitored throughout.',
							listStyle: 'check',
						},
					],
				},
			],
			[
				'twork/endo-prep-group',
				{
					iconClass: 'fas fa-microscope',
					groupTitle: 'The examination',
					items: [
						{
							showItem: true,
							text: 'You lie on your left side; the scope is passed gently.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Biopsies and polyp removal are painless — tissue has no pain nerves.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Most procedures finish within 15–40 minutes.',
							listStyle: 'check',
						},
					],
				},
			],
		],
	],
	[
		'twork/endo-prep-tab',
		{ tabLabel: 'After', panelKey: 'after', isDefaultActive: false },
		[
			[
				'twork/endo-prep-group',
				{
					iconClass: 'fas fa-bed',
					groupTitle: 'First 2 hours',
					items: [
						{
							showItem: true,
							text: 'Rest in a recovery bay until sedation wears off.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Light snack and a drink once your swallow is normal.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Your consultant explains findings and hands over the report.',
							listStyle: 'check',
						},
					],
				},
			],
			[
				'twork/endo-prep-group',
				{
					iconClass: 'fas fa-car-side',
					groupTitle: 'Rest of the day',
					items: [
						{
							showItem: true,
							text: 'No driving, alcohol or legal documents for 24 hours.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Mild bloating or a sore throat is normal and settles quickly.',
							listStyle: 'check',
						},
						{
							showItem: true,
							text: 'Resume normal meals unless told otherwise.',
							listStyle: 'check',
						},
					],
				},
			],
			[
				'twork/endo-prep-group',
				{
					iconClass: 'fas fa-phone-volume',
					groupTitle: 'Call us immediately if',
					variant: 'warn',
					items: [
						{
							showItem: true,
							text: 'Severe or worsening abdominal pain.',
							listStyle: 'xmark',
						},
						{
							showItem: true,
							text: 'Fever, chills, or vomiting blood.',
							listStyle: 'xmark',
						},
						{
							showItem: true,
							text: 'Heavy rectal bleeding that does not stop.',
							listStyle: 'xmark',
						},
					],
				},
			],
		],
	],
];

export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const {
		showSection,
		sectionId,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		showSubtitle,
		subtitle,
		showTabGlider,
		animationOnScroll,
		enableTabGlider,
	} = attributes;

	const { tabs, allTabs } = useSelect(
		( select ) => {
			const { getBlocks } = select( 'core/block-editor' );
			const children = getBlocks( clientId ).filter(
				( block ) => block.name === 'twork/endo-prep-tab'
			);
			const mapped = children.map( ( block ) => ( {
				clientId: block.clientId,
				panelKey: block.attributes.panelKey || 'tab',
				tabLabel:
					block.attributes.tabLabel ||
					block.attributes.panelKey ||
					'',
				isDefaultActive: block.attributes.isDefaultActive === true,
				showTab: block.attributes.showTab !== false,
			} ) );
			return {
				allTabs: mapped,
				tabs: mapped.filter( ( tab ) => tab.showTab !== false ),
			};
		},
		[ clientId ]
	);

	const defaultKey =
		tabs.find( ( tab ) => tab.isDefaultActive )?.panelKey ||
		tabs[ 0 ]?.panelKey ||
		'';

	const [ activePanelKey, setActivePanelKey ] = useState( defaultKey );

	useEffect( () => {
		if ( ! tabs.length ) {
			return;
		}
		const stillExists = tabs.some(
			( tab ) => tab.panelKey === activePanelKey
		);
		if ( ! stillExists ) {
			setActivePanelKey( defaultKey );
		}
	}, [ tabs, activePanelKey, defaultKey ] );

	const resolvedActive = activePanelKey || defaultKey;

	useLayoutEffect( () => {
		setEndoPrepActivePanel( clientId, resolvedActive );
	}, [ clientId, resolvedActive ] );

	const tablistRef = useRef( null );
	const gliderRef = useRef( null );

	useLayoutEffect( () => {
		const tablist = tablistRef.current;
		const glider = gliderRef.current;
		if ( ! tablist || ! glider || showTabGlider === false ) {
			return;
		}
		const btn =
			tablist.querySelector( `.tab[data-panel="${ resolvedActive }"]` ) ||
			tablist.querySelector( '.tab.is-active' );
		if ( ! btn ) {
			return;
		}
		glider.style.width = `${ btn.offsetWidth }px`;
		glider.style.transform = `translateX(${ btn.offsetLeft - 6 }px)`;
	}, [ resolvedActive, tabs, showTabGlider ] );

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-endo-prep-section mk-endo-prep-section section bg-white',
			id: sectionId || undefined,
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--endo-container': `${ containerMaxWidth }px`,
			},
			'data-active-panel': resolvedActive || undefined,
		} ),
		[
			sectionId,
			backgroundColor,
			paddingTop,
			paddingBottom,
			containerMaxWidth,
			resolvedActive,
		]
	);

	if ( showSection === false ) {
		return null;
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Section', 'twork-builder' ) }
							checked={ showSection !== false }
							onChange={ ( value ) =>
								setAttributes( { showSection: value } )
							}
						/>
						<TextControl
							label={ __( 'Section ID', 'twork-builder' ) }
							value={ sectionId }
							onChange={ ( value ) =>
								setAttributes( { sectionId: value } )
							}
						/>
						<TextControl
							label={ __( 'Background Color', 'twork-builder' ) }
							value={ backgroundColor }
							onChange={ ( value ) =>
								setAttributes( { backgroundColor: value } )
							}
						/>
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( value ) =>
								setAttributes( { paddingTop: value } )
							}
							min={ 40 }
							max={ 160 }
						/>
						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( value ) =>
								setAttributes( { paddingBottom: value } )
							}
							min={ 40 }
							max={ 160 }
						/>
						<ToggleControl
							label={ __( 'Show Tab Glider', 'twork-builder' ) }
							checked={ showTabGlider !== false }
							onChange={ ( value ) =>
								setAttributes( { showTabGlider: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Tab Glider Animation',
								'twork-builder'
							) }
							checked={ enableTabGlider !== false }
							onChange={ ( value ) =>
								setAttributes( { enableTabGlider: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Scroll Reveal', 'twork-builder' ) }
							checked={ animationOnScroll !== false }
							onChange={ ( value ) =>
								setAttributes( { animationOnScroll: value } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Header', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Eyebrow', 'twork-builder' ) }
							checked={ showEyebrow !== false }
							onChange={ ( value ) =>
								setAttributes( { showEyebrow: value } )
							}
						/>
						{ showEyebrow !== false && (
							<EndoIconPicker
								label={ __( 'Eyebrow icon', 'twork-builder' ) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								keys={ EYEBROW_KEYS }
							/>
						) }
						<ToggleControl
							label={ __( 'Show Title', 'twork-builder' ) }
							checked={ showTitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showTitle: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Subtitle', 'twork-builder' ) }
							checked={ showSubtitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showSubtitle: value } )
							}
						/>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( value ) =>
								setAttributes( { containerMaxWidth: value } )
							}
							min={ 900 }
							max={ 1400 }
							step={ 20 }
						/>
					</PanelBody>

					<EndoPrepTabsInspector
						sectionClientId={ clientId }
						allTabs={ allTabs }
						onActivatePanel={ setActivePanelKey }
					/>
				</InspectorControls>
			) }

			<section
				{ ...blockProps }
				data-tab-glider={ enableTabGlider ? '1' : '0' }
			>
				<div
					className="endo-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<div
						className={
							animationOnScroll
								? 'section-head reveal'
								: 'section-head'
						}
					>
						{ showEyebrow !== false && (
							<span className="eyebrow">
								{ hasIconValue(
									mapIconAttrs( attributes, EYEBROW_KEYS )
								) && (
									<EndoFlexibleIcon
										attributes={ attributes }
										keys={ EYEBROW_KEYS }
									/>
								) }
								<RichText
									tagName="span"
									value={ eyebrowText }
									onChange={ ( value ) =>
										setAttributes( {
											eyebrowText: value,
										} )
									}
									placeholder={ __(
										'Eyebrow',
										'twork-builder'
									) }
									withoutInteractiveFormatting
								/>
							</span>
						) }
						{ showTitle !== false && (
							<RichText
								tagName="h2"
								value={ title }
								onChange={ ( value ) =>
									setAttributes( { title: value } )
								}
								placeholder={ __(
									'Section title',
									'twork-builder'
								) }
							/>
						) }
						{ showSubtitle !== false && (
							<RichText
								tagName="p"
								value={ subtitle }
								onChange={ ( value ) =>
									setAttributes( { subtitle: value } )
								}
								placeholder={ __(
									'Section subtitle',
									'twork-builder'
								) }
							/>
						) }
					</div>

					<div
						ref={ tablistRef }
						className={
							animationOnScroll
								? 'tabs reveal endo-prep-tablist'
								: 'tabs endo-prep-tablist'
						}
						role="tablist"
						aria-label={ __( 'Prep tabs', 'twork-builder' ) }
					>
						{ showTabGlider !== false && (
							<span
								ref={ gliderRef }
								className="tab-glider endo-prep-glider"
								aria-hidden="true"
							/>
						) }
						{ tabs.map( ( tab ) => (
							<button
								key={ tab.clientId }
								type="button"
								className={
									tab.panelKey === resolvedActive
										? 'tab is-active'
										: 'tab'
								}
								data-panel={ tab.panelKey }
								role="tab"
								aria-selected={
									tab.panelKey === resolvedActive
										? 'true'
										: 'false'
								}
								onClick={ () => {
									setActivePanelKey( tab.panelKey );
									setEndoPrepActivePanel(
										clientId,
										tab.panelKey
									);
								} }
							>
								{ tab.tabLabel || tab.panelKey }
							</button>
						) ) }
					</div>

					<div className="endo-prep-panels">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
