import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save, { saveWithLegacyFaq } from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecations: [
		{
			attributes: {
				...metadata.attributes,
				faq1Question: { type: 'string' },
				faq1Answer: { type: 'string' },
				faq2Question: { type: 'string' },
				faq2Answer: { type: 'string' },
				treatment1IconType: { type: 'string' },
				treatment1Icon: { type: 'string' },
				treatment1ImageUrl: { type: 'string' },
				treatment1ImageId: { type: 'number' },
				treatment1Title: { type: 'string' },
				treatment1Text: { type: 'string' },
				treatment2IconType: { type: 'string' },
				treatment2Icon: { type: 'string' },
				treatment2ImageUrl: { type: 'string' },
				treatment2ImageId: { type: 'number' },
				treatment2Title: { type: 'string' },
				treatment2Text: { type: 'string' },
				treatment3IconType: { type: 'string' },
				treatment3Icon: { type: 'string' },
				treatment3ImageUrl: { type: 'string' },
				treatment3ImageId: { type: 'number' },
				treatment3Title: { type: 'string' },
				treatment3Text: { type: 'string' },
				treatment4IconType: { type: 'string' },
				treatment4Icon: { type: 'string' },
				treatment4ImageUrl: { type: 'string' },
				treatment4ImageId: { type: 'number' },
				treatment4Title: { type: 'string' },
				treatment4Text: { type: 'string' },
			},
			save: saveWithLegacyFaq,
		},
	],
} );
