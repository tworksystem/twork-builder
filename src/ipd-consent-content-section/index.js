import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import {
	DEFAULT_CLAUSE_TEMPLATE,
	DEFAULT_FORM_FIELDS,
	DEFAULT_REFERRAL_OPTIONS,
	DEFAULT_LOGO_URL,
	DEFAULT_PAGE_IMAGES,
	DEFAULT_SIGNATURE_FIELDS,
	DEFAULT_LIABILITY_TEXT,
	DEFAULT_FOOTER_NOTE,
	DEFAULT_CONSENT_CLOSING,
} from './defaults';

const attributes = Object.fromEntries(
	Object.entries( metadata.attributes ).map( ( [ key, config ] ) => [
		key,
		{ ...config },
	] )
);

attributes.logoUrl.default = DEFAULT_LOGO_URL;
attributes.formFields.default = DEFAULT_FORM_FIELDS;
attributes.referralOptions.default = DEFAULT_REFERRAL_OPTIONS;
attributes.pageImages.default = DEFAULT_PAGE_IMAGES;
attributes.patientSignatureFields.default =
	DEFAULT_SIGNATURE_FIELDS.patientRep;
attributes.witnessSignatureFields.default =
	DEFAULT_SIGNATURE_FIELDS.witness;
attributes.liabilityText.default = DEFAULT_LIABILITY_TEXT;
attributes.footerNote.default = DEFAULT_FOOTER_NOTE;
attributes.consentClosingText.default = DEFAULT_CONSENT_CLOSING;

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	example: {
		...metadata.example,
		innerBlocks: DEFAULT_CLAUSE_TEMPLATE,
	},
} );

export { DEFAULT_CLAUSE_TEMPLATE };
